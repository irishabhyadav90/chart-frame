import { useState, useEffect } from 'react';
import { fetchSeries } from '../api/fred-api';
import { Series } from '@types-api/fred-api';

const useSearchSuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await fetchSeries(query);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  return { suggestions, isLoading };
};

export default useSearchSuggestions;
