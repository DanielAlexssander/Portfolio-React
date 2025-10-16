import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import { FaReact } from "react-icons/fa6";

const Footer = () => {
  return (
    <Box as="footer">
      <Flex
        justifyContent="center"
        alignItems="center"
        color="white"
        bg="#0a0c10"
        textAlign="center"
        p="1em 0 1em 0"
        flexDirection="row"
      >
        <Heading as="h4" size="md" mb={4}>
          Tecnologias Utilizadas:
        </Heading>
        
        <Flex
          sx={{ listStyle: 'none' }}
          fontSize="2em"
          mb={4}
        >
          <Box ml="1em">
            <FaReact color="#61DAFB" />
          </Box>
        </Flex>
        
        <Link
          href="https://github.com/DanielAlexssander/Projetos"
          target="_blank"
          textDecoration="none"
          ml="4em"
          color="white"
          border="solid 1px rgb(0, 59, 187)"
          p="0.8em"
          transition="0.5s"
          _hover={{
            bg: 'rgb(0, 59, 187)',
            textDecoration: 'none'
          }}
        >
          Código desta página
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;