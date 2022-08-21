import { FC } from "react";
import { layout, VStack } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import TotalCount from "./TotalCount";
import Todo from "../models/todo";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_TODO, UPDATE_TODO_STATUS, DELETE_TODO } from "../apollo/todos";

interface TodosData {
  todos: Todo[];
}

const TodoList = () => {
  const { loading, error, data } = useQuery<TodosData>(ALL_TODO);
  const [toggleTodo, { error: updateErrorStatus }] =
    useMutation<Todo>(UPDATE_TODO_STATUS);

  const [removeTodo, { error: removeErrorTodo }] = useMutation(DELETE_TODO, {
    update(cache, { data: { removeTodo } }) {
      cache.modify({
        fields: {
          allTodos(currentTodos = []) {
            return currentTodos.filter(
              (todo: any) => todo.__ref !== `Todo:${removeTodo.id}`
            );
          },
        },
      });
    },
  });

  const todos: Todo[] = [];

  if (loading) {
    return <Spinner />;
  }

  if (error || updateErrorStatus || removeErrorTodo) {
    return <h2>Error....</h2>;
  }

  return (
    <>
      <VStack spacing={2} mt={4}>
        {data &&
          data.todos.map((todo: Todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={removeTodo}
            />
          ))}
      </VStack>
      <TotalCount />
    </>
  );
};

export default TodoList;
