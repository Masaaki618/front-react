import { Box, Container, Text } from '@chakra-ui/react';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <Box boxShadow="md" h={'65px'} lineHeight={'65px'}>
      <Container>
        <Text fontSize={'24px'} fontWeight={'bold'}>
          TODOリスト
        </Text>
      </Container>
    </Box>
  );
};

export default Header;
