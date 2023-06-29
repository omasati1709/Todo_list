import { useState } from 'react';

export default function Home() {
  const [Input, setInput] = useState('');
  const [Search, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);

  //input
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  //search
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  //submit
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (Input.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: Input.trim(),
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setInput('');
    }
  };

  //task complete
  const handleTaskComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  //tast delete
  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  //filter task 
  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(Search.toLowerCase())
  );

  return (
    <div className="container">
    <header>Todo List</header>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={Input}
          onChange={handleInputChange}
          className="input"
        />
        <input
          type="text"
          placeholder="Search tasks"
          value={Search}
          onChange={handleSearchChange}
          className="input"
        />
        <button type="submit" className="button">
          Add Task
        </button>
      </form>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <span className="task-text">{task.text}</span>
            <div>
              <button
                onClick={() => handleTaskComplete(task.id)}
                className="complete-button"
              >
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => handleTaskDelete(task.id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
