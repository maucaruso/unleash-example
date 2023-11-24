import { initialize } from 'unleash-client';
import * as dotenv from 'dotenv';

dotenv.config()

let unleash;

unleash = initialize({
  url: process.env.UNLEASH_URL,
  appName: 'default',
  customHeaders: { Authorization: process.env.UNLEASH_TOKEN },
});

export default unleash;
