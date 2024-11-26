import axiosInstance from '../utils/axiosInstance';
import {
  FredObservations,
  FredResponse,
  Observations,
  Series,
} from '../types/fred-api';
import frequencyMapping from '@utils/freqMapping';

export const fetchSeries = async (query: string): Promise<Series[]> => {
  try {
    console.log('query', query);
    const response = await axiosInstance.get<FredResponse>('/series/search', {
      params: { search_text: query, limit: 100 },
    });
    return response.data.seriess || [];
  } catch (error) {
    console.error('Error fetching series:', error);
    return [];
  }
};

export const fetchSeriesWithId = async (
  id: string,
  frequency: string,
): Promise<Observations[]> => {
  try {
    const key: keyof typeof frequencyMapping =
      frequency as keyof typeof frequencyMapping;
    const response = await axiosInstance.get<FredObservations>(
      '/series/observations',
      {
        params: { series_id: id, limit: 10, frequency: frequencyMapping[key] },
      },
    );
    return response.data.observations || [];
  } catch (error) {
    console.error('Error fetching series:', error);
    return [];
  }
};
