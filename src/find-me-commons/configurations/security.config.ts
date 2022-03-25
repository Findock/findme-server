const fallbackEncryptKey = "fallbackEncryptKey";

export const securityConfig = (): {
    security: {
        encryptKey: string;
    };
} => ({ security: { encryptKey: process.env.ENCRYPT_KEY || fallbackEncryptKey } });
