// import React, {createContext, useState, useContext} from 'react'
// import { v4 } from "uuid"

// const TaskContext = createContext()
// export const useTasks = () => useContext(TaskContext);

// export default function TaskProvider({ children }) {
//   const [tasks, setTasks] = useState([]);

//   const addTask = task =>
//       setTasks([
//           ...tasks,
//           {
//               id: v4(),
//               task,
//               complete: false
//           }
//       ]);

//   const setStatusTask = (id, status) => {
//       setTasks(tasks.map(t => t.id === id ? {...t, complete: status} : t));
//   };
//   return (
//       <TaskContext.Provider value={{ tasks, addTask, setStatusTask }}>
//           { children }
//       </TaskContext.Provider>
//   );
// };

