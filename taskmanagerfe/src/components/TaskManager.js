import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import './TaskManager.css';

// Define the base URL for the backend API
const API_URL = 'http://localhost:8080/api/tasks'; // Adjust if your backend runs on a different port

const TaskManager = () => {
  // State for tasks, initialized as empty array
  const [tasks, setTasks] = useState([]);
  // State for the new task input (renamed to title)
  const [newTaskTitle, setNewTaskTitle] = useState('');
  // State for the current filter ('all', 'pending', 'completed')
  const [filter, setFilter] = useState('all');
  // State to track which task is being edited
  const [editingTaskId, setEditingTaskId] = useState(null);
  // State to hold the title of the task being edited (renamed)
  const [editingTaskTitle, setEditingTaskTitle] = useState('');
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);


  // Fetch tasks from backend when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError('Failed to load tasks. Please ensure the backend is running.');
        setTasks([]); // Clear tasks on error
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this runs once on mount

  // Handle input change for the new task form
  const handleInputChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  // Handle adding a new task via API
  const handleAddTask = async (event) => {
    event.preventDefault();
    if (newTaskTitle.trim() === '') return;

    const newTaskPayload = {
      title: newTaskTitle,
      description: '', // Add description if needed, empty for now
      completed: false,
    };

    try {
      const response = await axios.post(API_URL, newTaskPayload);
      setTasks([...tasks, response.data]); // Add the new task returned by the backend
      setNewTaskTitle(''); // Clear input
    } catch (err) {
      console.error("Error adding task:", err);
      setError('Failed to add task.');
    }
  };

  // Handle toggling the completion status via API
  const handleToggleComplete = async (taskId) => {
    const taskToToggle = tasks.find((task) => task.id === taskId);
    if (!taskToToggle) return;

    const updatedTaskPayload = {
      ...taskToToggle,
      completed: !taskToToggle.completed,
    };

    try {
      const response = await axios.put(`${API_URL}/${taskId}`, updatedTaskPayload);
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? response.data : task
        )
      );
    } catch (err) {
      console.error("Error updating task status:", err);
      setError('Failed to update task status.');
      // Optional: revert optimistic update if implemented
    }
  };

  // Handle deleting a task via API
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      setError('Failed to delete task.');
       // Handle cases where the task might not exist on the backend (e.g., 404)
       if (err.response && err.response.status === 404) {
         // Task already deleted or never existed, remove from local state anyway
         setTasks(tasks.filter((task) => task.id !== taskId));
       }
    }
  };

  // Handle starting the edit process for a task
  const handleStartEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title); // Use title
  };

  // Handle changes to the edit input field
  const handleEditChange = (event) => {
    setEditingTaskTitle(event.target.value);
  };

  // Handle saving the edited task via API
  const handleSaveEdit = async (taskId) => {
     const taskToEdit = tasks.find((task) => task.id === taskId);
     if (!taskToEdit) return;

    if (editingTaskTitle.trim() === '') {
      // If title is empty after edit, delete the task
      handleDeleteTask(taskId);
    } else {
       const updatedTaskPayload = {
         ...taskToEdit,
         title: editingTaskTitle, // Update title
       };
      try {
        const response = await axios.put(`${API_URL}/${taskId}`, updatedTaskPayload);
        setTasks(
          tasks.map((task) =>
            task.id === taskId ? response.data : task
          )
        );
      } catch (err) {
        console.error("Error saving task:", err);
        setError('Failed to save task.');
      }
    }
    setEditingTaskId(null); // Exit editing mode
    setEditingTaskTitle('');
  };

  // Handle cancelling the edit
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskTitle('');
  };


  // Handle changing the filter
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Filter tasks based on the current filter state
  const filteredTasks = tasks.filter((task) => {
    if (!task) return false; // Add check for undefined task
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'pending') {
      return !task.completed;
    }
    return true; // 'all' filter shows all tasks
  });

  return (
    <div className="task-manager-container">
      <h1>Task Manager</h1>

      {/* Display Loading or Error Messages */}
      {loading && <p>Loading tasks...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={handleInputChange}
          placeholder="Add a new task title"
          className="task-input"
          disabled={loading} // Disable input while loading
        />
        <button type="submit" className="add-btn" disabled={loading}>Add Task</button>
      </form>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => handleFilterChange('pending')} className={filter === 'pending' ? 'active' : ''}>Pending</button>
        <button onClick={() => handleFilterChange('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
      </div>

      {/* Task List - Only show if not loading and no critical error */}
      {!loading && !error && (
        <ul className="task-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''} ${editingTaskId === task.id ? 'editing' : ''}`}>
                {editingTaskId === task.id ? (
                  // Editing view
                  <>
                    <input
                      type="text"
                      value={editingTaskTitle} // Use editingTaskTitle
                      onChange={handleEditChange}
                      className="edit-input"
                      autoFocus // Focus the input when editing starts
                    />
                    <div className="task-actions">
                      <button onClick={() => handleSaveEdit(task.id)} className="save-btn">Save</button>
                      <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                    </div>
                  </>
                ) : (
                  // Default view
                  <>
                    <span onClick={() => handleToggleComplete(task.id)} className="task-text">
                      {task.title} {/* Display title */}
                    </span>
                    <div className="task-actions">
                      <button onClick={() => handleStartEdit(task)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDeleteTask(task.id)} className="delete-btn">Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            <li className="no-tasks">
              {tasks.length === 0 ? 'No tasks yet. Add one!' : 'No tasks match the current filter.'}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default TaskManager;
