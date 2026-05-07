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

  const getNextOrder = (listId) => {
    const listOrders = todos
      .filter(todo => todo.listId === listId)
      .map(todo => Number(todo.order ?? 0));

    return listOrders.length ? Math.max(...listOrders) + 1 : 1;
  };

  const createTodo = async (todo) => {
    try {
      const nextOrder = todo.order ?? getNextOrder(todo.listId);
      const newTodo = await api.createTodo({ ...todo, order: nextOrder });
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
    const duplicated = {
      ...todo,
      id: Date.now(),
      title: `${todo.title} (Copy)`,
      order: getNextOrder(todo.listId)
    };
    await createTodo(duplicated);
  };

  const moveTodo = async (id, newListId) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { ...todo, listId: newListId, order: getNextOrder(newListId) });
    }
  };

  const reorderTodo = async (todoId, targetListId, targetIndex) => {
    const movingTodo = todos.find(t => t.id === todoId);
    if (!movingTodo) return;

    const targetListTodos = todos
      .filter(t => t.listId === targetListId && t.id !== todoId)
      .sort((a, b) => (Number(a.order ?? 0) - Number(b.order ?? 0)));

    const updatedOrderTodos = [...targetListTodos];
    updatedOrderTodos.splice(targetIndex, 0, { ...movingTodo, listId: targetListId });

    const updates = updatedOrderTodos.map((todo, index) => {
      const newOrder = index + 1;
      if (Number(todo.order ?? 0) !== newOrder || todo.listId !== targetListId) {
        return api.updateTodo(todo.id, { ...todo, order: newOrder, listId: targetListId });
      }
      return Promise.resolve(todo);
    });

    try {
      const results = await Promise.all(updates);
      setTodos(prev => prev.map(todo => {
        const updated = results.find(result => result.id === todo.id);
        return updated ? updated : todo;
      }));
    } catch (error) {
      console.error('Error reordering todo:', error);
    }
  };

  return {
    todos,
    loading,
    createTodo,
    updateTodo,
    deleteTodo,
    duplicateTodo,
    moveTodo,
    reorderTodo
  };
};

export default useTodos;