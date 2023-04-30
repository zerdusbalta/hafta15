import React, { useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, Card, Form, ListGroup } from 'react-bootstrap';

const initialTasks = [
  { id: uuidv4(), text: 'Yemek yap', completed: false },
  { id: uuidv4(), text: 'Spor yap', completed: true },
  { id: uuidv4(), text: 'Alışveriş yap', completed: false },
];

function taskReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: uuidv4(),
          text: action.text,
          completed: false,
        },
      ];
    case 'toggle':
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    case 'delete':
      return state.filter((task) => task.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [newTask, setNewTask] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: 'add', text: newTask });
    setNewTask('');
  }

  return (
    <div className="container mt-4">
      <Card>

        <Card.Header className="bg-primary text-white">To-Do List</Card.Header>

        <Card.Body>
          <ListGroup>
            {tasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                className={task.completed ? 'text-decoration-line-through' : ''}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <span>{task.text}</span>
                  <div>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => dispatch({ type: 'toggle', id: task.id })}
                    >
                      {task.completed ? 'Unmark' : 'Mark'}
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => dispatch({ type: 'delete', id: task.id })}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>

        <Card.Footer>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Add New Task:</Form.Label>
              <Form.Control
                type="text"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Form>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default App;