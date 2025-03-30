import './App.css';
// import AuthPage from './components/AuthPage'; // No longer needed here
import TaskManager from './components/TaskManager'; // Import the Task Manager component

function App() {
  return (
    <div className="App">
      {/* <AuthPage /> */} {/* Commented out or removed AuthPage */}
      <TaskManager /> {/* Render the Task Manager */}
    </div>
  );
}

export default App;
