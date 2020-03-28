import { useState, useEffect } from 'react';

function useFetch () {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todoItems, setToDos] = useState([]);
  let [count, setCount] = useState(todoItems.length);

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
    setCount(todoItems.length);
  };

  function addNewToDoItem (item) {
    setToDos([...todoItems, item]);
    setCount(todoItems.length + 1);
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
      await fetch('http://localhost:3001/items/'+ id, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // const response = await raw.json();
      // console.log('in usefetch delete',response);
      const newToDoItems = todoItems.filter(obj => obj.id !== id );
      setToDos(newToDoItems);
      setCount(newToDoItems.length);
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
    // setCount(todoItems.length);
    document.title = `ToDo App | ${count} item`;
  }, []);

  return [
    count,
    todoItems,
    error,
    isLoading,
    addNewToDoItem,
    deletionHandler,
    completionHandler,
  ];
}

export default useFetch;