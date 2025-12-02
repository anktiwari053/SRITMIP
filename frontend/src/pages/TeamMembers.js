// About.js
import React from "react";
import "./About.css"; // CSS file
import premImg from "./img/linkdin.jpg";
import Navbar from '../components/Navbar';
import premImg1 from "./img/Anshika1.jpg";

const teamMembers = [
  {
    name: "Ank Tiwari",
    Role: "Backend Developer",
    roll: "0205CS231026",
    college: "SRIT College",
    email: "premtiwar704@gmail.com",
    img: premImg,
    experience:"Backend development including REST API creation, user authentication, data management, and server-side logic using Node.js and Express.",
  },
  {
    name: "Anshika Prajapati",
    Role: "Frontend Developer",
    roll: "0205CS231027",
    college: "SRIT College",
    email: "anshikaprajapati110405@gmail.com ",
    img: premImg1,
    experience:"",

  },
  {
    name: "Akanksha Patel",
    
    Role: "UI/UX Designer",
    roll: "0205CS231015",
    college: "SRIT College",
    email: "ajay@example.com",
    img: "https://via.placeholder.com/120",
    experience:"",
  },
  {
    name: "Avanshika Soni",
   Role: " Developer",
    roll: "0205CS231034",
    college: "SRIT College",
    email: "avanshikasonisoni@gmail.com",
    img: "https://via.placeholder.com/120",
    experience:"",
  },
   {
    name: "Amisha Vishkarma",
   Role: " Developer",
    roll: "0205CS231019",
    college: "SRIT College",
    email: "30amishasharma@gmail.com",
    img: "https://via.placeholder.com/120",
    experience:"",
  },
];

const About = () => {
  return (
    
    <div className="about-container">
       <Navbar />
      <h1> Team</h1>
       <p
        style={{
          fontSize: "18px",
          marginBottom: "40px",
          color: "#333",
          lineHeight: "1.6",
           
        }}
      >
        Meet our talented team members and learn about their roles in this project.
      </p>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div className="member-card" key={index}>
            <img src={member.img} alt={member.name} />
            <div className="member-info">
              <h3>{member.name}</h3>
              <p>Role: {member.Role}</p>
              <p>Roll No: {member.roll}</p>
              <p>College: {member.college}</p>
              <p>Email: {member.email}</p>
               <p>Experience: {member. experience}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
