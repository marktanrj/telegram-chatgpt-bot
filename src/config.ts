import path from "path";
import * as dotenv from 'dotenv';
import { isProductionEnv } from './utils/isProductionEnv';

if (!isProductionEnv) {
  dotenv.config({ path: path.resolve(__dirname, '../.local.env') });
}