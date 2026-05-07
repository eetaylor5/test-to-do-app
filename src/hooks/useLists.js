import { useState, useEffect } from 'react';
import { api } from '../utils/api';

const useLists = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const data = await api.getLists();
      setLists(data);
    } catch (error) {
      console.error('Error fetching lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const createList = async (list) => {
    try {
      const newList = await api.createList(list);
      setLists(prev => [...prev, newList]);
    } catch (error) {
      console.error('Error creating list:', error);
    }
  };

  const updateList = async (id, updatedList) => {
    try {
      const data = await api.updateList(id, updatedList);
      setLists(prev => prev.map(list => list.id === id ? data : list));
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  const deleteList = async (id) => {
    try {
      await api.deleteList(id);
      setLists(prev => prev.filter(list => list.id !== id));
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  return {
    lists,
    loading,
    createList,
    updateList,
    deleteList
  };
};

export default useLists;