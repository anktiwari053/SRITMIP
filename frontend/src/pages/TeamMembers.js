import React from "react";
import "./About.css";
import premImg from "./img/ak1.jpeg";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <>
      <Navbar />

      <div className="about-page">

        {/* ================= HERO SECTION ================= */}
        <section className="about-hero">
          <span className="about-badge">
            🎓 Student Learning Platform
          </span>

          <h1>🎓 Welcome to Virtual Room</h1>

          <h2>
            Your Smart Digital Space for Learning, Notes & Study Management
          </h2>

          <h3>Learn • Organize • Ask • Track</h3>

          <p>
            Virtual Room is a student-focused web platform created to bring
            useful study tools together in one place.
          </p>
        </section>


        {/* ================= ABOUT VIRTUAL ROOM ================= */}
        <section className="about-content">
          <h2>📌 About Virtual Room</h2>

          <p>
            <strong>Virtual Room System</strong> is a full-stack web
            application designed to help students manage their study
            activities more easily.
          </p>

          <p>
            The platform provides features such as{" "}
            <strong>
              Academic Notes, AI Chatbot, Study Timer, User Profile,
              and All Notes
            </strong>{" "}
            in a single digital workspace.
          </p>

          <p>
            The project is continuously improved based on real user
            feedback and suggestions.
          </p>
        </section>


        {/* ================= WHY VIRTUAL ROOM ================= */}
        <section className="about-content">
          <h2>🎯 Why Virtual Room?</h2>

          <p>
            The main goal of Virtual Room is to make basic study activities
            easier and more organized.
          </p>

          <p>Students can:</p>

          <ul>
            <li>📚 Access and manage study notes</li>
            <li>💬 Ask questions and clear study doubts</li>
            <li>⏱️ Manage study time using a timer</li>
            <li>👤 Manage their profile</li>
            <li>📖 Explore previously available notes</li>
          </ul>

          <p>
            The idea is to provide useful study-related tools in one
            simple platform.
          </p>
        </section>


        {/* ================= HOW IT WORKS ================= */}
        <section className="about-content">
          <h2>⚙️ How Virtual Room Works</h2>

          <div className="feature-grid">

            <div className="feature-card">
              <h3>🏠 Home</h3>
              <p>
                Users can access and manage their important study notes
                from the Home section.
              </p>
            </div>

            <div className="feature-card">
              <h3>💬 Chatbot</h3>
              <p>
                Users can ask study-related questions and get assistance
                when they have doubts.
              </p>
            </div>

            <div className="feature-card">
              <h3>👤 Profile</h3>
              <p>
                Users can view their profile and account-related
                information.
              </p>
            </div>

            <div className="feature-card">
              <h3>⏱️ SetTime</h3>
              <p>
                Students can set a study timer to manage their study
                sessions.
              </p>
            </div>

            <div className="feature-card">
              <h3>📚 All Notes</h3>
              <p>
                Users can browse and access previously available academic
                notes.
              </p>
            </div>

            <div className="feature-card">
              <h3>ℹ️ About</h3>
              <p>
                Provides information about Virtual Room, its purpose,
                technologies, development and upcoming improvements.
              </p>
            </div>

            <div className="feature-card">
              <h3>🚪 Logout</h3>
              <p>
                Allows users to securely sign out of their account.
              </p>
            </div>

          </div>
        </section>


        {/* ================= TECHNOLOGIES ================= */}
        <section className="about-content">
          <h2>💻 Technologies Used</h2>

          <p>
            Virtual Room has been developed using modern web technologies:
          </p>

         
        </section>


        {/* ================= UPCOMING FEATURES ================= */}
        <section className="about-content upcoming-section">
          <h2>🚀 Upcoming Features & Improvements</h2>

          <p>
            Based on user feedback, the following improvements are being
            worked on:
          </p>

          <ul>
            <li>⚡ Improve website speed and performance</li>
            <li>🤖 Improve Eco Chatbot responses and response time</li>
            <li>📄 Improve PDF viewing and loading</li>
            <li>🎨 Improve UI design, spacing and creativity</li>
            <li>🔐 Add logout confirmation</li>
            <li>📚 Improve notes experience</li>
            <li>📱 Improve mobile responsiveness</li>
            <li>✨ Add more student-focused features</li>
          </ul>
        </section>


        {/* ================= USER FEEDBACK ================= */}
        <section className="about-content feedback-section">
          <h2>📝 User Feedback & Improvements</h2>

          <p>
            We are continuously improving Virtual Room based on real user
            feedback and suggestions.
          </p>
             <div className="feedback-table-wrapper">
            <table className="feedback-table">
    <thead>
      <tr>
        <th>User Name :</th> <br>
        <th>Problem / Feedback :</th> <br>
        <th>Completed</th>
      </tr>
    </thead>
     </table> </div>
        


          {/* IMPROVEMENT PROGRESS */}
          <div className="improvement-progress">
            <h3>📊 Improvement Progress</h3>

            <p>
              <strong>Total Feedback Points:</strong> 10
            </p>

            <p>
              <strong>Completed:</strong> 3 ✅
            </p>

            <p>
              <strong>In Progress:</strong> 7 🔄
            </p>

            <p>
              <strong>Current Progress:</strong> 30%
            </p>

            <p>
              Feedback is reviewed and improvements are implemented
              step by step.
            </p>
          </div>
        </section>


        {/* ================= FEEDBACK & SUPPORT ================= */}
        <section className="about-content feedback-support">
          <h2>📩 Feedback & Support</h2>

          <p>
            Agar aapko <strong>Virtual Room</strong> me koi{" "}
            <strong>problem, bug, broken feature</strong> mile ya aap koi{" "}
            <strong>new improvement/feature</strong> suggest karna
            chahte hain, to hume email karein.
          </p>

          <div className="feedback-email-box">

            <p>
              📧 <strong>Email:</strong>{" "}
              <a href="mailto:anktiwari@sritgroup.net">
                your-anktiwari@sritgroup.net
              </a>
            </p>

            <a
              href="mailto:anktiwari@sritgroup.net?subject=Virtual Room Feedback&body=Hello, I would like to report a problem or suggest an improvement.%0A%0AProblem / Suggestion:%0A"
              className="feedback-email-btn"
            >
              📩 Send Feedback
            </a>

          </div>
        </section>


        {/* ================= DEVELOPER ================= */}
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
                <strong>Computer Science Engineering Student</strong>
              </p>

              <p>
                <strong>
                  Shri Ram Institute of Technology, Jabalpur
                </strong>
              </p>

              <p>
                Virtual Room is developed as a full-stack web development
                project with a focus on creating a useful and simple
                digital learning environment for students.
              </p>

             

              <h4>🔗 Connect</h4>

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


        {/* ================= OUR GOAL ================= */}
        <section className="about-content">
          <h2>🌟 Our Goal</h2>

          <p>
            The goal of Virtual Room is to continuously improve through{" "}
            <strong>real user feedback</strong> and provide students
            with a better, simpler and more useful learning experience.
          </p>
        </section>


        {/* ================= FOOTER ================= */}
        <footer className="about-footer">
          © 2026 Virtual Room System | Developed by{" "}
          <strong>ApexSoft Technologies</strong>
        </footer>

      </div>
    </>
  );
};

export default About;
