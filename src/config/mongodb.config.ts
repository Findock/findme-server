import environmentConstants from 'src/constants/environment.constants';

const dockerMongoUri = 'mongodb://mongo/find-me-docker';

export default () => ({
  uri:
    process.env.ENV === environmentConstants.DOCKER
      ? dockerMongoUri
      : process.env.MONGO_URI,
});
