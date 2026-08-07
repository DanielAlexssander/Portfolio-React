import { useState } from 'react';
import { Box, Heading, Text, Flex, Image, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const MotionBox = motion.create(Box as React.ComponentType<any>);
const MotionHeading = motion.create(Heading as React.ComponentType<any>);

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
      bg="linear-gradient(180deg, #000613 0%, #011229 50%, #000715 100%)"
      color="white"
      py={{ base: '4rem', md: '6rem' }}
      px={{ base: '1rem', md: '2rem' }}
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <MotionHeading
        as="h2"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        mb={{ base: '2rem', md: '3rem' }}
        fontSize={{ base: '1.8rem', md: '2.2rem', lg: '2.5rem' }}
        fontWeight="700"
        textAlign="center"
      >
        {t('experienceTitle')}
      </MotionHeading>

      <Flex
        direction="column"
        gap="2rem"
        w="100%"
        maxW="900px"
      >
        {paginatedExperiences.map((exp, index) => (
          <MotionBox
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            bg="rgba(0, 0, 0, 0.4)"
            p={{ base: '1.5rem', md: '2rem' }}
            borderRadius="15px"
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.1)"
            _hover={{
              border: '1px solid rgba(0, 91, 209, 0.5)',
              boxShadow: '0 8px 30px rgba(0, 91, 209, 0.15)',
              transform: 'translateY(-2px)'
            }}
            sx={{ transition: 'all 0.3s ease' }}
            cursor="default"
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'flex-start', md: 'center' }}
              justify="space-between"
              mb="1rem"
              gap={{ base: '0.5rem', md: '1rem' }}
            >
              <Flex align="center" gap="1rem">
                {exp.logo && (
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    w="50px"
                    h="50px"
                    borderRadius="8px"
                    objectFit="contain"
                  />
                )}
                <Box>
                  <Heading
                    as="h3"
                    fontSize={{ base: '1.2rem', md: '1.4rem' }}
                    fontWeight="700"
                    color="rgb(0, 91, 209)"
                  >
                    {exp.company}
                  </Heading>
                  <Text
                    fontSize={{ base: '1rem', md: '1.1rem' }}
                    fontWeight="600"
                    color="white"
                  >
                    {exp.role}
                  </Text>
                </Box>
              </Flex>
              <Text
                fontSize={{ base: '0.9rem', md: '1rem' }}
                color="rgba(255, 255, 255, 0.7)"
                fontWeight="500"
                whiteSpace="nowrap"
              >
                {exp.period}
              </Text>
            </Flex>

            <Text
              fontSize={{ base: '0.95rem', md: '1rem' }}
              lineHeight="1.7"
              color="rgba(255, 255, 255, 0.9)"
              mb="1rem"
            >
              {exp.description}
            </Text>

            {exp.technologies && exp.technologies.length > 0 && (
              <Flex gap="0.5rem" flexWrap="wrap">
                {exp.technologies.map((tech, techIndex) => (
                  <Box
                    key={techIndex}
                    bg="rgba(0, 91, 209, 0.2)"
                    color="rgb(100, 180, 255)"
                    px="0.8rem"
                    py="0.3rem"
                    borderRadius="20px"
                    fontSize="0.85rem"
                    fontWeight="500"
                    border="1px solid rgba(0, 91, 209, 0.3)"
                  >
                    {tech}
                  </Box>
                ))}
              </Flex>
            )}
          </MotionBox>
        ))}
      </Flex>

      {totalPages > 1 && (
        <Flex
          mt="2rem"
          gap="1rem"
          align="center"
          justify="center"
        >
          <Button
            onClick={() => changePage(currentPage - 1)}
            isDisabled={currentPage === 1}
            bg="transparent"
            border="2px solid rgba(0, 91, 209, 0.8)"
            color="white"
            _hover={{ bg: 'rgba(0, 91, 209, 0.3)' }}
            _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
            size="sm"
          >
            <FaChevronLeft />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              onClick={() => changePage(page)}
              bg={currentPage === page ? 'rgb(0, 91, 209)' : 'transparent'}
              border="2px solid rgba(0, 91, 209, 0.8)"
              color="white"
              _hover={{ bg: currentPage === page ? 'rgb(0, 91, 209)' : 'rgba(0, 91, 209, 0.3)' }}
              size="sm"
              minW="40px"
            >
              {page}
            </Button>
          ))}

          <Button
            onClick={() => changePage(currentPage + 1)}
            isDisabled={currentPage === totalPages}
            bg="transparent"
            border="2px solid rgba(0, 91, 209, 0.8)"
            color="white"
            _hover={{ bg: 'rgba(0, 91, 209, 0.3)' }}
            _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
            size="sm"
          >
            <FaChevronRight />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Experience;
