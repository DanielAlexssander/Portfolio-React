import { Box } from '@chakra-ui/react';
import { FaHtml5, FaCss3Alt, FaReact, FaJs, FaSass, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiFlutter, SiTypescript } from 'react-icons/si';

const TechSlider = () => {
  const techIcons = [
    <FaHtml5 key="html" color="#E34F26" size={75} />,
    <FaCss3Alt key="css" color="#1572B6" size={75} />,
    <FaReact key="react" color="#61DAFB" size={75} />,
    <SiFlutter key="flutter" color="#02569B" size={75} />,
    <FaJs key="js" color="#F7DF1E" size={75} />,
    <FaSass key="sass" color="#CC6699" size={75} />,
    <SiTypescript key="ts" color="#3178C6" size={75} />,
    <FaNodeJs key="node" color="#339933" size={75} />,
    <FaGitAlt key="git" color="#F05032" size={75} />
  ];

  return (
    <Box
      as="section"
      whiteSpace="nowrap"
      w={{ base: '545.8px', sm: '100vw' }}
      bg="#001131"
      p="1em 0"
      display="flex"
      overflowX="hidden"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        animation="scroll-left 20s linear infinite"
        sx={{
          '@keyframes scroll-left': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-33.33%)' }
          }
        }}
      >
        {[...Array(3)].map((_, setIndex) =>
          techIcons.map((icon, index) => (
            <Box
              key={`set-${setIndex}-${index}`}
              display="inline-flex"
              pr="100px"
              fontWeight="900"
              fontSize="5em"
              color="white"
              textAlign="center"
            >
              {icon}
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default TechSlider;