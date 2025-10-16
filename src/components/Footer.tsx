import { FaReact } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <h4>Tecnologias Utilizadas:</h4>
        <ul className="ulFooter flex">
          <FaReact key="react" color="#61DAFB" className="liFooter"/>
        </ul>
        <a
          className="thisCodBtn"
          target="_blank"
          href="https://github.com/DanielAlexssander/Projetos"
        >
          Código desta página
        </a>
      </div>
    </footer>
  );
};

export default Footer;