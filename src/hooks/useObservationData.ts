import { fetchSeriesWithId } from '@api/fred-api';
import { Observations } from '@types-api/fred-api';
import { useEffect, useMemo, useState } from 'react';

const useObservationData = (id: string, frequency: string) => {
  const [chartData, updateChartData] = useState<Observations[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const memo_value = useMemo(() => id, [id]);

  useEffect(() => {
    const fetchSeriesData = async () => {
      try {
        const data = await fetchSeriesWithId(id, frequency);
        updateChartData(data);
      } catch (error) {
        console.log('error', error);
        setError('Failed to load data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeriesData();
  }, [memo_value, frequency]);

  return { chartData, isLoading, error };
};

export default useObservationData;
