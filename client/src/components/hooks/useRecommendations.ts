import { useState } from 'react';
import axios from 'axios';

const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/recommendations', data);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations', error);
    } finally {
      setLoading(false);
    }
  };

  return { recommendations, fetchRecommendations, loading };
};

export default useRecommendations;
