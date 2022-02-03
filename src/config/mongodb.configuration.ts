import environmentContstants from 'src/constants/environment.contstants';

const dockerMongoUri = 'mongodb://mongo/find-me-docker';

export default () => ({
  uri:
    process.env.ENV === environmentContstants.DOCKER
      ? dockerMongoUri
      : process.env.MONGO_URI,
});
