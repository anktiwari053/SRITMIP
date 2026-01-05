import React from "react";
import "./About.css";
import premImg from "./img/linkdin.jpg";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="about-page">
        {/* HERO SECTION */}
        <section className="about-hero">
          <h1>About Virtual Room System</h1>
          <p>
            A modern full-stack web application built to provide a smart,
            secure, and interactive digital workspace.
          </p>
        </section>

        {/* ABOUT CONTENT */}
        <section className="about-content">
          <h2>📌 About This Project</h2>
          <p>
            <strong>Virtual Room System</strong> is designed to help users manage
            notes, track time, interact with an AI chatbot, and maintain secure
            profiles — all in one place.
          </p>

          <p>
            The project is built using <strong>React.js</strong> on the frontend,
            <strong> Node.js & Express.js</strong> on the backend, and
            <strong> MongoDB</strong> for data storage. It follows modern
            development practices and secure authentication using JWT.
          </p>
        </section>

        {/* TEAM / DEVELOPER SECTION */}
        <section className="developer-section">
          <h2>👨‍💻 Developer</h2>

          <div className="developer-profile">
            <img src={premImg} alt="Ankit Tiwari" />

            <div className="developer-info">
              <h3>Ank Tiwari</h3>
              <p><strong>Contact:</strong> +917447040</p>
              <p><strong>Roll No:</strong> 0205CS231026</p>
              <p><strong>College:</strong> SRIT College</p>
              <p><strong>Email:</strong> premtiwar704@gmail.com</p>

              <div className="developer-links">
 


              <p className="experience">
                <strong>Experience:</strong> Backend development including REST
                API creation, user authentication, database management, and
                server-side logic using Node.js and Express.
              </p>

               <a
    href="https://anktiwari053.github.io/Portfolio/"
    target="_blank"
    rel="noopener noreferrer"
  >
    🌐 Portfolio
  </a>

  <a
    href="https://github.com/anktiwari053"
    target="_blank"
    rel="noopener noreferrer"
  >
    💻 GitHub
  </a>

  <a
    href="https://www.linkedin.com/in/ank-tiwari/"
    target="_blank"
    rel="noopener noreferrer"
  >
    🔗 LinkedIn
  </a>
</div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="about-footer">
          © {new Date().getFullYear()} Virtual Room System <br />
          Designed & Developed by <strong>Ank Tiwari</strong>
        </footer>
      </div>
    </>
  );
};

export default About;
