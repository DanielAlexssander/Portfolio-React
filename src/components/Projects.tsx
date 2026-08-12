import { useState, useMemo } from 'react';
import { Box, Heading, Text, Image, Link, Flex, SimpleGrid, Input, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaArrowUp, FaExternalLinkAlt, FaGithub, FaChevronLeft, FaChevronRight, FaSearch, FaCode, FaLock, FaHtml5, FaCss3Alt, FaReact, FaJs, FaSass, FaNodeJs, FaPython, FaAws } from 'react-icons/fa';
import { SiTypescript, SiFlutter, SiFirebase, SiNextdotjs, SiTailwindcss, SiRedux, SiExpress } from 'react-icons/si';
import { useLanguage } from '../contexts/LanguageContext';

const MotionBox = motion.create(Box as React.ComponentType<any>);

interface Project {
  app?: boolean;
  urlGif: string;
  nameProject: string;
  liTec: string;
  informations: string;
  urlSite?: string;
  urlCod?: string;
  private?: boolean;
}

interface TechIconConfig {
  icon: React.ComponentType<{ size?: number; color?: string }>;
  color: string;
}

const techIconsConfig: Record<string, TechIconConfig> = {
  HTML: { icon: FaHtml5, color: '#E34F26' },
  CSS: { icon: FaCss3Alt, color: '#1572B6' },
  JavaScript: { icon: FaJs, color: '#F7DF1E' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  React: { icon: FaReact, color: '#61DAFB' },
  Node: { icon: FaNodeJs, color: '#339933' },
  Sass: { icon: FaSass, color: '#CC6699' },
  Flutter: { icon: SiFlutter, color: '#02569B' },
  Firebase: { icon: SiFirebase, color: '#FFCA28' },
  Next: { icon: SiNextdotjs, color: '#FFFFFF' },
  Tailwind: { icon: SiTailwindcss, color: '#06B6D4' },
  Redux: { icon: SiRedux, color: '#764ABC' },
  Express: { icon: SiExpress, color: '#FFFFFF' },
  Python: { icon: FaPython, color: '#3776AB' },
  AWS: { icon: FaAws, color: '#FF9900' },
};


const Projects = () => {
  const { t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const PROJECTS_PER_PAGE = 6;

  const projects: Project[] = [
    {
      urlGif: "./tiago-ons.png",
      nameProject: "Tiago ONS",
      liTec: "React, TypeScript, Python, AWS",
      informations: t('tiagoOnsDesc'),
      private: true,
    },
    {
      app: true,
      urlGif: "./exchange-rate.gif",
      nameProject: "Exchange Rate",
      liTec: "Flutter",
      informations: t('exchangeRateDesc'),
      urlSite: "https://drive.google.com/file/d/1RfNycs4Cmy2fYdgTsPIa2Yj6ae5bXJXi/view?usp=sharing",
      urlCod: "https://github.com/DanielAlexssander/Exchange-Rate",
    },
    {
      urlGif: "./hubgram.gif",
      nameProject: "HubGram",
      liTec: "React, Redux, Express, Node",
      informations: t('hubgramDesc'),
      urlSite: "https://hubgram.netlify.app",
      urlCod: "https://github.com/DanielAlexssander/HubGram-FronEnd",
    },
    {
      urlGif: "./vet-pata-amiga.gif",
      nameProject: "Veterinária Pata Amiga",
      liTec: "Next, Tailwind, TypeScript, Node",
      informations: t('vetDesc'),
      urlSite: "https://veterinaria-pata-amiga.netlify.app",
      urlCod: "https://github.com/DanielAlexssander/Vet-Pata-Amiga",
    },
    {
      urlGif: "./mini-blog.gif",
      nameProject: "Mini Blog",
      liTec: "React, Firebase, Node, JavaScript, CSS",
      informations: t('miniBlogDesc'),
      urlSite: "https://miniblog-by-danielalexssander.netlify.app",
      urlCod: "https://github.com/DanielAlexssander/miniblog",
    },
    {
      urlGif: "./memorycard.gif",
      nameProject: "Memory Game",
      liTec: "HTML, TypeScript, Sass, Node",
      informations: t('memoryGameDesc'),
      urlSite: "https://danielalexssander.github.io/Memory-Game/",
      urlCod: "https://github.com/DanielAlexssander/Memory-Game",
    },
    {
      urlGif: "./checklist.gif",
      nameProject: "CheckList",
      liTec: "HTML, CSS, JavaScript",
      informations: t('checklistDesc'),
      urlSite: "https://danielalexssander.github.io/CheckList/",
      urlCod: "https://github.com/DanielAlexssander/CheckList/",
    },
    {
      urlGif: "./strata.gif",
      nameProject: "Strata",
      liTec: "HTML, CSS",
      informations: t('strataDesc'),
      urlSite: "https://danielalexssander.github.io/Strata/",
      urlCod: "https://github.com/DanielAlexssander/Strata/",
    },
    {
      urlGif: "./rangehotels.gif",
      nameProject: "Range Hotels",
      liTec: "HTML, CSS",
      informations: t('rangeHotelsDesc'),
      urlSite: "https://danielalexssander.github.io/RangeHotels-Responsivo/",
      urlCod: "https://github.com/DanielAlexssander/RangeHotels-Responsivo/",
    },
  ];

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.liTec.split(', ').forEach(tech => techs.add(tech)));
    return Array.from(techs).sort();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesName = project.nameProject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = !selectedTech || project.liTec.split(', ').includes(selectedTech);
    return matchesName && matchesTech;
  });

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE
  );

  const changePage = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const renderTechBadges = (techs: string) => {
    return techs.split(', ').map((tech, index) => {
      const config = techIconsConfig[tech];
      const IconComponent = config?.icon;
      return (
        <Flex
          key={index}
          align="center"
          gap={1.5}
          bg="rgba(59, 130, 246, 0.1)"
          px={2.5}
          py={1}
          borderRadius="6px"
          border="1px solid rgba(59, 130, 246, 0.15)"
        >
          {IconComponent && <IconComponent size={14} color={config.color} />}
          <Text fontSize="xs" color="#94A3B8" fontWeight="500">{tech}</Text>
        </Flex>
      );
    });
  };


  return (
    <Box
      as="section"
      id="projects"
      bg="#0F172A"
      position="relative"
      py={{ base: '80px', md: '120px' }}
      px={{ base: 4, md: 8 }}
      overflow="hidden"
    >
      {/* Background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bgGradient="linear(135deg, rgba(59, 130, 246, 0.03) 0%, transparent 50%, rgba(34, 197, 94, 0.03) 100%)"
        pointerEvents="none"
      />

      <Box maxW="1300px" mx="auto" position="relative" zIndex={1}>
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          mb={{ base: 8, md: 12 }}
          textAlign="center"
        >
          <Flex align="center" justify="center" gap={3} mb={4}>
            <Box w="60px" h="1px" bg="linear-gradient(90deg, transparent, #3B82F6)" />
            <Box p={3} bg="rgba(59, 130, 246, 0.1)" borderRadius="12px" border="1px solid rgba(59, 130, 246, 0.2)">
              <FaCode color="#3B82F6" size={20} />
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
            {t('projectsTitle').replace(':', '')}
          </Heading>
        </MotionBox>

        {/* Filters */}
        <Flex
          gap={4}
          mb={10}
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
        >
          <Flex
            align="center"
            bg="rgba(30, 41, 59, 0.6)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="12px"
            px={4}
            w={{ base: '100%', md: '350px' }}
            transition="all 0.25s ease"
            _focusWithin={{ borderColor: 'rgba(59, 130, 246, 0.5)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.15)' }}
          >
            <FaSearch color="#64748B" size={14} />
            <Input
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              border="none"
              bg="transparent"
              color="white"
              fontSize="sm"
              _placeholder={{ color: '#64748B' }}
              _focus={{ boxShadow: 'none' }}
              py={3}
              pl={3}
            />
          </Flex>

          <Box
            as="select"
            value={selectedTech}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setSelectedTech(e.target.value); setCurrentPage(1); }}
            bg="rgba(30, 41, 59, 0.6)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="12px"
            color="white"
            px={4}
            py={3}
            fontSize="sm"
            w={{ base: '100%', md: '200px' }}
            cursor="pointer"
            transition="all 0.25s ease"
            _focus={{ borderColor: 'rgba(59, 130, 246, 0.5)', outline: 'none' }}
            sx={{ '& option': { bg: '#1E293B', color: 'white' } }}
          >
            <option value="">{t('allTechnologies')}</option>
            {allTechs.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </Box>
        </Flex>

        {/* Projects Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
          {paginatedProjects.map((project, index) => (
            <MotionBox
              key={`${currentPage}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Box
                bg="rgba(30, 41, 59, 0.5)"
                borderRadius="20px"
                overflow="hidden"
                border="1px solid rgba(255, 255, 255, 0.05)"
                transition="all 0.3s ease"
                cursor="pointer"
                h="100%"
                display="flex"
                flexDirection="column"
                _hover={{
                  transform: 'translateY(-8px)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 0 40px rgba(59, 130, 246, 0.1)'
                }}
              >
                {/* Image */}
                <Box position="relative" overflow="hidden" h="200px">
                  <Image
                    src={project.urlGif}
                    alt={project.nameProject}
                    w="100%"
                    h="100%"
                    objectFit={project.app ? 'contain' : 'cover'}
                    transition="transform 0.5s ease"
                    _groupHover={{ transform: 'scale(1.05)' }}
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(180deg, transparent 50%, rgba(15, 23, 42, 0.9) 100%)"
                  />
                  {project.private && (
                    <Flex
                      position="absolute"
                      top={3}
                      right={3}
                      align="center"
                      gap={1.5}
                      bg="rgba(0, 0, 0, 0.6)"
                      backdropFilter="blur(8px)"
                      px={3}
                      py={1.5}
                      borderRadius="full"
                    >
                      <FaLock size={10} color="#94A3B8" />
                      <Text fontSize="xs" color="#94A3B8" fontWeight="500">Private</Text>
                    </Flex>
                  )}
                </Box>

                {/* Content */}
                <Flex direction="column" flex={1} p={6}>
                  <Heading
                    as="h3"
                    fontFamily="'Space Grotesk', sans-serif"
                    fontSize="lg"
                    fontWeight="700"
                    color="white"
                    mb={3}
                  >
                    {project.nameProject}
                  </Heading>

                  <Text
                    fontSize="sm"
                    color="#94A3B8"
                    lineHeight="1.7"
                    mb={4}
                    noOfLines={3}
                  >
                    {project.informations}
                  </Text>

                  <Flex gap={2} flexWrap="wrap" mb={5}>
                    {renderTechBadges(project.liTec)}
                  </Flex>

                  {/* Actions */}
                  {!project.private && (
                    <Flex gap={3} mt="auto">
                      <Link
                        href={project.urlSite}
                        target="_blank"
                        flex={1}
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Flex
                          w="100%"
                          bg="#3B82F6"
                          color="white"
                          py={2.5}
                          fontSize="sm"
                          fontWeight="600"
                          borderRadius="5px"
                          align="center"
                          justify="center"
                          gap={2}
                          _hover={{ bg: '#2563EB', transform: 'translateY(-2px)' }}
                          transition="all 0.2s ease"
                        >
                          <FaExternalLinkAlt size={12} />
                          {project.app ? t('apk') : t('site')}
                        </Flex>
                      </Link>
                      <Link
                        href={project.urlCod}
                        target="_blank"
                        flex={1}
                        _hover={{ textDecoration: 'none' }}
                      >
                        <Box
                          position="relative"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          gap={2}
                          w="100%"
                          bg="transparent"
                          color="white"
                          py={2.5}
                          fontSize="sm"
                          fontWeight="600"
                          borderRadius="5px"
                          border="1px solid rgba(255, 255, 255, 0.15)"
                          overflow="hidden"
                          zIndex={1}
                          transition="all 0.3s ease"
                          _before={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            bg: '#3B82F6',
                            transition: 'transform 0.4s ease-in-out',
                            transform: 'scaleX(0)',
                            transformOrigin: 'left',
                            zIndex: -1
                          }}
                          _hover={{
                            borderColor: '#3B82F6',
                            '&::before': {
                              transform: 'scaleX(1)'
                            }
                          }}
                        >
                          <FaGithub size={14} />
                          {t('code')}
                        </Box>
                      </Link>
                    </Flex>
                  )}
                </Flex>
              </Box>
            </MotionBox>
          ))}
        </SimpleGrid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Flex justify="center" align="center" gap={3} mt={12}>
            <Button
              onClick={() => changePage(Math.max(1, currentPage - 1))}
              isDisabled={currentPage === 1}
              bg="rgba(30, 41, 59, 0.8)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              color="white"
              w="44px"
              h="44px"
              p={0}
              borderRadius="12px"
              _hover={{ bg: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.3)' }}
              _disabled={{ opacity: 0.3, cursor: 'not-allowed' }}
            >
              <FaChevronLeft size={14} />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
                _hover={{ bg: currentPage === page ? '#2563EB' : 'rgba(59, 130, 246, 0.2)' }}
              >
                {page}
              </Button>
            ))}

            <Button
              onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
              isDisabled={currentPage === totalPages}
              bg="rgba(30, 41, 59, 0.8)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              color="white"
              w="44px"
              h="44px"
              p={0}
              borderRadius="12px"
              _hover={{ bg: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 0.3)' }}
              _disabled={{ opacity: 0.3, cursor: 'not-allowed' }}
            >
              <FaChevronRight size={14} />
            </Button>
          </Flex>
        )}

        {/* Back to top */}
        <Flex justify="center" mt={16}>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            variant="ghost"
            color="#64748B"
            fontWeight="500"
            fontSize="sm"
            leftIcon={<FaArrowUp size={12} />}
            _hover={{ color: '#3B82F6' }}
          >
            {t('backToTop')}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Projects;
