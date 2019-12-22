import { config as baseConfig } from './base';
import { config as devConfig } from './dev';
import { config as prodConfig } from './prod';

export const config = Object.assign({}, baseConfig, process.env.NODE_ENV === 'development' ? devConfig : prodConfig)
