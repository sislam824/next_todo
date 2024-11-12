import React, { useState, useEffect } from "react";
import styles from "../styles/Todos.module.css";

interface Task {
  text: string;
  completed: boolean;
  priority: string;
  description: string;
}

const Todos: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskData: Task = {
        text: newTask,
        completed: false,
        priority,
        description,
      };
      setTasks((prev) => [...prev, newTaskData]);
      setNewTask("");
      setPriority("");
      setDescription("");
      alert("Task added successfully");
    }
  };

  const markTaskCompleted = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks(updatedTasks);
    alert("Task marked as completed");
  };

  const markTaskPending = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = false;
    setTasks(updatedTasks);
    alert("Task marked as pending");
  };

  const removeTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    alert("Task deleted");
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.todoContainer}>
        <h2 className={styles.todo}>Todo List</h2>
        <div className={styles.data}>
          <p className={styles.taskCount}>
            <span>Total tasks:</span> {totalTasks}
          </p>
          <p className={styles.completedCount}>
            <span>Completed tasks:</span> {completedTasks}
          </p>
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            className={styles.taskInput}
          />
          <select
            className={styles.priority}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Priority</option>
            <option value="urgent">Urgent</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            cols={30}
            rows={10}
          ></textarea>
          <button onClick={addTask} className={styles.addButton}>
            Add Task
          </button>
        </div>
      </div>

      <ul className={styles.taskList}>
        {tasks.map((task, index) => (
          <li key={index} className={styles.taskItem}>
            <div className={styles.taskListData}>
              <h3>Name:</h3>
              <h3 className={styles.taskText}>{task.text}</h3>
              <p>Description:</p>
              <p className={styles.description}>{task.description}</p>
              <p>Priority:</p>
              <p className={styles.taskPriority}>{task.priority}</p>
            </div>
            <div className={styles.buttonContainer}>
              <h3>Status:</h3>
              {!task.completed ? (
                <button
                  className={`${styles.toggle} ${styles.pending}`}
                  onClick={() => markTaskCompleted(index)}
                >
                  Pending
                </button>
              ) : (
                <button
                  className={`${styles.toggle} ${styles.completed}`}
                  onClick={() => markTaskPending(index)}
                >
                  Completed
                </button>
              )}
              <button
                className={styles.remove}
                onClick={() => removeTask(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
