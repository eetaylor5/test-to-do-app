import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import TodoItem from './TodoItem';

const TodoList = ({ list, todos, onUpdateTodo, onDeleteTodo, onDuplicateTodo, onMoveTodo, onReorderTodo, onEditTodo }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const listTodos = todos
    .filter(todo => todo.listId === list.id)
    .sort((a, b) => (Number(a.order ?? 0) - Number(b.order ?? 0)));

  const handleDragStart = (event, todoId) => {
    event.dataTransfer.setData('text/plain', String(todoId));
    event.dataTransfer.effectAllowed = 'move';
  };

  const autoScrollWindow = (clientY) => {
    const edgeThreshold = 80;
    const scrollAmount = 20;

    if (clientY < edgeThreshold) {
      window.scrollBy({ top: -scrollAmount, left: 0 });
    } else if (clientY > window.innerHeight - edgeThreshold) {
      window.scrollBy({ top: scrollAmount, left: 0 });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
    autoScrollWindow(event.clientY);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const todoId = event.dataTransfer.getData('text/plain');
    if (!todoId) return;
    onMoveTodo(isNaN(Number(todoId)) ? todoId : Number(todoId), list.id);
  };

  const handleItemDrop = (event, targetIndex) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    const todoId = event.dataTransfer.getData('text/plain');
    if (!todoId) return;
    onReorderTodo(isNaN(Number(todoId)) ? todoId : Number(todoId), list.id, targetIndex);
  };

  return (
    <Box
      sx={{ mb: 4, p: 1, borderRadius: 1, backgroundColor: isDragOver ? 'rgba(25, 118, 210, 0.08)' : 'transparent' }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Drag todos here to move them into this list.
      </Typography>
      {listTodos.map((todo, index) => (
        <Box
          key={todo.id}
          draggable
          onDragStart={(event) => handleDragStart(event, todo.id)}
          onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
          }}
          onDrop={(event) => handleItemDrop(event, index)}
        >
          <TodoItem
            todo={todo}
            onUpdate={onUpdateTodo}
            onDelete={onDeleteTodo}
            onDuplicate={onDuplicateTodo}
            onEdit={onEditTodo}
          />
        </Box>
      ))}
    </Box>
  );
};

export default TodoList;