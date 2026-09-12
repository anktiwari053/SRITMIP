import React from "react";
import "./About.css";
import premImg from "./img/ak1.jpeg";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="about-page">

        {/* HERO SECTION */}
        <section className="about-hero">
          <span className="about-badge">🎓 Student Learning Platform</span>

          <h1>About Virtual Room System</h1>

          <p>
            Virtual Room is a student-focused web platform designed to bring
            notes, doubt solving, study time management, and other useful
            learning tools together in one place.
          </p>
        </section>

        {/* ABOUT PROJECT */}
        <section className="about-content">
          <h2>📌 About Virtual Room</h2>

          <p>
            <strong>Virtual Room System</strong> is a full-stack web application
            created to provide students with a simple and useful digital
            learning environment.
          </p>

          <p>
            The main idea behind this project is to make common study activities
            easier by providing features such as <strong>Academic Notes,
            AI Chatbot, Study Timer, User Profile, and All Notes</strong> in a
            single platform.
          </p>

          <p>
            Students can use the platform to access their notes, ask questions
            when they have doubts, manage their study time, and explore
            previously available notes.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="about-content">
          <h2>⚙️ How Virtual Room Works</h2>

          <div className="feature-grid">

            <div className="feature-card">
              <h3>🏠 Home</h3>
              <p>
                Users can access and manage their important study notes from
                the Home section.
              </p>
            </div>

            <div className="feature-card">
              <h3>💬 Chatbot</h3>
              <p>
                Users can ask study-related questions and get assistance from
                the AI chatbot when they have doubts.
              </p>
            </div>

            <div className="feature-card">
              <h3>👤 Profile</h3>
              <p>
                Users can view their profile and account-related information
                from this section.
              </p>
            </div>

            <div className="feature-card">
              <h3>⏱️ SetTime</h3>
              <p>
                Students can set a study timer and manage their study sessions
                more effectively.
              </p>
            </div>

            <div className="feature-card">
              <h3>📚 All Notes</h3>
              <p>
                Users can browse and access previously available academic notes
                from this section.
              </p>
            </div>

            <div className="feature-card">
              <h3>ℹ️ About</h3>
              <p>
                This section provides information about the project, its
                purpose, technologies, development, and future improvements.
              </p>
            </div>

            <div className="feature-card">
              <h3>🚪 Logout</h3>
              <p>
                Users can securely log out of their account and leave the
                authenticated area of the website.
              </p>
            </div>

          </div>
        </section>

        {/* PROJECT PURPOSE */}
        <section className="about-content">
          <h2>🎯 Why Was Virtual Room Created?</h2>

          <p>
            Virtual Room was created with the idea of providing students with
            useful study-related tools in one centralized platform.
          </p>

          <p>
            Instead of using different platforms for notes, doubt solving and
            study-time management, students can access these basic tools from
            one place.
          </p>

          <p>
            The project is also being continuously improved using real user
            feedback and suggestions.
          </p>
        </section>

        {/* TECHNOLOGIES */}
        <section className="about-content">
          <h2>💻 Technologies Used</h2>

          <div className="tech-grid">
            <span>React.js</span>
            <span>JavaScript</span>
            <span>Node.js</span>
            <span>Express.js</span>
            <span>MongoDB</span>
            <span>REST API</span>
            <span>JWT Authentication</span>
            <span>AI API Integration</span>
            <span>HTML & CSS</span>
            <span>Git & GitHub</span>
          </div>
        </section>

        {/* UPCOMING FEATURES */}
        <section className="about-content upcoming-section">
          <h2>🚀 Upcoming Improvements</h2>

          <p>
            Based on user feedback, the following improvements are being
            considered for future updates:
          </p>

          <ul>
            <li>⚡ Improve overall website speed and performance</li>
            <li>🤖 Improve Eco Chatbot responses and response time</li>
            <li>📄 Improve PDF viewing and loading</li>
            <li>🎨 Improve UI design, spacing and creativity</li>
            <li>🔐 Add logout confirmation before signing out</li>
            <li>📚 Improve notes searching and accessibility</li>
            <li>📱 Improve mobile and responsive experience</li>
            <li>✨ Add more useful student-focused features</li>
          </ul>
        </section>

        {/* DEVELOPER */}
        <section className="developer-section">
          <h2>👨‍💻 Developer</h2>

          <div className="developer-profile">

            <img
              src={premImg}
              alt="Ank Tiwari - Developer of Virtual Room"
            />

            <div className="developer-info">
              <h3>Ank Tiwari</h3>

             

              <p>
                <strong>Education:</strong> Computer Science Engineering
              </p>

              <p>
                <strong>College:</strong> Shri Ram Institute of Technology,
                Jabalpur
              </p>

          

              <div className="developer-links">

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
          © 2026 Virtual Room System | Developed by{" "}
          <strong>ApexSoft Technologies</strong>
        </footer>

      </div>
    </>
  );
};

export default About;
