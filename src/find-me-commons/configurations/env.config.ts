// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

export const envConfig = (): {
    env: string;
    encryptKey: string;
    rootUrl: string;
} => ({
    env: process.env.ENV,
    encryptKey: process.env.ENCRYPT_KEY,
    rootUrl: process.env.ROOT_URL,
});
