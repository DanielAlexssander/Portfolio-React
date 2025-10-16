import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Link, Button, Image } from '@chakra-ui/react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [age, setAge] = useState(0);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const date = new Date();
    const currentDate = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    
    let myAge = currentYear - 2006;
    if (currentMonth > 8 || (currentMonth === 8 && currentDate >= 16)) {
      myAge = currentYear - 2005;
    }
    setAge(myAge);

    const currentHour = date.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Bom dia');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  return (
    <Box as="header" bg="linear-gradient(180deg, #002d54 0%, #022f5c 37.22%, #000613 100%)">
      <Box
        pt="1em"
        pb="1em"
        w="99%"
        display="flex"
        justifyContent="center"
        textTransform="uppercase"
        fontSize="1.2em"
        letterSpacing="1px"
        zIndex={2}
      >
        <Button
          display={{ base: 'block', md: 'none' }}
          onClick={() => setIsNavOpen(!isNavOpen)}
          bg="transparent"
          border="none"
          color="white"
          fontSize="1.6em"
          p={0}
        >
          {isNavOpen ? <FaTimes /> : <FaBars />}
        </Button>
        <Box
          as="ul"
          pl={0}
          display={{ base: isNavOpen ? 'block' : 'none', md: 'flex' }}
          bg={{ base: 'rgba(0,0,0,0.9)', md: 'transparent' }}
          position={{ base: 'absolute', md: 'static' }}
          left={{ base: 0, md: 'auto' }}
          top={{ base: '45px', md: 'auto' }}
          p={{ base: '1em', md: 0 }}
          borderRadius={{ base: '10px', md: 0 }}
          zIndex={9999}
          maxH={{ base: isNavOpen ? '1000px' : '0', md: 'auto' }}
          overflow={{ base: 'hidden', md: 'visible' }}
          transition="visibility 0.5s, max-height 0.5s"
          visibility={{ base: isNavOpen ? 'visible' : 'hidden', md: 'visible' }}
        >
          {['Home', 'Projetos', 'Contatos', 'GitHub'].map((item, index) => {
            const hrefs = ['#', '#projects', '#container-contacts', 'https://github.com/DanielAlexssander'];
            return (
              <Box
                key={item}
                as="li"
                display={{ base: 'block', md: 'inline-block' }}
                listStyleType="none"
                ml={{ base: 0, md: index === 0 ? 0 : '2em' }}
                mb={{ base: index === 3 ? 0 : '1em', md: 0 }}
                p={{ base: '1em', md: 0 }}
              >
                <Link
                  href={hrefs[index]}
                  position="relative"
                  color="white"
                  textDecoration="none"
                  fontWeight="bold"
                  transition="0.3s"
                  p={{ base: '1em', md: 0 }}
                  _hover={{ color: 'rgb(0, 55, 173)' }}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '2px',
                    left: 0,
                    bottom: 0,
                    bg: 'rgb(0, 55, 173)',
                    transform: 'scale(0, 1)',
                    transition: 'transform 0.3s ease'
                  }}
                  sx={{
                    '&:hover::after': {
                      transform: 'scale(1, 1)'
                    }
                  }}
                >
                  {item}
                </Link>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Flex
        fontSize="1.3em"
        color="white"
        w="100%"
        h="100vh"
        justifyContent="center"
        alignItems="center"
        id="home"
        pb={{ base: '5em', md: 0 }}
      >
        <Box
          m={{ base: '2em 2em 0 2em', md: '0 2em 0 2em' }}
          maxW={{ base: '90%', sm: '80%', md: '70%', lg: '60%', xl: '40%' }}
          bg="#00000036"
          p="2.5em 2.5em 4em 2.5em"
          borderRadius="10px"
        >
          <Box>
            <Heading as="h1" mb="1em">Daniel Alexssander</Heading>
            <Heading
              as="h2"
              pl={{ base: '3.5em', md: '5em' }}
              mb="1em"
              color="rgb(0, 59, 187)"
              transition="0.5s"
              fontSize={{ base: '1.1em', md: 'inherit' }}
              _hover={{ pl: { base: '4.5em', md: '6.5em' } }}
            >
              Desenvolvedor Front-End
            </Heading>
          </Box>
          <Text mb="3em">
            Olá {greeting}! Tenho {age} anos. Sou uma pessoa focada no meu
            objetivo, e atualmente meu objetivo é me tornar um desenvolvedor
            de sucesso. Dedico grande parte do meu tempo para estudar e
            aprimorar minhas habilidades nessa área, buscando sempre me
            atualizar sobre as últimas tendências e tecnologias. Meu
            objetivo é me tornar um profissional competente e capaz de
            oferecer soluções criativas e eficientes para os desafios que
            surgirem na área.
          </Text>
          <Box>
            <Link
              href="#projects"
              textDecoration="none"
              fontWeight="bold"
              color="rgb(209, 209, 209)"
              p="35px 15px 35px 15px"
              border="4.5px solid"
              borderColor="rgb(0, 59, 187) transparent rgb(0, 59, 187) rgb(0, 59, 187)"
              borderRadius="50%"
              boxShadow="rgb(0, 59, 187) -15px 0px 20px -18px"
              transition="0.5s"
              mr="3em"
              _hover={{ boxShadow: 'rgb(0, 59, 187) -15px 0px 20px -12px', textDecoration: 'none' }}
            >
              Projetos
            </Link>
            <Link
              href="#container-contacts"
              textDecoration="none"
              fontWeight="bold"
              color="rgb(209, 209, 209)"
              p="35px 15px 35px 15px"
              border="4.5px solid"
              borderColor="rgb(0, 59, 187) transparent rgb(0, 59, 187) rgb(0, 59, 187)"
              borderRadius="50%"
              boxShadow="rgb(0, 59, 187) -15px 0px 20px -18px"
              transition="0.5s"
              _hover={{ boxShadow: 'rgb(0, 59, 187) -15px 0px 20px -12px', textDecoration: 'none' }}
            >
              Contatos
            </Link>
          </Box>
        </Box>
        <Image
          src="/logo.png"
          alt=""
          w="400px"
          h="400px"
          ml="2em"
          borderRadius="50%"
          boxShadow="#0a0c10 10px 10px 50px"
          display={{ base: 'none', lg: 'block' }}
        />
      </Flex>
    </Box>
  );
};

export default Header;