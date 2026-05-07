const API_BASE_URL = 'http://localhost:3001';

export const api = {
  // Todos
  getTodos: () => fetch(`${API_BASE_URL}/todos`).then(res => res.json()),
  getTodo: (id) => fetch(`${API_BASE_URL}/todos/${id}`).then(res => res.json()),
  createTodo: (todo) => fetch(`${API_BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  }).then(res => res.json()),
  updateTodo: (id, todo) => fetch(`${API_BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo)
  }).then(res => res.json()),
  deleteTodo: (id) => fetch(`${API_BASE_URL}/todos/${id}`, { method: 'DELETE' }),

  // Lists
  getLists: () => fetch(`${API_BASE_URL}/lists`).then(res => res.json()),
  getList: (id) => fetch(`${API_BASE_URL}/lists/${id}`).then(res => res.json()),
  createList: (list) => fetch(`${API_BASE_URL}/lists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(list)
  }).then(res => res.json()),
  updateList: (id, list) => fetch(`${API_BASE_URL}/lists/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(list)
  }).then(res => res.json()),
  deleteList: (id) => fetch(`${API_BASE_URL}/lists/${id}`, { method: 'DELETE' }),

  // Search
  searchTodos: (query) => fetch(`${API_BASE_URL}/todos?q=${encodeURIComponent(query)}`).then(res => res.json())
};