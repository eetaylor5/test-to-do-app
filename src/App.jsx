import React, { useState } from 'react';
import { Container, Typography, Box, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import SearchBar from './components/SearchBar';
import TodoLists from './components/TodoLists';
import TodoForm from './components/TodoForm';
import useTodos from './hooks/useTodos';
import useLists from './hooks/useLists';

function App() {
  const { todos, loading: todosLoading, createTodo, updateTodo, deleteTodo, duplicateTodo, moveTodo, reorderTodo } = useTodos();
  const { lists, loading: listsLoading, createList, updateList, deleteList } = useLists();
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.tags.some(tag => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const allTags = Array.from(new Set(todos.flatMap(todo => todo.tags.map(tag => JSON.stringify(tag))))).map(str => JSON.parse(str));

  const handleSaveTodo = async (todoData) => {
    if (editingTodo) {
      await updateTodo(editingTodo.id, todoData);
      setEditingTodo(null);
    } else {
      await createTodo(todoData);
    }
    setShowForm(false);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleDeleteList = async (listId) => {
    const confirmed = window.confirm('Delete this list and all its todos?');
    if (!confirmed) return;

    try {
      await Promise.all(
        todos
          .filter(todo => todo.listId === listId)
          .map(todo => deleteTodo(todo.id))
      );
      await deleteList(listId);
    } catch (error) {
      console.error('Error deleting list and todos:', error);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  if (todosLoading || listsLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Your Todo List
      </Typography>
      <SearchBar onSearch={setSearchQuery} />
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setShowForm(true)}>
          Add New Todo List Item
        </Button>
      </Box>
      <Dialog open={showForm} onClose={handleCancelForm} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTodo ? 'Edit Todo' : 'Create New Todo'}</DialogTitle>
        <DialogContent>
          <TodoForm
            todo={editingTodo}
            lists={lists}
            allTags={allTags}
            onSave={handleSaveTodo}
            onCancel={handleCancelForm}
          />
        </DialogContent>
      </Dialog>
      <TodoLists
        lists={lists}
        todos={filteredTodos}
        onUpdateTodo={updateTodo}
        onDeleteTodo={deleteTodo}
        onDuplicateTodo={duplicateTodo}
        onMoveTodo={moveTodo}
        onReorderTodo={reorderTodo}
        onCreateList={createList}
        onUpdateList={updateList}
        onDeleteList={handleDeleteList}
        onEditTodo={handleEditTodo}
      />
    </Container>
  );
}

export default App;
