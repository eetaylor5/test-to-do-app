import React, { useState } from 'react';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import TodoList from './TodoList';

const TodoLists = ({ lists, todos, onUpdateTodo, onDeleteTodo, onDuplicateTodo, onMoveTodo, onReorderTodo, onCreateList, onUpdateList, onEditTodo }) => {
  const [newListName, setNewListName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingList, setEditingList] = useState(null);
  const [editListName, setEditListName] = useState('');

  const handleCreateList = () => {
    if (newListName.trim()) {
      onCreateList({ name: newListName.trim() });
      setNewListName('');
      setDialogOpen(false);
    }
  };

  const handleEditList = (list) => {
    setEditingList(list);
    setEditListName(list.name);
  };

  const handleSaveEditList = () => {
    if (editListName.trim() && editingList) {
      onUpdateList(editingList.id, { ...editingList, name: editListName.trim() });
      setEditingList(null);
      setEditListName('');
    }
  };

  const handleCancelEditList = () => {
    setEditingList(null);
    setEditListName('');
  };

  return (
    <Box>
      <Button variant="contained" onClick={() => setDialogOpen(true)} sx={{ mb: 2 }}>
        Create New List
      </Button>
      {lists.map(list => (
        <Box key={list.id} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>{list.name}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
            <Button size="small" onClick={() => handleEditList(list)}>Edit Name</Button>
          </Box>
          <TodoList
            list={list}
            todos={todos}
            onUpdateTodo={onUpdateTodo}
            onDeleteTodo={onDeleteTodo}
            onDuplicateTodo={onDuplicateTodo}
            onMoveTodo={onMoveTodo}
            onReorderTodo={onReorderTodo}
            onEditTodo={onEditTodo}
          />
        </Box>
      ))}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Create New List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="List Name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateList}>Create</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={!!editingList} onClose={handleCancelEditList}>
        <DialogTitle>Edit List Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="List Name"
            value={editListName}
            onChange={(e) => setEditListName(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEditList}>Cancel</Button>
          <Button onClick={handleSaveEditList}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoLists;