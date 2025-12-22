import { sendEmail, providerEmail } from '../config/email.js';
import { generateAuditPDF, deletePDF } from './pdfService.js';
import { getStrings } from './i18nService.js';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Email Service for Audit Reports
 *
 * Handles:
 * - PDF generation
 * - Email template rendering (Handlebars)
 * - Dual notification (user + provider)
 * - Error handling and cleanup
 */

/**
 * Helper to convert dot-notation keys to underscore-notation for Handlebars
 * e.g., 'hero.title' -> 'hero_title'
 */
function getTemplateStrings(lang) {
  const strings = getStrings(lang);
  const templateStrings = {};
  
  Object.keys(strings).forEach(key => {
    const newKey = key.replace(/\./g, '_');
    templateStrings[newKey] = strings[key];
  });
  
  return templateStrings;
}

/**
 * Load and compile email template
 * @param {string} templateName - Template filename (without .hbs extension)
 * @returns {Function} - Compiled Handlebars template
 */
function loadTemplate(templateName) {
  const templatePath = path.join(__dirname, '../templates/email', `${templateName}.hbs`);
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Email template not found: ${templateName}`);
  }
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  return handlebars.compile(templateContent);
}

/**
 * Send audit report email to user
 * @param {Object} auditData - Audit report data
 * @param {string} pdfPath - Path to generated PDF
 * @returns {Promise<Object>} - Email send result
 */
export async function sendUserEmail(auditData, pdfPath) {
  try {
    const lang = auditData.language || 'en';
    const t = getTemplateStrings(lang);
    const rawStrings = getStrings(lang); // Get raw strings for subject line interpolation

    // Load and render template
    const template = loadTemplate('user-audit-report');
    const html = template({
      t, // Pass localized strings object
      name: auditData.name,
      toolName: auditData.toolName,
      bleedAmount: auditData.bleedAmount.toLocaleString(),
      savingsAmount: auditData.savingsAmount.toLocaleString(),
      buildCostMin: auditData.buildCostMin.toLocaleString(),
      buildCostMax: auditData.buildCostMax.toLocaleString(),
      roiMonths: auditData.roiMonths || 'N/A',
      featuresKept: auditData.featuresKept || [],
      featuresRemoved: auditData.featuresRemoved || [],
      customFeatures: auditData.customFeatures || []
    });

    // Send email with PDF attachment
    const result = await sendEmail({
      to: auditData.email,
      subject: rawStrings['results.savings'] ? 
        rawStrings['results.savings'](auditData.savingsAmount.toLocaleString()) : 
        `Save $${auditData.savingsAmount.toLocaleString()} - Your ${auditData.toolName} Audit`,
      html,
      attachments: [
        {
          filename: `saaskiller-audit-${auditData.toolName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`,
          path: pdfPath
        }
      ]
    });

    console.log(`✅ User email sent to ${auditData.email}: ${result.messageId}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to send user email: ${error.message}`);
    throw error;
  }
}

/**
 * Send notification email to provider
 * @param {Object} auditData - Audit report data
 * @param {string} userMessageId - User email message ID
 * @param {string} pdfPath - Path to generated PDF (optional)
 * @returns {Promise<Object>} - Email send result
 */
export async function sendProviderEmail(auditData, userMessageId, pdfPath = null) {
  try {
    // Load and render template
    const template = loadTemplate('provider-notification');
    const html = template({
      toolName: auditData.toolName,
      tierName: auditData.tierName || 'N/A',
      email: auditData.email,
      name: auditData.name,
      teamSize: auditData.teamSize,
      bleedAmount: auditData.bleedAmount.toLocaleString(),
      savingsAmount: auditData.savingsAmount.toLocaleString(),
      userMessageId
    });

    // Build email options
    const emailOptions = {
      to: providerEmail,
      subject: `New Audit: ${auditData.toolName} - $${auditData.savingsAmount.toLocaleString()} savings`,
      html
    };

    // Attach PDF if provided
    if (pdfPath && fs.existsSync(pdfPath)) {
      emailOptions.attachments = [
        {
          filename: `saaskiller-audit-${auditData.toolName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.pdf`,
          path: pdfPath
        }
      ];
    }

    // Send notification email
    const result = await sendEmail(emailOptions);

    console.log(`✅ Provider email sent: ${result.messageId}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to send provider email: ${error.message}`);
    throw error;
  }
}

/**
 * Send complete audit report (PDF + dual emails)
 * @param {Object} auditData - Audit report data
 * @returns {Promise<Object>} - { userResult, providerResult, pdfPath, pdfSize }
 */
export async function sendAuditReport(auditData) {
  let pdfPath = null;

  try {
    // Step 1: Generate PDF
    console.log(`📄 Generating PDF for ${auditData.email}...`);
    const { filePath, sizeBytes } = await generateAuditPDF(auditData);
    pdfPath = filePath;

    // Step 2: Send email to user
    console.log(`📧 Sending email to user: ${auditData.email}...`);
    const userResult = await sendUserEmail(auditData, pdfPath);

    // Step 3: Send notification to provider (with PDF attachment)
    console.log(`📧 Sending notification to provider...`);
    const providerResult = await sendProviderEmail(auditData, userResult.messageId, pdfPath);

    // Step 4: Clean up PDF (optional - keep for debugging if needed)
    // await deletePDF(pdfPath);

    return {
      success: true,
      userResult,
      providerResult,
      pdfPath,
      pdfSize: sizeBytes
    };
  } catch (error) {
    // Clean up PDF on error
    if (pdfPath) {
      await deletePDF(pdfPath);
    }

    console.error(`❌ Audit report send failed: ${error.message}`);
    throw error;
  }
}

export default { sendUserEmail, sendProviderEmail, sendAuditReport };
