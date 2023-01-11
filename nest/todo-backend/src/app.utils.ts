export const listShow = todos => 
  `${todos.map(todo => (todo.isCompleted ? "Y": "N") + "  " + todo.name + "\n").join("")}`

