import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Button, Image, Menu, MenuButton, MenuList, MenuItem, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaBars, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import BrazilIcon from './Icons/BrazilIcon';
import UsaIcon from './Icons/UsaIcon';
import resumePdf from '../assets/Curriculo_Daniel.pdf';

const MotionBox = motion.create(Box as React.ComponentType<any>);
const MotionImage = motion.create(Image as React.ComponentType<any>);

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        alignItems="center"
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
          onClick={onOpen}
          position="absolute"
          right={3}
          bg="transparent"
          border="none"
          color="white"
          fontSize="1.4em"
          p={2}
          _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
          borderRadius="md"
        >
          <FaBars />
        </Button>
        
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
          <DrawerOverlay />
          <DrawerContent bg="linear-gradient(180deg, #002d54 0%, #022f5c 37.22%, #000613 100%)">
            <DrawerCloseButton color="white" />
            <DrawerHeader color="white" textTransform="uppercase" letterSpacing="1px">
              Menu
            </DrawerHeader>
            <DrawerBody>
              <Flex direction="column" gap={4}>
                {[t('home'), t('experience'), t('projects'), t('contacts'), t('resume'), t('github')].map((item, index) => {
                  const ids = ['home', 'experience', 'projects', 'container-contacts', '', ''];
                  const isExternal = index === 4 || index === 5;
                  const isResume = index === 4;
                  return (
                    <Box
                      key={item}
                      as="a"
                      href={isResume ? resumePdf : (index === 5 ? 'https://github.com/DanielAlexssander' : undefined)}
                      target={isExternal ? '_blank' : undefined}
                      color="white"
                      textDecoration="none"
                      fontWeight="bold"
                      fontSize="1.2em"
                      p={3}
                      borderRadius="md"
                      transition="all 0.3s ease"
                      cursor="pointer"
                      _hover={{ 
                        bg: 'rgba(255, 255, 255, 0.1)',
                        transform: 'scale(1.05)'
                      }}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        if (!isExternal) {
                          e.preventDefault();
                          onClose();
                          setTimeout(() => {
                            document.getElementById(ids[index])?.scrollIntoView({ behavior: 'smooth' });
                          }, 300);
                        } else {
                          onClose();
                        }
                      }}
                    >
                      {item}
                    </Box>
                  );
                })}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Box
          as="ul"
          pl={0}
          display={{ base: 'none', md: 'flex' }}
        >
          {[t('home'), t('experience'), t('projects'), t('contacts'), t('resume'), t('github')].map((item, index) => {
            const ids = ['home', 'experience', 'projects', 'container-contacts', '', ''];
            const isExternal = index === 4 || index === 5;
            const isResume = index === 4;
            return (
              <Box
                key={item}
                as="li"
                display="inline-block"
                listStyleType="none"
                ml={index === 0 ? 0 : '2em'}
                transition="transform 0.3s ease"
                _hover={{ transform: 'scale(1.05)' }}
              >
                <Box
                  as="a"
                  href={isResume ? resumePdf : (index === 5 ? 'https://github.com/DanielAlexssander' : undefined)}
                  target={isExternal ? '_blank' : undefined}
                  position="relative"
                  color="white"
                  textDecoration="none"
                  fontWeight="bold"
                  cursor="pointer"
                  transition="color 0.3s ease"
                  _hover={{ color: 'rgba(255, 255, 255, 1)' }}
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
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    if (!isExternal) {
                      e.preventDefault();
                      document.getElementById(ids[index])?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {item}
                </Box>
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
        <MotionBox
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
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
              Daniel Rossinatti
            </Heading>
            <Heading
              cursor="default"
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
              {t('softwareDeveloper')}
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
            direction={{ base: 'row', sm: 'row' }}
            align="center"
          >
            <Box
              as="a"
              textDecoration="none"
              fontWeight="bold"
              color="white"
              bg="rgb(0, 59, 187)"
              px={{ base: '2rem', md: '2.5rem' }}
              py={{ base: '0.8rem', md: '1rem' }}
              borderRadius="25px"
              cursor="pointer"
              transition="all 0.3s ease"
              _hover={{ 
                bg: 'rgb(0, 107, 175)', 
                textDecoration: 'none',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 59, 187, 0.3)'
              }}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('projects')}
            </Box>
            <Box
              as="a"
              textDecoration="none"
              fontWeight="bold"
              color="rgb(0, 59, 187)"
              border="2px solid rgb(0, 59, 187)"
              px={{ base: '2rem', md: '2.5rem' }}
              py={{ base: '0.8rem', md: '1rem' }}
              borderRadius="25px"
              cursor="pointer"
              transition="all 0.3s ease"
              _hover={{ 
                bg: 'rgb(0, 59, 187)',
                color: 'white',
                textDecoration: 'none',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 59, 187, 0.3)'
              }}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                document.getElementById('container-contacts')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('contacts')}
            </Box>
          </Flex>
        </MotionBox>
        <MotionImage
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          src="./logo.png"
          alt="Daniel Rossinatti"
          w={{ base: '0', md: '0', lg: '0', xl: '400px' }}
          h={{ base: '0', md: '0', lg: '0', xl: '400px' }}
          ml={{ base: 0, lg: '2em' }}
          borderRadius="50%"
          boxShadow="0 20px 60px rgba(10, 12, 16, 0.8)"
          display={{ base: 'block', lg: 'block' }}
          sx={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
          _hover={{
            transform: 'scale(1.05)',
            boxShadow: '0 25px 80px rgba(0, 59, 187, 0.3)',
          }}
        />
      </Flex>
    </Box>
  );
};

export default Header;