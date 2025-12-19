import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current file's directory and load .env from api root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

/**
 * Email Configuration for Nodemailer
 *
 * Creates SMTP transporter with:
 * - STARTTLS support (port 587)
 * - Connection pooling
 * - Error handling
 */

// Validate required environment variables
const requiredEnvVars = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'SMTP_FROM_EMAIL'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// SMTP transporter configuration
const transporterConfig = {
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', // false for STARTTLS (port 587)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  pool: true, // Use connection pooling
  maxConnections: 5,
  maxMessages: 100,
  rateDelta: 1000, // 1 second
  rateLimit: 5 // Max 5 emails per second
};

// Create reusable transporter
const emailTransporter = nodemailer.createTransport(transporterConfig);

// Verify SMTP connection on startup
emailTransporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP connection failed:', error.message);
  } else {
    console.log('✅ SMTP server ready to send emails');
  }
});

// Default sender information
const defaultFrom = {
  name: process.env.SMTP_FROM_NAME || 'SaaSKiller',
  address: process.env.SMTP_FROM_EMAIL
};

// Provider email for notifications
const providerEmail = process.env.SMTP_PROVIDER_EMAIL || process.env.SMTP_FROM_EMAIL;

/**
 * Send email with default configuration
 * @param {Object} mailOptions - Nodemailer mail options
 * @returns {Promise<Object>} - Send result with messageId
 */
async function sendEmail(mailOptions) {
  const options = {
    from: `"${defaultFrom.name}" <${defaultFrom.address}>`,
    ...mailOptions
  };

  try {
    const info = await emailTransporter.sendMail(options);
    console.log(`✅ Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`❌ Email send failed: ${error.message}`);
    throw error;
  }
}

export { emailTransporter, defaultFrom, providerEmail, sendEmail };
export default emailTransporter;
