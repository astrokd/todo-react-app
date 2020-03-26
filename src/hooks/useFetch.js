import { useState, useEffect } from 'react';

function useFetch () {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todoItems, setToDos] = useState([]);

  const fetchToDos = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const raw = await fetch('http://localhost:3001/items');
      const data = await raw.json();
      setToDos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchToDos();
  }, []);

  return [
    todoItems,
    error,
    isLoading,
  ];
}

export default useFetch;