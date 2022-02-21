// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default () => ({
    env: process.env.ENV,
    encryptKey: process.env.ENCRYPT_KEY,
});
