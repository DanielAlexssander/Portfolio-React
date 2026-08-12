import { useRef, useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { 
  FaHtml5, FaCss3Alt, FaReact, FaJs, FaNodeJs, FaGitAlt, FaPython, FaAws, FaJava, FaPhp, FaAngular, FaVuejs, FaDocker, FaGithub
} from 'react-icons/fa';
import { 
  SiTypescript, SiFlutter, SiMongodb, SiPostgresql, SiDotnet, SiExpress, SiGraphql, SiFastapi, SiFirebase, SiNextdotjs, SiOpenai, SiDart
} from 'react-icons/si';
import { TbBrandCSharp, TbBrandAzure } from 'react-icons/tb';

interface TechItem {
  icon: React.ReactNode;
  name: string;
  color: string;
}

const TechSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const techItems: TechItem[] = [
    // Front-end
    { icon: <FaReact size={40} />, name: 'React', color: '#61DAFB' },
    { icon: <SiNextdotjs size={40} />, name: 'Next.js', color: '#FFFFFF' },
    { icon: <FaAngular size={40} />, name: 'Angular', color: '#DD0031' },
    { icon: <FaVuejs size={40} />, name: 'Vue.js', color: '#4FC08D' },
    { icon: <FaHtml5 size={40} />, name: 'HTML5', color: '#E34F26' },
    { icon: <FaCss3Alt size={40} />, name: 'CSS3', color: '#1572B6' },
    { icon: <FaJs size={40} />, name: 'JavaScript', color: '#F7DF1E' },
    { icon: <SiTypescript size={40} />, name: 'TypeScript', color: '#3178C6' },
    
    // Back-end
    { icon: <FaNodeJs size={40} />, name: 'Node.js', color: '#339933' },
    { icon: <SiExpress size={40} />, name: 'Express', color: '#FFFFFF' },
    { icon: <SiDotnet size={40} />, name: '.NET', color: '#512BD4' },
    { icon: <SiFastapi size={40} />, name: 'FastAPI', color: '#009688' },
    { icon: <SiGraphql size={40} />, name: 'GraphQL', color: '#E10098' },
    
    // Languages
    { icon: <FaPython size={40} />, name: 'Python', color: '#3776AB' },
    { icon: <FaJava size={40} />, name: 'Java', color: '#ED8B00' },
    { icon: <TbBrandCSharp size={40} />, name: 'C#', color: '#239120' },
    { icon: <SiDart size={40} />, name: 'Dart', color: '#0175C2' },
    { icon: <FaPhp size={40} />, name: 'PHP', color: '#777BB4' },
    { icon: <SiFlutter size={40} />, name: 'Flutter', color: '#02569B' },
    
    // Databases
    { icon: <SiPostgresql size={40} />, name: 'PostgreSQL', color: '#4169E1' },
    { icon: <SiMongodb size={40} />, name: 'MongoDB', color: '#47A248' },
    { icon: <SiFirebase size={40} />, name: 'Firebase', color: '#FFCA28' },
    
    // Cloud & DevOps
    { icon: <FaAws size={40} />, name: 'AWS', color: '#FF9900' },
    { icon: <TbBrandAzure size={40} />, name: 'Azure', color: '#0078D4' },
    { icon: <FaGitAlt size={40} />, name: 'Git', color: '#F05032' },
    { icon: <FaGithub size={40} />, name: 'GitHub', color: '#FFFFFF' },
    { icon: <FaDocker size={40} />, name: 'Docker', color: '#2496ED' },
    
    // AI & Tools
    { icon: <SiOpenai size={40} />, name: 'OpenAI', color: '#412991' },
    { icon: <svg width="40" height="40" viewBox="0 0 32 32" fill="#F2C811" xmlns="http://www.w3.org/2000/svg"><path d="M13.501 16h-7.498c0 0-0 0-0 0-0.69 0-1.25 0.559-1.25 1.25 0 0 0 0 0 0v0 12.496c0 0 0 0 0 0 0 0.69 0.559 1.25 1.25 1.25 0 0 0 0 0 0h8.747v-13.746c0-0.69-0.559-1.25-1.25-1.25v0zM19.749 8.502h-7.498c0 0-0 0-0 0-0.69 0-1.25 0.559-1.25 1.25 0 0 0 0 0 0v0 5.623h2.499c1.035 0.001 1.873 0.84 1.874 1.874v13.746h5.623v-21.244c0-0.69-0.559-1.25-1.25-1.25v0zM27.247 2.254v27.492c0 0 0 0 0 0 0 0.69-0.559 1.25-1.25 1.25 0 0-0 0-0 0h-4.374v-21.244c-0.001-1.035-0.84-1.873-1.874-1.874h-2.499v-5.623c0-0 0-0 0-0 0-0.69 0.559-1.25 1.25-1.25h7.498c0.69 0 1.25 0.559 1.25 1.25 0 0 0 0 0 0v0z"></path></svg>, name: 'Power BI', color: '#F2C811' },
  ];

  // Auto scroll com loop infinito
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || isDragging) return;

    let animationId: number;
    let scrollPos = slider.scrollLeft;
    const itemWidth = 152; // minW 120 + mx 4*2*4 = 152
    const totalWidth = techItems.length * itemWidth;

    const animate = () => {
      scrollPos += 1;
      
      // Loop infinito: quando chegar na metade (items duplicados), volta ao início
      if (scrollPos >= totalWidth) {
        scrollPos = 0;
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft = scrollPos;
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isDragging, techItems.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const TechCard = ({ tech }: { tech: TechItem }) => (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={3}
      minW="120px"
      h="100px"
      mx={4}
      p={4}
      bg="rgba(30, 41, 59, 0.4)"
      borderRadius="16px"
      border="1px solid rgba(255, 255, 255, 0.05)"
      transition="all 0.3s ease"
      userSelect="none"
      _hover={{
        bg: 'rgba(30, 41, 59, 0.6)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
      }}
    >
      <Box color={tech.color} pointerEvents="none">
        {tech.icon}
      </Box>
      <Text fontSize="xs" color="#94A3B8" fontWeight="500" letterSpacing="0.5px" pointerEvents="none">
        {tech.name}
      </Text>
    </Flex>
  );

  return (
    <Box
      as="section"
      bg="#0F172A"
      py={{ base: 12, md: 16 }}
      position="relative"
    >
      {/* Fade edges */}
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100px"
        h="100%"
        bgGradient="linear(to-r, #0F172A, transparent)"
        zIndex={2}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top={0}
        right={0}
        w="100px"
        h="100%"
        bgGradient="linear(to-l, #0F172A, transparent)"
        zIndex={2}
        pointerEvents="none"
      />

      {/* Slider Track */}
      <Box
        ref={sliderRef}
        overflowX="scroll"
        overflowY="visible"
        cursor={isDragging ? 'grabbing' : 'grab'}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
        py={2}
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <Flex>
          {/* Triplicate items for seamless infinite loop */}
          {[...techItems, ...techItems, ...techItems].map((tech, index) => (
            <Box key={index} flexShrink={0}>
              <TechCard tech={tech} />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default TechSlider;
