import { useState, FC, KeyboardEvent } from "react";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { ADD_TODO, ALL_TODO } from "../apollo/todos";
import Todo from "../models/todo";

const AddTodo: FC = () => {
  const [text, setText] = useState<string>("");
  const [addTodo, { error, data }] = useMutation(ADD_TODO, {
    // refetchQueries: [{ query: ALL_TODO }],
    update(cache, { data: { newTodo } }) {
      const { todos }: { todos: Todo[] } = cache.readQuery({
        query: ALL_TODO,
      })!;
      cache.writeQuery({
        query: ALL_TODO,
        data: {
          todos: [...todos, newTodo],
        },
      });
    },
  });

  const handleAddTodo = () => {
    if (text.trim().length) {
      addTodo({
        variables: {
          title: text,
          completed: false,
          user_id: 123,
        },
      });
      setText("");
    }
  };

  const handleKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleAddTodo();
  };

  if (error) {
    return <h2>Error...</h2>;
  }
  return (
    <FormControl display={"flex"} mt={6}>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKey}
      />
      <Button onClick={handleAddTodo}>Add todo</Button>
    </FormControl>
  );
};

export default AddTodo;
