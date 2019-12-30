import axios from 'axios';
import url from 'url';
import {logger, loggerUtils} from 'utils/logger';
import {Event} from 'utils/event';

/**
 * @description
 *   A light wrapper around axios.get that adds logging for errors
 *   and request duration
 *
 * @param {string} uri The URL used to retrieve data from axios.get
 *
 * @return {Promise<T>} A promise containing the response from axios
 */
export async function axiosWrapper<T>(uri: string): Promise<T> {
  try {
    logger.event(
        Event.AXIOS_REQUEST,
        loggerUtils.convertToLogString(url.parse(uri)),
    );
    const start = Date.now();
    const response = await axios.get<T>(uri);
    logger.event(
        Event.AXIOS_RESPONSE,
        `duration=${Date.now() - start} response=${response.status}`
    );
    return response.data;
  } catch (e) {
    if (e.isAxiosError) {
      logger.event(Event.AXIOS_ERROR, loggerUtils.convertToLogString({
        statusCode: e.response.status,
        statusText: e.response.statusText,
        method: e.config.method,
        url: e.config.url,
        data: e.request.data,
        e,
      }));
    } else {
      logger.error('unknown error while calling axios', e);
    }
    throw new Error(e);
  }
}
