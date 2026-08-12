import { useState } from 'react';
import { Box, Heading, Text, Flex, Image, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const MotionBox = motion.create(Box as React.ComponentType<any>);

interface ExperienceItem {
  company: string;
  logo?: string;
  role: string;
  period: string;
  description: string;
  technologies?: string[];
  startYear: number;
}

const Experience = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 2;

  const experiences: ExperienceItem[] = [
    {
      company: 'ONS - Operador Nacional do Sistema Elétrico',
      logo: 'https://www.ons.org.br/Style%20Library/custom/img/compartilhar.jpg',
      role: t('onsRole'),
      period: t('onsPeriod'),
      description: t('onsDescription'),
      technologies: ['React', 'Angular', 'Node.js', 'FastAPI', '.NET', 'GraphQL', 'Azure', 'AWS', 'PostgreSQL', 'MongoDB', 'IA', 'Power BI', 'Tableau', 'DevOps'],
      startYear: 2024
    },
    {
      company: 'Workana',
      logo: 'https://media.licdn.com/dms/image/v2/C560BAQGoqkevfsjWqw/company-logo_200_200/company-logo_200_200/0/1644840712528/workana_logo?e=2147483647&v=beta&t=7dPHuiUOEdm7-MecGT3CQXEkVONCerHx5-AfUx_iL10',
      role: t('workanaRole'),
      period: t('workanaPeriod'),
      description: t('workanaDescription'),
      technologies: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Firebase', 'MongoDB'],
      startYear: 2023
    }
  ].sort((a, b) => b.startYear - a.startYear);

  const totalPages = Math.ceil(experiences.length / ITEMS_PER_PAGE);
  const paginatedExperiences = experiences.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <Box
      as="section"
      id="experience"
      bg="#0F172A"
      position="relative"
      py={{ base: '80px', md: '120px' }}
      px={{ base: 4, md: 8 }}
      overflow="hidden"
    >
      {/* Background decoration */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity={0.5}
        bgGradient="linear(to-b, transparent, rgba(30, 41, 59, 0.3), transparent)"
        pointerEvents="none"
      />

      <Box maxW="1000px" mx="auto" position="relative" zIndex={1}>
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          mb={{ base: 10, md: 16 }}
          textAlign="center"
        >
          <Flex align="center" justify="center" gap={3} mb={4}>
            <Box w="60px" h="1px" bg="linear-gradient(90deg, transparent, #3B82F6)" />
            <Box
              p={3}
              bg="rgba(59, 130, 246, 0.1)"
              borderRadius="12px"
              border="1px solid rgba(59, 130, 246, 0.2)"
            >
              <FaBriefcase color="#3B82F6" size={20} />
            </Box>
            <Box w="60px" h="1px" bg="linear-gradient(90deg, #3B82F6, transparent)" />
          </Flex>
          <Heading
            as="h2"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize={{ base: '2rem', md: '2.5rem', lg: '3rem' }}
            fontWeight="700"
            color="white"
            letterSpacing="-0.02em"
          >
            {t('experienceTitle').replace(':', '')}
          </Heading>
        </MotionBox>

        {/* Experience Cards */}
        <Flex direction="column" gap={6}>
          {paginatedExperiences.map((exp, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box
                bg="rgba(30, 41, 59, 0.5)"
                backdropFilter="blur(10px)"
                borderRadius="20px"
                border="1px solid rgba(255, 255, 255, 0.05)"
                p={{ base: 6, md: 8 }}
                position="relative"
                overflow="hidden"
                transition="all 0.3s ease"
                cursor="default"
                _hover={{
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  h: '3px',
                  bgGradient: 'linear(to-r, #3B82F6, #22C55E)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                sx={{
                  '&:hover::before': {
                    opacity: 1
                  }
                }}
              >
                {/* Header */}
                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  align={{ base: 'flex-start', md: 'center' }}
                  justify="space-between"
                  gap={4}
                  mb={6}
                >
                  <Flex align="center" gap={4}>
                    {exp.logo && (
                      <Box
                        w="60px"
                        h="60px"
                        borderRadius="16px"
                        overflow="hidden"
                        bg="white"
                        p={1}
                        flexShrink={0}
                      >
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          w="100%"
                          h="100%"
                          objectFit="contain"
                          borderRadius="12px"
                        />
                      </Box>
                    )}
                    <Box>
                      <Heading
                        as="h3"
                        fontFamily="'Space Grotesk', sans-serif"
                        fontSize={{ base: 'lg', md: 'xl' }}
                        fontWeight="700"
                        color="white"
                        mb={1}
                      >
                        {exp.company}
                      </Heading>
                      <Text
                        fontSize={{ base: 'md', md: 'lg' }}
                        fontWeight="600"
                        color="#3B82F6"
                      >
                        {exp.role}
                      </Text>
                    </Box>
                  </Flex>

                  <Flex
                    align="center"
                    gap={2}
                    bg="rgba(59, 130, 246, 0.1)"
                    px={4}
                    py={2}
                    borderRadius="full"
                    flexShrink={0}
                  >
                    <FaCalendarAlt color="#3B82F6" size={14} />
                    <Text
                      fontSize="sm"
                      color="#94A3B8"
                      fontWeight="600"
                    >
                      {exp.period}
                    </Text>
                  </Flex>
                </Flex>

                {/* Description */}
                <Text
                  fontSize={{ base: 'sm', md: 'md' }}
                  lineHeight="1.8"
                  color="#94A3B8"
                  mb={6}
                >
                  {exp.description}
                </Text>

                {/* Technologies */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <Flex gap={2} flexWrap="wrap">
                    {exp.technologies.map((tech, techIndex) => (
                      <Box
                        key={techIndex}
                        bg="rgba(59, 130, 246, 0.1)"
                        color="#94A3B8"
                        px={3}
                        py={1.5}
                        borderRadius="8px"
                        fontSize="xs"
                        fontWeight="600"
                        border="1px solid rgba(59, 130, 246, 0.15)"
                        transition="all 0.2s ease"
                        _hover={{
                          bg: 'rgba(59, 130, 246, 0.2)',
                          color: 'white',
                          borderColor: 'rgba(59, 130, 246, 0.3)'
                        }}
                      >
                        {tech}
                      </Box>
                    ))}
                  </Flex>
                )}
              </Box>
            </MotionBox>
          ))}
        </Flex>

        {/* Pagination */}
        {totalPages > 1 && (
          <Flex
            mt={10}
            gap={3}
            align="center"
            justify="center"
          >
            <Button
              onClick={() => changePage(currentPage - 1)}
              isDisabled={currentPage === 1}
              bg="rgba(30, 41, 59, 0.8)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              color="white"
              w="44px"
              h="44px"
              p={0}
              borderRadius="12px"
              _hover={{ bg: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.3)' }}
              _disabled={{ opacity: 0.3, cursor: 'not-allowed', _hover: { bg: 'rgba(30, 41, 59, 0.8)' } }}
            >
              <FaChevronLeft size={14} />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                onClick={() => changePage(page)}
                bg={currentPage === page ? '#3B82F6' : 'rgba(30, 41, 59, 0.8)'}
                border="1px solid"
                borderColor={currentPage === page ? '#3B82F6' : 'rgba(255, 255, 255, 0.1)'}
                color="white"
                w="44px"
                h="44px"
                p={0}
                borderRadius="12px"
                fontWeight="600"
                fontSize="sm"
                _hover={{ 
                  bg: currentPage === page ? '#2563EB' : 'rgba(59, 130, 246, 0.2)',
                  borderColor: currentPage === page ? '#2563EB' : 'rgba(59, 130, 246, 0.3)'
                }}
              >
                {page}
              </Button>
            ))}

            <Button
              onClick={() => changePage(currentPage + 1)}
              isDisabled={currentPage === totalPages}
              bg="rgba(30, 41, 59, 0.8)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              color="white"
              w="44px"
              h="44px"
              p={0}
              borderRadius="12px"
              _hover={{ bg: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.3)' }}
              _disabled={{ opacity: 0.3, cursor: 'not-allowed', _hover: { bg: 'rgba(30, 41, 59, 0.8)' } }}
            >
              <FaChevronRight size={14} />
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Experience;
