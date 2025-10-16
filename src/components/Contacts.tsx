
import { useState } from 'react';
import { Box, Heading, Image, Button, Link, Flex } from '@chakra-ui/react';
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

  return (
    <Box
      as="section"
      id="container-contacts"
      bgImage="linear-gradient(180deg, #011229 50%, #000715)"
      bgAttachment="fixed"
      color="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      w="100%"
      h="100vh"
      fontSize="16px"
      m={0}
      p={0}
    >
      <Flex w="100%" direction="column" align="center">
        <Image
          src="/logo.png"
          alt=""
          w="10%"
          minW="150px"
          borderRadius="50%"
          transition="0.5s"
          bg="linear-gradient(90deg, rgba(0, 45, 84, 1) 0%, rgba(0, 107, 175, 1) 35%, rgba(0, 212, 255, 1) 100%)"
          _hover={{ w: '11%' }}
        />
        
        <Heading as="h1" mb="0.5em">
          {t('contactsTitle')}
        </Heading>
        
        
        
        <Flex
          w={{ base: "90%", md: '500px' }}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mx={{ base: '10px', lg: 0 }}
        >
            <Flex w="100%" direction="row" align="center" justify="center" position="relative">
              <Link  w="100%" href="mailto:danielrossinatti15@gmail.com" _hover={{ textDecoration: 'none' }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  h="50px"
                  mb="0.5em"
                  border="solid rgba(0, 91, 209, 0.726) 1px"
                  borderRadius="5px"
                  bg="transparent"
                  transition="0.5s"
                  _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <Box as="i" color="rgba(0, 91, 209, 0.726)" className="fa-regular fa-envelope" mr={2} /> Gmail
                </Box>
              </Link>
              <Button
                onClick={handleCopy}
                border="solid rgba(0, 91, 209, 0.726) 1px"
                bg="none"
                color="rgba(0, 91, 209, 0.726)"
                p="1em"
                cursor="pointer"
                position="absolute"
                right={-0}
                mr={-20}
                borderRadius="5px"
                fontSize="16px"
                transition="0.3s"
                display={{ base: 'none', lg: 'flex' }}
                _hover={{
                  color: 'white',
                  bg: 'rgba(0, 91, 209, 0.726)'
                }}
                _active={{
                  bg: 'rgba(255, 255, 255, 0.1)'
                }}
                _after={copied ? {
                  content: `"${t('copied')}"`,
                  display: 'block',
                  color: 'white',
                  position: 'absolute',
                  top: '-60px',
                  right: '-14px',
                  bg: 'rgba(0, 91, 209)',
                  p: '9px 10px',
                  borderRadius: '20px'
                } : {}}
                _before={copied ? {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: '-30px',
                  right: '22px',
                  w: '10px',
                  h: '10px',
                  bg: 'rgba(0, 91, 209)',
                  transform: 'rotate(45deg)'
                } : {}}
              >
                <FaCopy />
              </Button>
            </Flex>

            <Link w="100%" href="https://www.linkedin.com/in/daniel-alexssander-667933148" target="_blank" _hover={{ textDecoration: 'none' }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="50px"
                mb="0.5em"
                border="solid rgba(0, 91, 209, 0.726) 1px"
                borderRadius="5px"
                bg="transparent"
                transition="0.5s"
                _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
              >
                <Box as="i" color="rgba(0, 91, 209, 0.726)" className="fa-brands fa-linkedin" mr={2} /> Linkedin
              </Box>
            </Link>

            <Link w="100%" href="https://profile.indeed.com/?hl=pt_BR&co=BR&from=gnav-homepage&_ga=2.232801303.840665186.1682014064-110041772.1682014064" target="_blank" _hover={{ textDecoration: 'none' }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="50px"
                mb="0.5em"
                border="solid rgba(0, 91, 209, 0.726) 1px"
                borderRadius="5px"
                bg="transparent"
                transition="0.5s"
                _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
              >
                <Box as="i" color="rgba(0, 91, 209, 0.726)" className="fa-solid fa-info" mr={2} /> Indeed
              </Box>
            </Link>
            
            <Link w="100%" href="https://wa.me/5521968603176" target="_blank" _hover={{ textDecoration: 'none' }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="50px"
                mb="0.5em"
                border="solid rgba(0, 91, 209, 0.726) 1px"
                borderRadius="5px"
                bg="transparent"
                transition="0.5s"
                _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
              >
                <Box as="i" color="rgba(0, 91, 209, 0.726)" className="fa-brands fa-whatsapp" mr={2} /> WhatsApp
              </Box>
            </Link>
            
            <Link w="100%" href="https://discord.gg/apUjj8JRVC" target="_blank" _hover={{ textDecoration: 'none' }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="50px"
                mb="0.5em"
                border="solid rgba(0, 91, 209, 0.726) 1px"
                borderRadius="5px"
                bg="transparent"
                transition="0.5s"
                _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
              >
                <Box as="i" color="rgba(0, 91, 209, 0.726)" className="fa-brands fa-discord" mr={2} /> Discord
              </Box>
            </Link>
            
            <Link w="100%" href="https://github.com/DanielAlexssander" target="_blank" _hover={{ textDecoration: 'none' }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="50px"
                mb="0.5em"
                border="solid rgba(0, 91, 209, 0.726) 1px"
                borderRadius="5px"
                bg="transparent"
                transition="0.5s"
                _hover={{ bg: 'rgba(255, 255, 255, 0.05)' }}
              >
                <Box as="i" color="rgba(0, 91, 209, 0.726)" className="fa-brands fa-github" mr={2} /> GitHub
              </Box>
            </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Contacts;