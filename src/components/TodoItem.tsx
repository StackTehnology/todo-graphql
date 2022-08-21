import { FC } from "react";
import { Checkbox, Text, CloseButton, HStack } from "@chakra-ui/react";
import Todo from "../models/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: ({}) => void;
  onDelete: ({}) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  todo: { id, completed, title },
  onToggle,
  onDelete,
}) => {
  return (
    <HStack spacing={3}>
      <Checkbox
        isChecked={completed}
        onChange={() =>
          onToggle({
            variables: {
              id,
              completed: !completed,
            },
          })
        }
      />
      <Text>{title}</Text>
      <CloseButton onClick={() => onDelete({ variables: { id } })} />
    </HStack>
  );
};

export default TodoItem;
