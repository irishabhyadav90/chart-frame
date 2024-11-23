import axiosInstance from '../utils/axiosInstance';
import { FredResponse, Series } from '../types/fred-api';

export const fetchSeries = async (query: string): Promise<Series[]> => {
  try {
    console.log('query', query);
    const response = await axiosInstance.get<FredResponse>('/series/search', {
      params: { search_text: query },
    });
    return response.data.seriess || [];
  } catch (error) {
    console.error('Error fetching series:', error);
    return [];
  }
};
