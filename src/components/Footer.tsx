import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { FaReact } from "react-icons/fa6";
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <Box as="footer" bg="#0a0c10" py={{ base: '2rem', md: '1.5rem' }}>
      <Flex
        justifyContent="center"
        alignItems="center"
        color="white"
        textAlign="center"
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: '1rem', md: '2rem' }}
        px={{ base: '1rem', md: '2rem' }}
        maxW="1200px"
        mx="auto"
      >
        <Flex align="center" gap="0.5rem">
          <Text fontSize={{ base: '0.9rem', md: '1rem' }} fontWeight="600">
            {t('technologiesUsedFooter')}
          </Text>
          <Box color="#61DAFB" fontSize="1.5rem">
            <FaReact />
          </Box>
        </Flex>
        
        <Link
          href="https://github.com/DanielAlexssander/Projetos"
          target="_blank"
          textDecoration="none"
          color="white"
          border="2px solid rgb(0, 59, 187)"
          px={{ base: '1.5rem', md: '2rem' }}
          py={{ base: '0.7rem', md: '0.8rem' }}
          borderRadius="25px"
          fontSize={{ base: '0.9rem', md: '1rem' }}
          fontWeight="600"
          transition="all 0.3s ease"
          _hover={{
            bg: 'rgb(0, 59, 187)',
            textDecoration: 'none',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 59, 187, 0.3)'
          }}
        >
          {t('pageCode')}
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;