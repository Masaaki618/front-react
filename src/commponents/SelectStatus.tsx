import { Select } from '@chakra-ui/react';
import { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
};

const SelectStatus: FC<Props> = ({ status, setStatus }) => {
  return (
    <Select
      mr={'5px'}
      w={'33%'}
      mt={'10px'}
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="all">全てのTODOを表示</option>
      <option value="notStarted">未着手</option>
      <option value="inProgress">作業中</option>
      <option value="done">完了</option>
    </Select>
  );
};

export default SelectStatus;
