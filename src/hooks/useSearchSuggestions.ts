import { useState, useEffect } from 'react';
import { fetchSeries } from '../api/fred-api';
import { Series } from '@types-api/fred-api';
import useDebounce from './useDebounce';

const useSearchSuggestions = (query: string, debounceDelay = 300) => {
  const [suggestions, setSuggestions] = useState<Series[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, debounceDelay);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await fetchSeries(debouncedQuery);
        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return { suggestions, isLoading };
};

export default useSearchSuggestions;
