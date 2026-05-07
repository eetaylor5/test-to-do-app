import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import TodoItem from './TodoItem';

const TodoList = ({ list, todos, onUpdateTodo, onDeleteTodo, onDuplicateTodo, onMoveTodo, allLists, onEditTodo }) => {
  const listTodos = todos.filter(todo => todo.listId === list.id);

  const handleMove = (todoId, newListId) => {
    onMoveTodo(todoId, newListId);
  };

  return (
    <Box sx={{ mb: 4 }}>
      {listTodos.map(todo => (
        <Box key={todo.id}>
          <TodoItem
            todo={todo}
            onUpdate={onUpdateTodo}
            onDelete={onDeleteTodo}
            onDuplicate={onDuplicateTodo}
            onEdit={onEditTodo}
          />
          <Box sx={{ ml: 2, mb: 1 }}>
            {allLists.filter(l => l.id !== list.id).map(otherList => (
              <Button
                key={otherList.id}
                size="small"
                onClick={() => handleMove(todo.id, otherList.id)}
              >
                Move to {otherList.name}
              </Button>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TodoList;