// services/smsProviderFactory.js
// Pluggable SMS gateway factory.
// Returns the configured SMS provider — swap by changing SMS_PROVIDER in .env.
// New providers implement: send(phone, message): Promise<void>

import { LogOnlySmsProvider } from './logOnlySmsProvider.js';

/**
 * Factory: returns the active SMS provider based on SMS_PROVIDER env var.
 * Currently only 'log' is implemented. To add a real gateway:
 *  1. Create a new class implementing SmsProviderInterface
 *  2. Add a case below
 *  3. Set SMS_PROVIDER=yourprovider in .env
 */
export const getSmsProvider = () => {
  const provider = process.env.SMS_PROVIDER || 'log';

  switch (provider) {
    case 'log':
    default:
      return new LogOnlySmsProvider();
    // case 'mnotify':
    //   return new MnotifySmsProvider(process.env.MNOTIFY_API_KEY);
    // case 'hubtel':
    //   return new HubtelSmsProvider(process.env.HUBTEL_CLIENT_ID, process.env.HUBTEL_CLIENT_SECRET);
  }
};
