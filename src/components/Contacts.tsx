import { useState } from 'react';
import { Box, Heading, Image, Button, Link, Flex, Text } from '@chakra-ui/react';
import { FaCopy } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Contacts = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const email = "danielrossinatti15@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const contacts = [
    { href: 'https://www.linkedin.com/in/daniel-alexssander-667933148', icon: 'fa-brands fa-linkedin', label: 'LinkedIn' },
    { href: 'https://profile.indeed.com/?hl=pt_BR&co=BR&from=gnav-homepage&_ga=2.232801303.840665186.1682014064-110041772.1682014064', icon: 'fa-solid fa-info', label: 'Indeed' },
    { href: 'https://wa.me/5521968603176', icon: 'fa-brands fa-whatsapp', label: 'WhatsApp' },
    { href: 'https://discord.gg/apUjj8JRVC', icon: 'fa-brands fa-discord', label: 'Discord' },
    { href: 'https://github.com/DanielAlexssander', icon: 'fa-brands fa-github', label: 'GitHub' }
  ];

  return (
    <Box
      as="section"
      id="container-contacts"
      bgImage="linear-gradient(180deg, #011229 50%, #000715)"
      bgAttachment={{ base: 'scroll', md: 'fixed' }}
      color="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      w="100%"
      minH="100vh"
      py={{ base: '4rem', md: '2rem' }}
      px={{ base: '1rem', md: '2rem' }}
    >
      <Flex w="100%" maxW="600px" direction="column" align="center">
        <Image
          src="./logo.png"
          alt="Daniel Alexssander"
          w={{ base: '120px', sm: '150px', md: '180px', lg: '200px' }}
          h={{ base: '120px', sm: '150px', md: '180px', lg: '200px' }}
          borderRadius="50%"
          transition="all 0.3s ease"
          bg="linear-gradient(90deg, rgba(0, 45, 84, 1) 0%, rgba(0, 107, 175, 1) 35%, rgba(0, 212, 255, 1) 100%)"
          mb="2rem"
          _hover={{ 
            transform: 'scale(1.1)',
            boxShadow: '0 15px 40px rgba(0, 59, 187, 0.4)'
          }}
        />
        
        <Heading 
          as="h1" 
          mb="2rem"
          fontSize={{ base: '1.8rem', md: '2.2rem', lg: '2.5rem' }}
          fontWeight="700"
        >
          {t('contactsTitle')}
        </Heading>
        
        <Flex
          w="100%"
          maxW="500px"
          direction="column"
          gap="0.8rem"
        >
          <Flex w="100%" direction="row" align="center" position="relative">
            <Link w="100%" href="mailto:danielrossinatti15@gmail.com" _hover={{ textDecoration: 'none' }}>
              <Flex
                align="center"
                justify="center"
                h="55px"
                border="2px solid rgba(0, 91, 209, 0.8)"
                borderRadius="12px"
                bg="rgba(0, 0, 0, 0.3)"
                transition="all 0.3s ease"
                backdropFilter="blur(10px)"
                _hover={{ 
                  bg: 'rgba(0, 91, 209, 0.1)',
                  borderColor: 'rgba(0, 91, 209, 1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 91, 209, 0.3)'
                }}
              >
                <Box as="i" color="rgba(0, 91, 209, 0.9)" className="fa-regular fa-envelope" mr={3} fontSize="1.2rem" />
                <Text fontWeight="600">Gmail</Text>
              </Flex>
            </Link>
            <Button
              onClick={handleCopy}
              border="2px solid rgba(0, 91, 209, 0.8)"
              bg="rgba(0, 0, 0, 0.3)"
              color="rgba(0, 91, 209, 0.9)"
              p="1rem"
              position="absolute"
              right="-60px"
              borderRadius="12px"
              fontSize="1.1rem"
              transition="all 0.3s ease"
              display={{ base: 'none', lg: 'flex' }}
              backdropFilter="blur(10px)"
              _hover={{
                color: 'white',
                bg: 'rgba(0, 91, 209, 0.8)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 91, 209, 0.3)'
              }}
              _after={copied ? {
                content: `"${t('copied')}"`,
                display: 'block',
                color: 'white',
                position: 'absolute',
                top: '-50px',
                right: '-10px',
                bg: 'rgba(0, 91, 209, 0.9)',
                p: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                whiteSpace: 'nowrap'
              } : {}}
            >
              <FaCopy />
            </Button>
          </Flex>

          {contacts.map((contact, index) => (
            <Link key={index} w="100%" href={contact.href} target="_blank" _hover={{ textDecoration: 'none' }}>
              <Flex
                align="center"
                justify="center"
                h="55px"
                border="2px solid rgba(0, 91, 209, 0.8)"
                borderRadius="12px"
                bg="rgba(0, 0, 0, 0.3)"
                transition="all 0.3s ease"
                backdropFilter="blur(10px)"
                _hover={{ 
                  bg: 'rgba(0, 91, 209, 0.1)',
                  borderColor: 'rgba(0, 91, 209, 1)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(0, 91, 209, 0.3)'
                }}
              >
                <Box as="i" color="rgba(0, 91, 209, 0.9)" className={contact.icon} mr={3} fontSize="1.2rem" />
                <Text fontWeight="600">{contact.label}</Text>
              </Flex>
            </Link>
          ))}
        </Flex>
        
        {copied && (
          <Box
            position="fixed"
            bottom="2rem"
            right="2rem"
            bg="rgba(0, 91, 209, 0.9)"
            color="white"
            px="1rem"
            py="0.5rem"
            borderRadius="8px"
            fontSize="0.9rem"
            fontWeight="600"
            display={{ base: 'block', lg: 'none' }}
            zIndex={1000}
          >
            {t('copied')}
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Contacts;