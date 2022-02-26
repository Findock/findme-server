const fallbackEncryptKey = "fallbackEncryptKey";

export default (): {
    security: {
        encryptKey: string;
    };
} => ({ security: { encryptKey: process.env.ENCRYPT_KEY || fallbackEncryptKey } });
