import { EnvironmentConstants } from "@/find-me-commons/constants/environment.constants";

const dockerMongoUri = "mongodb://mongo/find-me-docker";

export const mongoDbConfig = (): {
    mongodb: {
        uri: string;
    };
} => ({
    mongodb: {
        uri: process.env.ENV === EnvironmentConstants.DOCKER
            ? dockerMongoUri
            : process.env.MONGO_URI,
    },
});
