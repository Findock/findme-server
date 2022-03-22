// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

export default (): {
    env: string;
    encryptKey: string;
} => ({
    env: process.env.ENV,
    encryptKey: process.env.ENCRYPT_KEY,
});
