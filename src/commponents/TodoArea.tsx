import {
  Text,
  Button,
  Flex,
  ListItem,
  UnorderedList,
  Select,
  Box,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { FC } from 'react';

type Props = {
  filterStatus: never[];
  handleStatusChange: any
  handleEditTodo: any
  handleDeleteTodo: any
};

const TodoArea: FC<Props> = ({
  filterStatus,
  handleStatusChange,
  handleEditTodo,
  handleDeleteTodo,
}) => {
  return (
    <Box mt={'50'}>
      <UnorderedList>
        {filterStatus.map((todo: any) => (
          <ListItem mb={'10px'} key={todo.id}>
            <Flex justify={'space-between'}>
              <Text> {todo.title}</Text>
              <Flex>
                <Select
                  mr={'5px'}
                  value={todo.status}
                  onChange={(e) => handleStatusChange(e, todo)}
                >
                  <option value="notStarted">未着手</option>
                  <option value="inProgress">作業中</option>
                  <option value="done">完了</option>
                </Select>
                <Button
                  mr={'5px'}
                  bg={'blue.400'}
                  color={'white'}
                  onClick={() => handleEditTodo(todo)}
                >
                  <EditIcon />
                </Button>
                <Button
                  bg={'red.400'}
                  color={'white'}
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <DeleteIcon />
                </Button>
              </Flex>
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default TodoArea;
