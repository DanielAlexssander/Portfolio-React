import { Box } from '@chakra-ui/react';
import { FaHtml5, FaCss3Alt, FaReact, FaJs, FaSass, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiFlutter, SiTypescript } from 'react-icons/si';

const TechSlider = () => {
  const techIcons = [
    <FaHtml5 key="html" color="white" size={75} />,
    <FaCss3Alt key="css" color="white" size={75} />,
    <FaReact key="react" color="white" size={75} />,
    <SiFlutter key="flutter" color="white" size={75} />,
    <FaJs key="js" color="white" size={75} />,
    <FaSass key="sass" color="white" size={75} />,
    <SiTypescript key="ts" color="white" size={75} />,
    <FaNodeJs key="node" color="white" size={75} />,
    <FaGitAlt key="git" color="white" size={75} />
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