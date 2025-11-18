import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Link, Button, Image, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import BrazilIcon from './Icons/BrazilIcon';
import UsaIcon from './Icons/UsaIcon';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
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
      setGreeting(t('goodMorning'));
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting(t('goodAfternoon'));
    } else {
      setGreeting(t('goodEvening'));
    }
  }, [language, t]);

  return (
    <Box as="header" bg="linear-gradient(180deg, #002d54 0%, #022f5c 37.22%, #000613 100%)">
      <Box
        position="relative"
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
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FaChevronDown />}
            position="absolute"
            left={2}
            bg="transparent"
            border="1px solid rgba(255,255,255,0.3)"
            color="white"
            fontSize="14px"
            _hover={{ bg: 'rgba(255,255,255,0.1)' }}
            _active={{ bg: 'rgba(255,255,255,0.1)' }}
            size="sm"
          >
            <Flex align="center" gap={2}>
              {language === 'pt' ? <BrazilIcon width="18px" height="18px" /> : <UsaIcon width="18px" height="18px" />}
              {language === 'pt' ? 'Português' : 'English'}
            </Flex>
          </MenuButton>
          <MenuList bg="#002d54" border="1px solid rgba(255,255,255,0.3)">
            <MenuItem
              onClick={() => setLanguage('pt')}
              bg={language === 'pt' ? 'rgba(0, 59, 187, 0.3)' : 'transparent'}
              color="white"
              _hover={{ bg: 'rgba(0, 59, 187, 0.5)' }}
            >
              <Flex align="center" gap={2}>
                <BrazilIcon width="16px" height="16px" />
                Português
              </Flex>
            </MenuItem>
            <MenuItem
              onClick={() => setLanguage('en')}
              bg={language === 'en' ? 'rgba(0, 59, 187, 0.3)' : 'transparent'}
              color="white"
              _hover={{ bg: 'rgba(0, 59, 187, 0.5)' }}
            >
              <Flex align="center" gap={2}>
                <UsaIcon width="16px" height="16px" />
                English
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
        
        <Button
          display={{ base: 'block', md: 'none' }}
          onClick={() => setIsNavOpen(!isNavOpen)}
          bg="transparent"
          border="none"
          color="white"
          fontSize="1.4em"
          p={2}
          _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
          borderRadius="md"
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
          {[t('home'), t('projects'), t('contacts'), t('github')].map((item, index) => {
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
        fontSize={{ base: '1.1em', md: '1.3em' }}
        color="white"
        w="100%"
        minH="100vh"
        justifyContent="center"
        alignItems="center"
        id="home"
        pb={{ base: '5em', md: 0 }}
        px={{ base: '1rem', md: '2rem' }}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Box
          maxW={{ base: '95%', sm: '85%', md: '75%', lg: '50%', xl: '40%' }}
          bg="rgba(0, 0, 0, 0.4)"
          p={{ base: '2rem', md: '2.5rem 2.5rem 3rem 2.5rem' }}
          borderRadius="15px"
          backdropFilter="blur(10px)"
          border="1px solid rgba(255, 255, 255, 0.1)"
          mb={{ base: '2rem', lg: 0 }}
        >
          <Box textAlign={{ base: 'center', md: 'left' }}>
            <Heading 
              as="h1" 
              mb="1em" 
              fontSize={{ base: '1.8rem', md: '2.2rem', lg: '2.5rem' }}
              fontWeight="700"
            >
              Daniel Alexssander
            </Heading>
            <Heading
              as="h2"
              pl={{ base: 0, md: '2em', lg: '3em' }}
              mb="1em"
              color="rgb(0, 59, 187)"
              transition="all 0.3s ease"
              fontSize={{ base: '1.2rem', md: '1.4rem', lg: '1.6rem' }}
              _hover={{ 
                pl: { base: 0, md: '2.5em', lg: '4em' },
                color: 'rgb(0, 107, 175)'
              }}
            >
              {t('frontendDeveloper')}
            </Heading>
          </Box>
          <Text 
            mb="3em" 
            fontSize={{ base: '0.95rem', md: '1rem' }}
            lineHeight="1.6"
            textAlign={{ base: 'center', md: 'left' }}
          >
            {t('headerDescription').replace('{greeting}', greeting).replace('{age}', age.toString())}
          </Text>
          <Flex 
            gap={{ base: '1rem', md: '2rem' }}
            justify={{ base: 'center', md: 'flex-start' }}
            direction={{ base: 'column', sm: 'row' }}
            align="center"
          >
            <Link
              href="#projects"
              textDecoration="none"
              fontWeight="bold"
              color="white"
              bg="rgb(0, 59, 187)"
              px={{ base: '2rem', md: '2.5rem' }}
              py={{ base: '0.8rem', md: '1rem' }}
              borderRadius="25px"
              transition="all 0.3s ease"
              _hover={{ 
                bg: 'rgb(0, 107, 175)', 
                textDecoration: 'none',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 59, 187, 0.3)'
              }}
            >
              {t('projects')}
            </Link>
            <Link
              href="#container-contacts"
              textDecoration="none"
              fontWeight="bold"
              color="rgb(0, 59, 187)"
              border="2px solid rgb(0, 59, 187)"
              px={{ base: '2rem', md: '2.5rem' }}
              py={{ base: '0.8rem', md: '1rem' }}
              borderRadius="25px"
              transition="all 0.3s ease"
              _hover={{ 
                bg: 'rgb(0, 59, 187)',
                color: 'white',
                textDecoration: 'none',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 59, 187, 0.3)'
              }}
            >
              {t('contacts')}
            </Link>
          </Flex>
        </Box>
        <Image
          src="./logo.png"
          alt="Daniel Alexssander"
          w={{ base: '250px', md: '300px', lg: '350px', xl: '400px' }}
          h={{ base: '250px', md: '300px', lg: '350px', xl: '400px' }}
          ml={{ base: 0, lg: '2em' }}
          borderRadius="50%"
          boxShadow="0 20px 60px rgba(10, 12, 16, 0.8)"
          display={{ base: 'block', lg: 'block' }}
          transition="all 0.3s ease"
          _hover={{
            transform: 'scale(1.05)',
            boxShadow: '0 25px 80px rgba(0, 59, 187, 0.3)'
          }}
        />
      </Flex>
    </Box>
  );
};

export default Header;