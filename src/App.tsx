import { FC } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App: FC = () => {
  return (
    <div className="App">
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
