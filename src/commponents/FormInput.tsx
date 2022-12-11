import { FC } from 'react';
import {
  Input,
  FormControl,
  Button,
  FormHelperText,
  Flex,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

type Props = {
  handleChangeInputText: (Event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeTodoText: (Event: React.ChangeEvent<HTMLFormElement>) => void;
  inputRef: any
};
const FormInput: FC<Props> = ({
  handleChangeInputText,
  handleChangeTodoText,
  inputRef,
}) => {
  return (
    <form onSubmit={handleChangeTodoText}>
      <FormControl>
        <Flex>
          <Input type="text" ref={inputRef} onChange={handleChangeInputText} />
          <Button colorScheme="green" type="submit">
            <CheckIcon />
          </Button>
        </Flex>
        <FormHelperText>タイトルを入力してください</FormHelperText>
      </FormControl>
    </form>
  );
};

export default FormInput;
