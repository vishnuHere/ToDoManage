export const updateList = (name, priority, status) => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const data = [...tasks, { name, priority, status }];
  localStorage.setItem("tasks", JSON.stringify(data));
};

export const insertTaskList = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
