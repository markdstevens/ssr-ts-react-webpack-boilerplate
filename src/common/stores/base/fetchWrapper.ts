import { GenericState } from 'stores/base';
import { axiosWrapper } from 'utils';

/**
 * @description A light wrapper around the axiosWrapper util that standardizes the response format
 * 
 * @typeparam {T} The type of the response - usually the top level interface describing the API response
 * 
 * @param {string} url The URL used to retrieve data from axios.get
 * 
 * @returns {GenericState} A standardized response format
 */
export async function fetchWrapper<T>(url: string): Promise<GenericState> {
  try {
    return { data: await axiosWrapper<T>(url) };
  } catch (e) {
    return { data: null };
  }
};
