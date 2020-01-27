import { GenericState } from 'stores/base';
import { axiosWrapper } from 'utils/axiosWrapper';

export interface UrlPathParams {
  [key: string]: string;
}

/**
 * @description
 *   A light wrapper around the axiosWrapper util that standardizes the response
 *   format
 *
 * @typeparam {T} The type of the response - usually the top level interface d
 * escribing the API response
 *
 * @param {string} url The URL used to retrieve data from axios.get
 * @param {UrlPathParams} pathParams A map of param keys to param values
 *
 * @return {GenericState} A standardized response format
 */
export async function fetchWrapper<T>(
  url: string,
  pathParams: UrlPathParams | undefined = {}
): Promise<GenericState> {
  try {
    Object.keys(pathParams).forEach(
      key => (url = url.replace(`:${key}`, pathParams[key]))
    );

    return { data: await axiosWrapper<T>(url) };
  } catch (e) {
    return { data: null };
  }
}
