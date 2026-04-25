import { useState, useEffect } from 'react';
import { api } from '../utils/api';

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await api.getTodos();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (todo) => {
    try {
      const newTodo = await api.createTodo(todo);
      setTodos(prev => [...prev, newTodo]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const data = await api.updateTodo(id, updatedTodo);
      setTodos(prev => prev.map(todo => todo.id === id ? data : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const duplicateTodo = async (todo) => {
    const duplicated = { ...todo, id: Date.now(), title: `${todo.title} (Copy)` };
    await createTodo(duplicated);
  };

  const moveTodo = async (id, newListId) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { ...todo, listId: newListId });
    }
  };

  return {
    todos,
    loading,
    createTodo,
    updateTodo,
    deleteTodo,
    duplicateTodo,
    moveTodo
  };
};

export default useTodos;