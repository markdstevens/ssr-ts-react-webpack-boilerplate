import {config as baseConfig} from './base';
import {config as devConfig} from './dev';
import {config as prodConfig} from './prod';

export const config = Object.assign(
    {},
    baseConfig,
    __DEV__ ? devConfig : prodConfig,
);
