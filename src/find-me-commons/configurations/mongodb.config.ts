import environmentConstants from "@/find-me-commons/constants/environment.constants";

const dockerMongoUri = "mongodb://mongo/find-me-docker";

export default (): {
    mongodb: {
        uri: string;
    };
} => ({
    mongodb: {
        uri: process.env.ENV === environmentConstants.DOCKER
            ? dockerMongoUri
            : process.env.MONGO_URI,
    },
});
