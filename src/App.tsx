import {useRef, useState, useEffect} from 'react';
import {Box, Container, Text} from '@chakra-ui/react';
import axios from 'axios';
import Header from './commponents/Header';
import EditForm from './commponents/EditForm';
import SelectFind from './commponents/SelectFind';
import FormInput from './commponents/FormInput';
import TodoArea from './commponents/TodoArea';

type Todo = {
  id: number;
  title: string;
  status: string;
};

const App = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [isEditingTodo, setIsEditingTodo] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>('');
  const [editTextIdNumber, setEditTextIdNumber] = useState<number>();
  const [status, setStatus] = useState<string>('notStarted');
  const [filterStatus, setFilterStatus] = useState<any>([]);

  // const inputRef = useRef<HTMLInputElement>(null!);
  const inputRef = useRef<HTMLInputElement | null>(null); //nullが入ってくる可能性がある。

  const handleChangeInputText = () => {
    if (inputRef === null || inputRef.current === null) return;
    setInputText(inputRef.current.value);
  };

  const handleChangeTodoText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText !== '') {
      await axios
        .post(`${railsApiBaseUrl}/api/v1/posts`, { title: inputText })
        .then((res) => {
          setTodo([
            ...todo,
            { title: res.data.title, id: res.data.id, status: 'notStarted' },
          ]);
          setInputText('');
          if (inputRef.current === null) return;
          inputRef.current.value = "";
        });
    }
  };

  const railsApiBaseUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {

    if (inputRef.current === null) return;
    inputRef.current.focus();

    const fetchDate = async () => {
      const fetchRailsDeta = await axios.get(`${railsApiBaseUrl}/api/v1/posts`);
      setTodo(fetchRailsDeta.data);
    };
    fetchDate();
  }, []);

  useEffect(() => {
    const filterTodos = () => {
      switch (status) {
        case 'all':
          setFilterStatus(todo);
          break;
        case 'notStarted':
          setFilterStatus(todo.filter((todo) => todo.status === 'notStarted'));
          break;
        case 'inProgress':
          setFilterStatus(todo.filter((todo) => todo.status === 'inProgress'));
          break;
        case 'done':
          setFilterStatus(todo.filter((todo) => todo.status === 'done'));
          break;
        default:
          break;
      }
    };
    filterTodos();
  }, [status, todo]);

  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.title);
    setEditTextIdNumber(todo.id);
    setIsEditingTodo(true);
  };

  const handleEditChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const closeEditTodo = () => {
    setIsEditingTodo(false);
    setEditTextIdNumber(0);
  };

  const handleChangeEditTodoText = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (editText !== '') {
      axios
        .patch(`${railsApiBaseUrl}/api/v1/posts/${editTextIdNumber}`, {
          title: editText,
        })
        .then((res) => {
          const editTodo = todo.map((todo) => {
            return todo.id === editTextIdNumber
              ? {...todo, title: res.data.title}
              : todo;
          });
          setTodo(editTodo);
          setIsEditingTodo(false);
        });
    }
  };

  const handleDeleteTodo = async (id: number | undefined) => {
    try {
      await axios.delete(`${railsApiBaseUrl}/api/v1/posts/${id}`);
      setTodo(todo.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
    }
    setIsEditingTodo(false);
  };

  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    selectStatusTodo: any
  ) => {
    axios
      .patch(
        `${railsApiBaseUrl}/api/v1/posts/${selectStatusTodo.id}/toggle_change_status`,
        {
          status: e.target.value,
        }
      )
      .then((res) => {
        const statusTodo = todo.map((todo) => {
          return todo.id === selectStatusTodo.id
            ? {...todo, status: res.data.status}
            : todo;
        });
        setTodo(statusTodo);
      });
  };

  return (
    <>
      <Header/>
      <Box mt={'60px'}>
        <Container>
          <Box h="40px">{isEditingTodo && <Text>タイトルを編集中...</Text>}</Box>
          {isEditingTodo ? (
            <EditForm
              closeEditTodo={closeEditTodo}
              handleChangeEditTodoText={handleChangeEditTodoText}
              editText={editText}
              handleEditChangeText={handleEditChangeText}
            />
          ) : (
            <>
              <FormInput
                handleChangeInputText={handleChangeInputText}
                handleChangeTodoText={handleChangeTodoText}
                inputRef={inputRef}
              />
            </>
          )}

          <SelectFind status={status} setStatus={setStatus}/>
          <TodoArea
            filterStatus={filterStatus}
            handleStatusChange={handleStatusChange}
            handleEditTodo={handleEditTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        </Container>
      </Box>
    </>
  );
};

export default App;
