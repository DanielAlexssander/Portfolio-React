import { FaHtml5, FaCss3Alt, FaReact, FaJs, FaSass, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiFlutter, SiTypescript } from 'react-icons/si';

const TechSlider = () => {
  const techIcons = [
    <FaHtml5 key="html" className="white" size={75} />,
    <FaCss3Alt key="css" className="white" size={75} />,
    <FaReact key="react" className="white" size={75} />,
    <SiFlutter key="flutter" className="white" size={75} />,
    <FaJs key="js" className="white" size={75} />,
    <FaSass key="sass" className="white" size={75} />,
    <SiTypescript key="ts" className="white" size={75} />,
    <FaNodeJs key="node" className="white" size={75} />,
    <FaGitAlt key="git" className="white" size={75} />
  ];

  return (
    <section className="bar-slide">
      <div className="scroll-left center">
        {[...Array(3)].map((_, setIndex) =>
          techIcons.map((icon, index) => (
            <div key={`set-${setIndex}-${index}`} className="item-box">
              {icon}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TechSlider;