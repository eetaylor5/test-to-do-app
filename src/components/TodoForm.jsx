import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Box, Chip, Typography, Autocomplete } from '@mui/material';

const TodoForm = ({ todo, lists, allTags, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'not started',
    tags: [],
    dueDate: '',
    listId: lists[0]?.id || 1
  });
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#1976d2');

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description,
        status: todo.status,
        tags: todo.tags,
        dueDate: todo.dueDate || '',
        listId: todo.listId
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'not started',
        tags: [],
        dueDate: '',
        listId: lists[0]?.id || 1
      });
    }
  }, [todo, lists]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (newTagName.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, { name: newTagName.trim(), color: newTagColor }]
      }));
      setNewTagName('');
    }
  };

  const handleRemoveTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      ...formData,
      createdDate: todo ? todo.createdDate : new Date().toISOString().split('T')[0]
    };
    onSave(newTodo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select name="status" value={formData.status} onChange={handleChange}>
          <MenuItem value="not started">Not Started</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>Tags</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <Autocomplete
            options={allTags}
            getOptionLabel={(option) => option.name}
            freeSolo
            sx={{ flexGrow: 1 }}
            renderInput={(params) => <TextField {...params} label="Tag Name" size="small" />}
            value={null}
            onChange={(event, newValue) => {
              if (newValue) {
                if (typeof newValue === 'string') {
                  setNewTagName(newValue);
                } else {
                  setNewTagName(newValue.name);
                  setNewTagColor(newValue.color);
                }
              }
            }}
            inputValue={newTagName}
            onInputChange={(event, newInputValue) => {
              setNewTagName(newInputValue);
            }}
          />
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Color</InputLabel>
            <Select value={newTagColor} onChange={(e) => setNewTagColor(e.target.value)}>
              <MenuItem value="#1976d2">Blue</MenuItem>
              <MenuItem value="#ff9800">Orange</MenuItem>
              <MenuItem value="#4caf50">Green</MenuItem>
              <MenuItem value="#f44336">Red</MenuItem>
              <MenuItem value="#9c27b0">Purple</MenuItem>
              <MenuItem value="#ff5722">Deep Orange</MenuItem>
              <MenuItem value="#607d8b">Blue Grey</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" size="small" onClick={handleAddTag}>Add</Button>
        </Box>
        <Box>
          {formData.tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag.name}
              sx={{ mr: 1, mb: 1, backgroundColor: tag.color, color: 'white' }}
              onDelete={() => handleRemoveTag(index)}
            />
          ))}
        </Box>
      </Box>
      <TextField
        name="dueDate"
        label="Due Date"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>List</InputLabel>
        <Select name="listId" value={formData.listId} onChange={handleChange}>
          {lists.map(list => <MenuItem key={list.id} value={list.id}>{list.name}</MenuItem>)}
        </Select>
      </FormControl>
      <Box>
        <Button type="submit" variant="contained" sx={{ mr: 1 }}>Save</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Box>
    </form>
  );
};

export default TodoForm;