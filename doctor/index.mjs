/* eslint-disable @typescript-eslint/explicit-function-return-type */

import fs from "fs";

const envLines = [];
const requiredEnvKeys = [
    "ENV",
    "LISTEN_PORT",
    "ENCRYPT_KEY",
    "ROOT_URL",
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASSWORD",
];
const notDockerRequiredEnvKeys = [ "MONGO_URI" ];

const doctor = () => {

    try {
        const envContent = fs.readFileSync(".env", {
            encoding: "utf8",
            flag: "r",
        });
        const lines = envContent.split("\n");
        lines.forEach((line) => {
            if (line.split("=")[1] !== undefined) {
                envLines.push({
                    key: line.split("=")[0].trim(),
                    value: line.split("=")[1].trim(),
                });
            }
        });
    } catch {
        throw new Error("[DOCTOR] Seems like you do not have .env file created... (/.env)");
    }

    const getEnvValue = (key) => {
        if (!envLines.find(l => l.key === key)) {
            throw new Error("[DOCTOR] Seems like you do not have value for key '" + key + "' in .env file.");
        }
        return envLines.find(l => l.key === key).value;
    };
    const isEnvDocker = getEnvValue("ENV") === "docker";

    requiredEnvKeys.forEach(k => {
        if (!getEnvValue(k)) {
            throw new Error("[DOCTOR] Seems like you do not have value for key '" + k + "' in .env file.");
        }
    });

    if (!isEnvDocker) {
        notDockerRequiredEnvKeys.forEach(k => {
            if (!getEnvValue(k)) {
                throw new Error("[DOCTOR] Seems like you do not have value for key '" + k + "' in .env file.");
            }
        });
    }
};

doctor();
