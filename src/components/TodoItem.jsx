import React from 'react';
import { Card, CardContent, Typography, Select, MenuItem, Button, Chip, Box } from '@mui/material';
import { format } from 'date-fns';

const TodoItem = ({ todo, onUpdate, onDelete, onDuplicate, onEdit }) => {
  const handleStatusChange = (event) => {
    onUpdate(todo.id, { ...todo, status: event.target.value });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{todo.title}</Typography>
        <Typography variant="body2" color="text.secondary">{todo.description}</Typography>
        <Box sx={{ mt: 1, mb: 1 }}>
          {todo.tags.map(tag => <Chip key={tag.name} label={tag.name} size="small" sx={{ mr: 1, backgroundColor: tag.color, color: 'white' }} />)}
        </Box>
        <Select value={todo.status} onChange={handleStatusChange} size="small">
          <MenuItem value="not started">Not Started</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </Select>
        <Typography variant="caption" display="block">
          Due: {todo.dueDate ? format(new Date(todo.dueDate), 'PPP') : 'No due date'}
        </Typography>
        <Typography variant="caption" display="block">
          Created: {format(new Date(todo.createdDate), 'PPP')}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button size="small" onClick={() => onEdit(todo)}>Edit</Button>
          <Button size="small" onClick={() => onDuplicate(todo)}>Duplicate</Button>
          <Button size="small" color="error" onClick={() => onDelete(todo.id)}>Delete</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoItem;