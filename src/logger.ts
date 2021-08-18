import pino from 'pino';
import { LOGGER_LEVEL, NODE_ENV } from './config';

export default pino({
  enabled: NODE_ENV === 'test' ? false : true,
  level: LOGGER_LEVEL,
});
