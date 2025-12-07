// About.js
import React from "react";
import "./About.css"; // CSS file
import premImg from "./img/linkdin.jpg";
import Navbar from '../components/Navbar';
import premImg1 from "./img/Anshika1.jpg";
import premImg2 from "./img/Akanksha.jpg";
import premImg3 from "./img/team1.jpg";
import premImg4 from "./img/team2.jpg";

const teamMembers = [
  {
    name: "Ank Tiwari",
    Role: "Backend DevelopeR",
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
    experience:"Gained practical experience in building responsive web interfaces using HTML, CSS, JavaScript, and modern UI frameworks.",

  },
  {
    name: "Akanksha Patel",
    
    Role: "UI/UX Designer",
    roll: "0205CS231015",
    college: "SRIT College",
    email: "akankshapatel9997@gmail.com",
    img: premImg2,
    experience:"Gained hands-on experience in user research, wireframing, and designing intuitive interfaces using modern UI tools.",
  },
   {
    name: "Avanshika Soni",
    
    Role: "UI/UX Designer",
    roll: "0205CS231034",
    college: "SRIT College",
    email: "avanshikasonisoni@gmail.com",
    img: premImg3,
    experience:"Gained hands-on experience in user research, wireframing, and designing intuitive interfaces using modern UX tools.",
  },
   {
    name: "Amisha Vishwakarma",
    
    Role: "Frontend Developer",
    roll: "0205CS231019",
    college: "SRIT College",
    email: "30amishasharma@gmail.com",
    img: premImg4,
    experience:"Gained practical experience in building responsive web interfaces using React.js and modern UI frameworks.",
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
