import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Text, Button, Image, Menu, MenuButton, MenuList, MenuItem, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaBars, FaChevronDown, FaArrowRight, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import BrazilIcon from './Icons/BrazilIcon';
import UsaIcon from './Icons/UsaIcon';
import SpainIcon from './Icons/SpainIcon';
import resumePdf from '../assets/Curriculo_Daniel.pdf';

const MotionBox = motion.create(Box as React.ComponentType<any>);
const MotionText = motion.create(Text as React.ComponentType<any>);
const MotionFlex = motion.create(Flex as React.ComponentType<any>);

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [age, setAge] = useState(0);
  const [greeting, setGreeting] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

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

  useEffect(() => {
    let expandTimeout: ReturnType<typeof setTimeout>;
    let collapseTimeout: ReturnType<typeof setTimeout>;
    let isCurrentlyScrolled = false;
    
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      
      if (shouldBeScrolled && !isCurrentlyScrolled) {
        isCurrentlyScrolled = true;
        setScrolled(true);
        clearTimeout(collapseTimeout);
        expandTimeout = setTimeout(() => setExpanded(true), 250);
      } else if (!shouldBeScrolled && isCurrentlyScrolled) {
        isCurrentlyScrolled = false;
        setExpanded(false);
        clearTimeout(expandTimeout);
        collapseTimeout = setTimeout(() => setScrolled(false), 250);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(expandTimeout);
      clearTimeout(collapseTimeout);
    };
  }, []);

  const navItems = [
    { label: t('home'), id: 'home' },
    { label: t('experience'), id: 'experience' },
    { label: t('projects'), id: 'projects' },
    { label: t('contacts'), id: 'container-contacts' },
    { label: t('resume'), href: resumePdf, external: true },
    { label: t('github'), href: 'https://github.com/DanielAlexssander', external: true, icon: FaGithub }
  ];

  return (
    <Box as="header" position="relative" minH="100vh" overflow="hidden">
      {/* Background com gradiente e padrão sutil */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)"
        _after={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.08) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }}
      />

      {/* Grid pattern overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        opacity={0.03}
        backgroundImage={`linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`}
        backgroundSize="60px 60px"
        pointerEvents="none"
      />

      {/* Navbar */}
      <Box
        position="fixed"
        top={scrolled ? '0' : '16px'}
        left="50%"
        transform="translateX(-50%)"
        w={expanded ? '100vw' : { base: '95%', md: '90%', lg: '85%' }}
        maxW={expanded ? '100vw' : '1400px'}
        zIndex={100}
        transition="top 0.25s ease, width 0.3s ease 0.1s, max-width 0.3s ease 0.1s"
      >
        <Flex
          bg={scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(30, 41, 59, 0.8)'}
          backdropFilter="blur(20px)"
          borderRadius={expanded ? '0' : '16px'}
          border={expanded ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'}
          px={{ base: 4, md: 6 }}
          py={3}
          justify="space-between"
          align="center"
          boxShadow={scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none'}
          transition="all 0.3s ease"
        >
          {/* Logo/Name */}
          <Text
            as="button"
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="700"
            fontSize={{ base: 'lg', md: 'xl' }}
            color="white"
            letterSpacing="-0.02em"
            cursor="pointer"
            bg="transparent"
            border="none"
            outline="none"
            _hover={{ opacity: 0.8 }}
            _focus={{ outline: 'none', boxShadow: 'none' }}
            _focusVisible={{ outline: 'none', boxShadow: 'none' }}
            transition="opacity 0.2s ease"
          >
            DR<Box as="span" color="#3B82F6">.</Box>
          </Text>

          {/* Desktop Nav */}
          <Flex
            as="nav"
            gap={{ md: 1, lg: 2 }}
            display={{ base: 'none', md: 'flex' }}
            align="center"
          >
            {navItems.map((item, index) => 
              item.external ? (
                <Box
                  key={index}
                  as="a"
                  href={item.href}
                  target="_blank"
                  px={3}
                  py={2}
                  color="#94A3B8"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  cursor="pointer"
                  outline="none"
                  _hover={{
                    color: 'white',
                    bg: 'rgba(59, 130, 246, 0.1)'
                  }}
                  _focus={{ outline: 'none', boxShadow: 'none' }}
                  _focusVisible={{ outline: 'none', boxShadow: 'none' }}
                >
                  {item.icon && <item.icon size={14} />}
                  {item.label}
                </Box>
              ) : (
                <Box
                  key={index}
                  as="button"
                  onClick={() => {
                    document.getElementById(item.id!)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  px={3}
                  py={2}
                  color="#94A3B8"
                  fontSize="sm"
                  fontWeight="500"
                  borderRadius="8px"
                  transition="all 0.2s ease"
                  display="flex"
                  alignItems="center"
                  gap={2}
                  bg="transparent"
                  border="none"
                  cursor="pointer"
                  outline="none"
                  _hover={{
                    color: 'white',
                    bg: 'rgba(59, 130, 246, 0.1)'
                  }}
                  _focus={{ outline: 'none', boxShadow: 'none' }}
                  _focusVisible={{ outline: 'none', boxShadow: 'none' }}
                >
                  {item.label}
                </Box>
              )
            )}
          </Flex>

          {/* Language + Mobile Menu */}
          <Flex align="center" gap={2}>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<FaChevronDown size={10} />}
                bg="transparent"
                border="1px solid rgba(255,255,255,0.15)"
                color="white"
                fontSize="13px"
                fontWeight="500"
                _hover={{ bg: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.25)' }}
                _active={{ bg: 'rgba(255,255,255,0.05)' }}
                size="sm"
                px={3}
                h="36px"
                borderRadius="8px"
              >
                <Flex align="center" gap={2}>
                  {language === 'pt' && <BrazilIcon width="16px" height="16px" />}
                  {language === 'en' && <UsaIcon width="16px" height="16px" />}
                  {language === 'es' && <SpainIcon width="16px" height="16px" />}
                  <Box display={{ base: 'none', sm: 'block' }}>
                    {language === 'pt' ? 'PT' : language === 'en' ? 'EN' : 'ES'}
                  </Box>
                </Flex>
              </MenuButton>
              <MenuList 
                bg="#1E293B" 
                border="1px solid rgba(255,255,255,0.1)"
                borderRadius="12px"
                py={1}
                px={1}
                minW="140px"
              >
                <MenuItem
                  onClick={() => setLanguage('pt')}
                  bg={language === 'pt' ? 'rgba(59, 130, 246, 0.2)' : 'transparent'}
                  color="white"
                  _hover={{ bg: 'rgba(59, 130, 246, 0.15)' }}
                  borderRadius="8px"
                  fontSize="sm"
                  mb="2px"
                >
                  <Flex align="center" gap={2}>
                    <BrazilIcon width="16px" height="16px" />
                    Português
                  </Flex>
                </MenuItem>
                <MenuItem
                  onClick={() => setLanguage('en')}
                  bg={language === 'en' ? 'rgba(59, 130, 246, 0.2)' : 'transparent'}
                  color="white"
                  _hover={{ bg: 'rgba(59, 130, 246, 0.15)' }}
                  borderRadius="8px"
                  fontSize="sm"
                  mb="2px"
                >
                  <Flex align="center" gap={2}>
                    <UsaIcon width="16px" height="16px" />
                    English
                  </Flex>
                </MenuItem>
                <MenuItem
                  onClick={() => setLanguage('es')}
                  bg={language === 'es' ? 'rgba(59, 130, 246, 0.2)' : 'transparent'}
                  color="white"
                  _hover={{ bg: 'rgba(59, 130, 246, 0.15)' }}
                  borderRadius="8px"
                  fontSize="sm"
                >
                  <Flex align="center" gap={2}>
                    <SpainIcon width="16px" height="16px" />
                    Español
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>

            <Button
              display={{ base: 'flex', md: 'none' }}
              onClick={onOpen}
              bg="transparent"
              border="1px solid rgba(255,255,255,0.15)"
              color="white"
              p={0}
              w="36px"
              h="36px"
              minW="36px"
              borderRadius="8px"
              _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
            >
              <FaBars size={16} />
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay bg="rgba(15, 23, 42, 0.8)" backdropFilter="blur(10px)" />
        <DrawerContent bg="#0F172A">
          <DrawerCloseButton color="white" size="lg" top={4} right={4} />
          <DrawerHeader 
            color="white" 
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="xl"
            fontWeight="700"
            pt={6}
          >
            Menu
          </DrawerHeader>
          <DrawerBody pt={8}>
            <Flex direction="column" gap={2}>
              {navItems.map((item, index) => 
                item.external ? (
                  <Box
                    key={index}
                    as="a"
                    href={item.href}
                    target="_blank"
                    onClick={onClose}
                    color="white"
                    textDecoration="none"
                    fontWeight="600"
                    fontSize="lg"
                    p={4}
                    borderRadius="12px"
                    bg="rgba(30, 41, 59, 0.5)"
                    border="1px solid rgba(255, 255, 255, 0.05)"
                    transition="all 0.2s ease"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    cursor="pointer"
                    _hover={{ 
                      bg: 'rgba(59, 130, 246, 0.15)',
                      borderColor: 'rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    <Flex align="center" gap={3}>
                      {item.icon && <item.icon size={18} />}
                      {item.label}
                    </Flex>
                    <FaArrowRight size={14} color="#94A3B8" />
                  </Box>
                ) : (
                  <Box
                    key={index}
                    as="button"
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        document.getElementById(item.id!)?.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }}
                    color="white"
                    textDecoration="none"
                    fontWeight="600"
                    fontSize="lg"
                    p={4}
                    borderRadius="12px"
                    bg="rgba(30, 41, 59, 0.5)"
                    border="1px solid rgba(255, 255, 255, 0.05)"
                    transition="all 0.2s ease"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    cursor="pointer"
                    textAlign="left"
                    w="100%"
                    _hover={{ 
                      bg: 'rgba(59, 130, 246, 0.15)',
                      borderColor: 'rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    <Flex align="center" gap={3}>
                      {item.icon && <item.icon size={18} />}
                      {item.label}
                    </Flex>
                    <FaArrowRight size={14} color="#94A3B8" />
                  </Box>
                )
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Hero Content */}
      <Flex
        position="relative"
        zIndex={1}
        minH="100vh"
        align="center"
        justify="center"
        px={{ base: 4, md: 8 }}
        pt={{ base: '100px', md: '80px' }}
        id="home"
      >
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="center"
          gap={{ base: 8, lg: 16 }}
          maxW="1200px"
          w="100%"
        >
          {/* Text Content */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            flex={1}
            maxW={{ base: '100%', lg: '600px' }}
          >
            {/* Greeting Badge */}
            <MotionFlex
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              align="center"
              gap={2}
              mb={4}
            >
              <Box
                w="40px"
                h="2px"
                bg="linear-gradient(90deg, #3B82F6, transparent)"
                flexShrink={0}
              />
              <Text
                color="#3B82F6"
                fontSize="sm"
                fontWeight="600"
                letterSpacing="0.5px"
              >
                {t('greetingBadge')}
              </Text>
            </MotionFlex>

            {/* Name */}
            <Heading
              as="h1"
              fontFamily="'Space Grotesk', sans-serif"
              fontSize={{ base: '2.5rem', md: '3.5rem', lg: '4rem' }}
              fontWeight="700"
              color="white"
              lineHeight="1.1"
              mb={4}
              letterSpacing="-0.02em"
            >
              Daniel{' '}
              <Box as="span" color="#3B82F6">
                Rossinatti
              </Box>
            </Heading>

            {/* Role */}
            <MotionText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              fontSize={{ base: 'lg', md: 'xl' }}
              color="#22C55E"
              fontWeight="600"
              mb={6}
              fontFamily="'Space Grotesk', sans-serif"
            >
              {t('softwareDeveloper')}
            </MotionText>

            {/* Description */}
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="#94A3B8"
              lineHeight="1.8"
              mb={8}
              maxW="540px"
            >
              {t('headerDescription').replace('{greeting}', greeting).replace('{age}', age.toString())}
            </Text>

            {/* CTA Buttons */}
            <Flex
              gap={4}
              direction={{ base: 'column', sm: 'row' }}
            >
              <Button
                as="a"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                bg="#3B82F6"
                color="white"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                borderRadius="12px"
                cursor="pointer"
                transition="all 0.25s ease"
                _hover={{
                  bg: '#2563EB',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 40px rgba(59, 130, 246, 0.4)'
                }}
                rightIcon={<FaArrowRight />}
              >
                {t('projects')}
              </Button>
              <Button
                as="a"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  document.getElementById('container-contacts')?.scrollIntoView({ behavior: 'smooth' });
                }}
                bg="transparent"
                color="white"
                px={8}
                py={6}
                fontSize="md"
                fontWeight="600"
                borderRadius="12px"
                border="2px solid rgba(255, 255, 255, 0.2)"
                cursor="pointer"
                transition="all 0.25s ease"
                _hover={{
                  borderColor: '#3B82F6',
                  bg: 'rgba(59, 130, 246, 0.1)'
                }}
              >
                {t('contacts')}
              </Button>
            </Flex>
          </MotionBox>

          {/* Profile Image */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            display={{ base: 'none', lg: 'block' }}
          >
            <Box
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                right: '20px',
                bottom: '20px',
                border: '2px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '24px',
                zIndex: 0
              }}
            >
              <Image
                src="./logo.png"
                alt="Daniel Rossinatti"
                w={{ lg: '320px', xl: '380px' }}
                h={{ lg: '320px', xl: '380px' }}
                borderRadius="24px"
                objectFit="cover"
                position="relative"
                zIndex={1}
                boxShadow="0 25px 80px rgba(0, 0, 0, 0.5)"
                transition="transform 0.4s ease"
                _hover={{
                  transform: 'scale(1.02)'
                }}
              />
              {/* Glow effect */}
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="100%"
                h="100%"
                bg="radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)"
                filter="blur(40px)"
                zIndex={0}
                pointerEvents="none"
              />
            </Box>
          </MotionBox>
        </Flex>

        {/* Scroll Indicator */}
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          position="absolute"
          bottom="40px"
          left="50%"
          transform="translateX(-50%)"
          display={{ base: 'none', md: 'flex' }}
          flexDirection="column"
          alignItems="center"
          gap={2}
        >
          <Text fontSize="xs" color="#64748B" fontWeight="500" letterSpacing="1px">
            SCROLL
          </Text>
          <MotionBox
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Box
              w="24px"
              h="40px"
              border="2px solid rgba(255, 255, 255, 0.2)"
              borderRadius="12px"
              position="relative"
              _before={{
                content: '""',
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                w: '4px',
                h: '8px',
                bg: '#3B82F6',
                borderRadius: '2px'
              }}
            />
          </MotionBox>
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default Header;
