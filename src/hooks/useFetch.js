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

  function addNewToDoItem (item) {
    setToDos([...todoItems, item]);
  }

  async function completionHandler (item) {
    setIsLoading(true);
    setError(false);
    const newStatus = !item.status;
    item.status = newStatus;
    try {
      const raw = await fetch('http://localhost:3001/items/'+item.id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      const response = await raw.json();
      console.log(response);
      const newToDoItems = todoItems.map(obj => {
        return obj.id === item.id ? {...obj, status: newStatus } : obj;
      });
      setToDos(newToDoItems);
    } catch (err) {
      setError(err.message);
    // addNewToDoItem(response);
    } finally {
      setIsLoading(false);
    }
  }

  async function deletionHandler (id) {
    setIsLoading(true);
    setError(false);
    try {
      const raw = await fetch('http://localhost:3001/items/'+ id, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await raw.json();
      console.log(response);
      const newToDoItems = todoItems.filter(obj => obj.id !== id );
      setToDos(newToDoItems);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
    // deleteFromTableToDoItem(response);
  }

  // function deleteFromTableToDoItem (item) {
  //   console.log('todoItems',todoItems);
  //   setToDos([...todoItems]);
  // }

  // function editOnTableToDoItem (item) {
  //   setToDos([...todoItems, item]);
  // }

  useEffect(() => {
    fetchToDos();
  }, []);

  return [
    todoItems,
    error,
    isLoading,
    addNewToDoItem,
    deletionHandler,
    completionHandler,
  ];
}

export default useFetch;