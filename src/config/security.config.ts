const fallbackEncryptKey = 'fallbackEncryptKey';

export default () => ({ security: { encryptKey: process.env.ENCRYPT_KEY || fallbackEncryptKey } });
