import React from "react";
import "./About.css";
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

        {/* ABOUT PROJECT */}
        <section className="about-content">
          <h2>📌 About This Project</h2>

          <p>
            <strong>Virtual Room System</strong> is designed to help users
            manage notes, track time, interact with an AI chatbot, and maintain
            secure profiles — all in one place.
          </p>

          <p>
            The project is built using <strong>React.js</strong> on the
            frontend, <strong>Node.js & Express.js</strong> on the backend,
            and <strong>MongoDB</strong> for database management.
          </p>

          <p>
            This system provides a clean user interface, secure authentication,
            real-time interaction, and efficient data management.
          </p>
        </section>

        {/* TEAM SECTION */}
        <section className="developer-section">
          <h2>👨‍💻 Our Team</h2>

          <p className="team-text">
            This project was successfully developed by our team members who
            worked together on frontend development, backend APIs,
            database management, authentication, UI design, and testing
            of the Virtual Room System.
          </p>

          <div className="team-container">

            {/* MEMBER 1 */}
            <div className="developer-profile">
              <div className="developer-info">
                <h3>Ank Tiwari</h3>

                <p>
                  <strong>Role:</strong> Backend Developer
                </p>

                <p>
                  Worked on REST APIs, JWT authentication,
                  MongoDB integration, and server-side logic
                  using Node.js & Express.js.
                </p>
              </div>
            </div>

            {/* MEMBER 2 */}
            <div className="developer-profile">
              <div className="developer-info">
                <h3>Anshika Prajapati</h3>

                <p>
                  <strong>Role:</strong> Frontend Developer
                </p>

                <p>
                  Developed responsive pages, React components,
                  routing system, and improved user interface
                  experience.
                </p>
              </div>
            </div>

            {/* MEMBER 3 */}
            <div className="developer-profile">
              <div className="developer-info">
                <h3>Amisha Vishwakarma</h3>

                <p>
                  <strong>Role:</strong> UI/UX Designer
                </p>

                <p>
                  Designed layouts, styling structure,
                  animations, and improved overall visual
                  appearance of the project.
                </p>
              </div>
            </div>

            {/* MEMBER 4 */}
            <div className="developer-profile">
              <div className="developer-info">
                <h3>Akanksha Patel</h3>

                <p>
                  <strong>Role:</strong> Database Manager
                </p>

                <p>
                  Managed MongoDB collections, database
                  connectivity, schema structure, and data
                  storage optimization.
                </p>
              </div>
            </div>

            {/* MEMBER 5 */}
            <div className="developer-profile">
              <div className="developer-info">
                <h3>Avanshika Soni</h3>

                <p>
                  <strong>Role:</strong> Testing & Documentation
                </p>

                <p>
                  Worked on project testing, documentation,
                  debugging, and improving overall project quality.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="about-footer">
          © 2025 Virtual Room System <br />
          Designed & Developed by <strong>Team Members</strong>
        </footer>

      </div>
    </>
  );
};

export default About;
