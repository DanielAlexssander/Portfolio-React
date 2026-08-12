import { useState } from 'react';
import { Box, Heading, Image, Button, Link, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCopy, FaCheck, FaLinkedinIn, FaWhatsapp, FaDiscord, FaGithub, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const MotionBox = motion.create(Box as React.ComponentType<any>);

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
    { 
      href: 'mailto:danielrossinatti15@gmail.com', 
      icon: FaEnvelope, 
      label: 'Email',
      color: '#EA4335',
      description: email
    },
    { 
      href: 'https://www.linkedin.com/in/daniel-alexssander-667933148', 
      icon: FaLinkedinIn, 
      label: 'LinkedIn',
      color: '#0A66C2',
      description: 'daniel-alexssander'
    },
    { 
      href: 'https://wa.me/5521968603176', 
      icon: FaWhatsapp, 
      label: 'WhatsApp',
      color: '#25D366',
      description: '+55 21 96860-3176'
    },
    { 
      href: 'https://discord.gg/apUjj8JRVC', 
      icon: FaDiscord, 
      label: 'Discord',
      color: '#5865F2',
      description: 'Join server'
    },
    { 
      href: 'https://github.com/DanielAlexssander', 
      icon: FaGithub, 
      label: 'GitHub',
      color: '#fff',
      description: 'DanielAlexssander'
    }
  ];

  return (
    <Box
      as="section"
      id="container-contacts"
      bg="#0F172A"
      position="relative"
      py={{ base: '80px', md: '120px' }}
      px={{ base: 4, md: 8 }}
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="600px"
        h="600px"
        bg="radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Box maxW="700px" mx="auto" position="relative" zIndex={1}>
        {/* Profile Image */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          mb={8}
        >
          <Box
            position="relative"
            display="inline-block"
          >
            <Image
              src="./logo.png"
              alt="Daniel Rossinatti"
              w={{ base: '120px', md: '150px' }}
              h={{ base: '120px', md: '150px' }}
              borderRadius="full"
              border="3px solid rgba(59, 130, 246, 0.3)"
              transition="all 0.3s ease"
              _hover={{ 
                borderColor: '#3B82F6',
                transform: 'scale(1.05)'
              }}
            />
            <Box
              position="absolute"
              inset={-2}
              borderRadius="full"
              bg="radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)"
              filter="blur(15px)"
              zIndex={-1}
            />
          </Box>
        </MotionBox>

        {/* Title */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          textAlign="center"
          mb={10}
        >
          <Heading
            as="h2"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize={{ base: '2rem', md: '2.5rem' }}
            fontWeight="700"
            color="white"
            letterSpacing="-0.02em"
            mb={3}
          >
            {t('contactsTitle').replace(':', '')}
          </Heading>
          <Text color="#64748B" fontSize="md">
            {t('contactSubtitle')}
          </Text>
        </MotionBox>

        {/* Contact Cards */}
        <Flex direction="column" gap={3}>
          {contacts.map((contact, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
            >
              <Link
                href={contact.href}
                target={contact.label !== 'Email' ? '_blank' : undefined}
                _hover={{ textDecoration: 'none' }}
              >
                <Flex
                  align="center"
                  gap={4}
                  bg="rgba(30, 41, 59, 0.5)"
                  p={4}
                  borderRadius="16px"
                  border="1px solid rgba(255, 255, 255, 0.05)"
                  transition="all 0.3s ease"
                  cursor="pointer"
                  _hover={{
                    bg: 'rgba(30, 41, 59, 0.8)',
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    transform: 'translateX(8px)'
                  }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    w="48px"
                    h="48px"
                    borderRadius="12px"
                    bg={`${contact.color}15`}
                    color={contact.color}
                    flexShrink={0}
                  >
                    <contact.icon size={22} />
                  </Flex>
                  
                  <Box flex={1}>
                    <Text fontWeight="600" color="white" fontSize="md">
                      {contact.label}
                    </Text>
                    <Text fontSize="sm" color="#64748B">
                      {contact.description}
                    </Text>
                  </Box>

                  {contact.label === 'Email' && (
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCopy();
                      }}
                      bg="rgba(59, 130, 246, 0.1)"
                      color={copied ? '#22C55E' : '#3B82F6'}
                      size="sm"
                      px={4}
                      borderRadius="8px"
                      fontWeight="500"
                      fontSize="xs"
                      leftIcon={copied ? <FaCheck size={12} /> : <FaCopy size={12} />}
                      _hover={{ bg: 'rgba(59, 130, 246, 0.2)' }}
                      transition="all 0.2s ease"
                    >
                      {copied ? t('copied') : 'Copy'}
                    </Button>
                  )}
                </Flex>
              </Link>
            </MotionBox>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Contacts;
