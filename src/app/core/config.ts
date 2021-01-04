import 'dotenv/config';

const config = {
  env: process.env.NODE_ENV,
  port: process.env.SERVER_PORT,
  secret: process.env.SERVER_SECRET,
};

export default config;
