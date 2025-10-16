import { useState } from 'react';

const Contacts = () => {
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

  return (
    <section id="container-contacts">
      <div>
        <img className="face-image" src="/logo.png" alt="" />
        <h1 className="name">Contatos:</h1>
        <button className={`copyBtn ${copied ? 'active' : ''}`} onClick={handleCopy}>
          <i className="fa-solid fa-copy"></i>
        </button>
        <ul className="links-ul center">
          <div>
            <div className="gmail">
              <a href="mailto:danielrossinatti15@gmail.com">
                <li className="gmailLi">
                  <i className="fa-regular fa-envelope"></i> Gmail
                </li>
              </a>
            </div>
            <a href="https://www.linkedin.com/in/daniel-alexssander-667933148">
              <li><i className="fa-brands fa-linkedin"></i> Linkedin</li>
            </a>
            <a href="https://profile.indeed.com/?hl=pt_BR&co=BR&from=gnav-homepage&_ga=2.232801303.840665186.1682014064-110041772.1682014064">
              <li><i className="fa-solid fa-info"></i> Indeed</li>
            </a>
            <a href="https://wa.me/5521968603176">
              <li><i className="fa-brands fa-whatsapp"></i> WhatsApp</li>
            </a>
            <a href="https://discord.gg/apUjj8JRVC">
              <li><i className="fa-brands fa-discord"></i> Discord</li>
            </a>
            <a href="https://github.com/DanielAlexssander">
              <li><i className="fa-brands fa-github"></i> GitHub</li>
            </a>
          </div>
        </ul>
      </div>
    </section>
  );
};

export default Contacts;