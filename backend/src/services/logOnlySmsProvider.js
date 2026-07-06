// services/logOnlySmsProvider.js
// Development SMS provider — logs messages to file instead of sending.
// Replace with a real provider (e.g. Mnotify, Hubtel) for production.

import fs from 'fs';
import path from 'path';

export class LogOnlySmsProvider {
  constructor() {
    this.logFile = process.env.SMS_LOG_FILE || './logs/sms.log';
    // Create logs directory if it doesn't exist
    const dir = path.dirname(this.logFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  /**
   * Logs an SMS message to file instead of sending it.
   * In production, replace this class with a real SMS gateway.
   *
   * @param {string} phone - Recipient phone number (e.g. +233244123456)
   * @param {string} message - SMS message body
   */
  async send(phone, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] TO: ${phone} | MSG: ${message}\n`;

    fs.appendFileSync(this.logFile, logEntry, 'utf8');
    console.log(`📱 [SMS LOG] To: ${phone} | ${message.substring(0, 60)}...`);
  }
}
