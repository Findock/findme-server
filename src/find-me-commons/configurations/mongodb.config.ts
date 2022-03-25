import { EnvironmentConstants } from "@/find-me-commons/constants/EnvironmentConstants";

const dockerMongoUri = "mongodb://mongo/find-me-docker";

export default (): {
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
