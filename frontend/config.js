import getConfig from 'next/config';

const { PRODUCTION, APP_NAME } = getConfig().publicRuntimeConfig;

export const API = PRODUCTION ? 'http://clockwise-clockware.com' : 'http://localhost:8000/api';

export { APP_NAME };
