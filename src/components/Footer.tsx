import { Box, Flex, Text, Link, Button } from '@chakra-ui/react';
import { FaReact, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      as="footer" 
      bg="#0A0F1A"
      borderTop="1px solid rgba(255, 255, 255, 0.05)"
      py={{ base: 8, md: 10 }}
      px={{ base: 4, md: 8 }}
    >
      <Box maxW="1200px" mx="auto">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={6}
        >
          {/* Left - Brand */}
          <Flex direction="column" align={{ base: 'center', md: 'flex-start' }} gap={2}>
            <Text
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="700"
              fontSize="xl"
              color="white"
              letterSpacing="-0.02em"
            >
              DR<Box as="span" color="#3B82F6">.</Box>
            </Text>
            <Text fontSize="sm" color="#64748B">
              © {currentYear} Daniel Rossinatti
            </Text>
          </Flex>

          {/* Center - Built with */}
          <Flex align="center" gap={2} color="#64748B" fontSize="sm">
            <Text>{t('builtWith')}</Text>
            <Flex align="center" gap={1} color="#61DAFB">
              <FaReact size={16} />
              <Text fontWeight="500">React</Text>
            </Flex>
          </Flex>

          {/* Right - Source code */}
          <Link
            href="https://github.com/DanielAlexssander/Projetos"
            target="_blank"
            _hover={{ textDecoration: 'none' }}
          >
            <Button
              size="sm"
              bg="transparent"
              color="#94A3B8"
              border="1px solid rgba(255, 255, 255, 0.1)"
              borderRadius="10px"
              fontWeight="500"
              fontSize="sm"
              leftIcon={<FaGithub size={14} />}
              _hover={{
                bg: 'rgba(59, 130, 246, 0.1)',
                borderColor: 'rgba(59, 130, 246, 0.3)',
                color: 'white'
              }}
              transition="all 0.2s ease"
            >
              {t('pageCode')}
            </Button>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
