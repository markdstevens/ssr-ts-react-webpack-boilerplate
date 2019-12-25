import {Event} from 'utils';

/**
 * @description
 *   A basic logger that provides a consistent and single source of truth
 *   for logging errors, events, and regular messages. This object should
 *   always be used instead of console.*
 */
export const logger = {
  info: (msg: string): void => {
    console.log(msg);
  },

  error: (err: string, e: Error): void => {
    console.error(`${err} error=${e}`);
  },

  event: (event: Event, str: string): void => {
    if (!__BROWSER__) {
      console.log(`event=${Event[event]} ${str}`);
    }
  },
};

/**
 * @description A utility wrapper for functions related to logging.
 */
export const loggerUtils = {
  convertToLogString: (obj: Record<string, any>): string => {
    return Object.keys(obj).reduce((currentStr, nextKey) => {
      currentStr += `${nextKey}='${obj[nextKey]}' `;
      return currentStr;
    }, '').trim();
  },
};
