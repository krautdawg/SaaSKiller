import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * PDF Generation Service
 *
 * Creates invoice-style audit reports with:
 * - Professional layout (SaaSKiller branding)
 * - Financial breakdown (bleed, build costs, savings, ROI)
 * - Feature lists (kept, removed, custom)
 * - Proper formatting and spacing
 */

// Ensure PDF storage directory exists
const PDF_STORAGE_PATH = process.env.PDF_STORAGE_PATH || path.join(__dirname, '../temp/pdfs');
if (!fs.existsSync(PDF_STORAGE_PATH)) {
  fs.mkdirSync(PDF_STORAGE_PATH, { recursive: true });
}

// Logo path
const LOGO_PATH = path.join(__dirname, '../assets/logo.png');

/**
 * Generate PDF audit report
 * @param {Object} auditData - Audit report data
 * @returns {Promise<Object>} - { filePath, sizeBytes }
 */
export async function generateAuditPDF(auditData) {
  // Validate input
  if (!auditData || !auditData.email || !auditData.toolName) {
    throw new Error('Invalid audit data: email and toolName required');
  }

  // Create safe filename
  const timestamp = Date.now();
  const safeToolName = auditData.toolName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  const fileName = `saaskiller-audit-${safeToolName}-${timestamp}.pdf`;
  const filePath = path.join(PDF_STORAGE_PATH, fileName);

  return new Promise((resolve, reject) => {
    try {
      // Create PDF document
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50,
        info: {
          Title: `SaaSKiller Audit: ${auditData.toolName}`,
          Author: 'SaaSKiller',
          Subject: 'SaaS Audit Report',
          Keywords: 'saas, audit, savings, roi'
        }
      });

      // Pipe to file
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // --- HEADER WITH LOGOS ---
      const pageWidth = doc.page.width;
      const margin = 50;
      const logoWidth = 80;
      const logoHeight = 60;

      // Add logo to top left
      if (fs.existsSync(LOGO_PATH)) {
        doc.image(LOGO_PATH, margin, margin, {
          width: logoWidth,
          height: logoHeight,
          fit: [logoWidth, logoHeight]
        });

        // Add logo to top right
        doc.image(LOGO_PATH, pageWidth - margin - logoWidth, margin, {
          width: logoWidth,
          height: logoHeight,
          fit: [logoWidth, logoHeight]
        });
      }

      // Move down past logos
      doc.y = margin + logoHeight + 20;

      doc
        .fontSize(28)
        .fillColor('#DC2626') // brand-error red
        .text('SaaSKiller', { align: 'center' })
        .moveDown(0.3);

      doc
        .fontSize(14)
        .fillColor('#6B7280') // gray-500
        .text('AUDIT REPORT', { align: 'center' })
        .moveDown(1.5);

      // --- TOOL INFO ---
      doc
        .fontSize(20)
        .fillColor('#111827') // gray-900
        .text(auditData.toolName, { align: 'left' })
        .moveDown(0.2);

      if (auditData.tierName) {
        doc
          .fontSize(12)
          .fillColor('#6B7280')
          .text(`Plan: ${auditData.tierName}`)
          .moveDown(0.2);
      }

      doc
        .fontSize(12)
        .fillColor('#6B7280')
        .text(`Team Size: ${auditData.teamSize} users`)
        .moveDown(1.5);

      // --- DIVIDER ---
      doc
        .strokeColor('#E5E7EB')
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke()
        .moveDown(1);

      // --- THE 3-YEAR BLEED ---
      doc
        .fontSize(16)
        .fillColor('#DC2626')
        .text('THE 3-YEAR BLEED', { align: 'center' })
        .moveDown(0.5);

      doc
        .fontSize(36)
        .fillColor('#DC2626')
        .text(`$${auditData.bleedAmount.toLocaleString()}`, { align: 'center' })
        .moveDown(0.3);

      doc
        .fontSize(10)
        .fillColor('#9CA3AF')
        .text('Money gone forever.', { align: 'center' })
        .moveDown(1.5);

      // --- DIVIDER ---
      doc
        .strokeColor('#E5E7EB')
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke()
        .moveDown(1);

      // --- BUILD COSTS ---
      doc
        .fontSize(14)
        .fillColor('#111827')
        .text('BUILD IT YOURSELF', { align: 'left' })
        .moveDown(0.8);

      doc
        .fontSize(11)
        .fillColor('#6B7280')
        .text(`Estimated Cost: $${auditData.buildCostMin.toLocaleString()} - $${auditData.buildCostMax.toLocaleString()}`)
        .moveDown(0.5);

      doc
        .fontSize(11)
        .fillColor('#059669') // green-600
        .text(`Total Savings: $${auditData.savingsAmount.toLocaleString()}`)
        .moveDown(0.5);

      if (auditData.roiMonths) {
        doc
          .fontSize(11)
          .fillColor('#6B7280')
          .text(`ROI: ${auditData.roiMonths} months`)
          .moveDown(1.5);
      } else {
        doc.moveDown(1);
      }

      // --- DIVIDER ---
      doc
        .strokeColor('#E5E7EB')
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke()
        .moveDown(1);

      // --- FEATURES KEPT ---
      if (auditData.featuresKept && auditData.featuresKept.length > 0) {
        doc
          .fontSize(14)
          .fillColor('#111827')
          .text('FEATURES YOU KEEP', { align: 'left' })
          .moveDown(0.5);

        auditData.featuresKept.forEach((feature) => {
          doc
            .fontSize(10)
            .fillColor('#6B7280')
            .text(`• ${feature.name}`, { indent: 10 });
        });

        doc.moveDown(1.5);
      }

      // --- FEATURES REMOVED ---
      if (auditData.featuresRemoved && auditData.featuresRemoved.length > 0) {
        doc
          .fontSize(14)
          .fillColor('#111827')
          .text('BLOAT YOU CUT', { align: 'left' })
          .moveDown(0.5);

        auditData.featuresRemoved.forEach((feature) => {
          doc
            .fontSize(10)
            .fillColor('#6B7280')
            .text(`• ${feature.name}`, { indent: 10 });
        });

        doc.moveDown(1.5);
      }

      // --- CUSTOM FEATURES ---
      if (auditData.customFeatures && auditData.customFeatures.length > 0) {
        doc
          .fontSize(14)
          .fillColor('#111827')
          .text('CUSTOM FEATURES ADDED', { align: 'left' })
          .moveDown(0.5);

        auditData.customFeatures.forEach((feature) => {
          doc
            .fontSize(10)
            .fillColor('#6B7280')
            .text(`• ${feature.name} (${feature.estimatedHours}h)`, { indent: 10 });
        });

        doc.moveDown(1.5);
      }

      // --- FOOTER ---
      doc
        .fontSize(9)
        .fillColor('#9CA3AF')
        .text('Generated by SaaSKiller - Stop Renting, Start Owning', {
          align: 'center'
        })
        .moveDown(0.3);

      doc
        .fontSize(8)
        .fillColor('#D1D5DB')
        .text(new Date().toLocaleString(), { align: 'center' });

      // Finalize PDF
      doc.end();

      // Wait for file to be written
      stream.on('finish', () => {
        const stats = fs.statSync(filePath);
        resolve({
          filePath,
          sizeBytes: stats.size
        });
      });

      stream.on('error', (error) => {
        reject(new Error(`PDF generation failed: ${error.message}`));
      });
    } catch (error) {
      reject(new Error(`PDF generation failed: ${error.message}`));
    }
  });
}

/**
 * Delete PDF file
 * @param {string} filePath - Path to PDF file
 * @returns {Promise<boolean>} - Success status
 */
export async function deletePDF(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Deleted PDF: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Failed to delete PDF: ${error.message}`);
    return false;
  }
}

export default { generateAuditPDF, deletePDF };
