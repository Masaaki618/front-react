import React, { FC } from 'react';

import {
  Input,
  FormControl,
  Button,
  FormHelperText,
  Flex,
  Box
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

type Props = {
  handleEditChangeText: (Event: React.ChangeEvent<HTMLInputElement>) => void;
  editText: string;
  handleChangeEditTodoText: (Event: React.ChangeEvent<HTMLFormElement>) => void;
  closeEditTodo: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const EditForm: FC<Props> = ({
  handleEditChangeText,
  editText,
  handleChangeEditTodoText,
  closeEditTodo,
}) => {
  return (
    <form onSubmit={handleChangeEditTodoText}>
      <FormControl>
        <Flex>
          <Input type="text" value={editText} onChange={handleEditChangeText} />
          <Button bg="blue.400" type="submit" mx="5px" color="white">
            <CheckIcon />
          </Button>
          <Button
            bg="red.400"
            type="submit"
            color={'white'}
            onClick={closeEditTodo}
          >
            <CloseIcon />
          </Button>
        </Flex>
        <FormHelperText>タイトルを入力してください</FormHelperText>
      </FormControl>
    </form>
  );
};

export default EditForm;
