// Notes Data - This can be expanded or loaded from an API
// Note: PDF files should be placed in the public folder or update paths accordingly
import  iwt1 from'./notes/IWT UNIT-1 Notes.pdf'
import  iwt2 from'./notes/IWT UNIT-2 Notes.pdf'
import  iwt3 from'./notes/IWT UNIT-3 Notes.pdf'
import  iwt4 from'./notes/IWT UNIT-4 Notes.pdf'
import  iwt5 from'./notes/iwt.pdf'

import  Toc from'./notes/Toc unit 1,2.pdf'
import  pr from'./notes/PR unit 1&2.pdf'
export const notesData = [
    { 
        semester: "1", 
        subject: "Mathematics", 
        title: "Calculus Fundamentals", 
        pdf: "/Virtual-Room-System (2).pdf" 
    },
    { 
        semester: "1", 
        subject: "Physics", 
        title: "Mechanics and Waves", 
        pdf: "/Virtual-Room-System.pdf" 
    },
    { 
        semester: "1", 
        subject: "Chemistry", 
        title: "Organic Chemistry Basics", 
        pdf: "/Virtual-Room-System (2).pdf" 
    },
    { 
        semester: "2", 
        subject: "Mathematics", 
        title: "Linear Algebra", 
        pdf: "/Virtual-Room-System.pdf" 
    },
    { 
        semester: "2", 
        subject: "Biology", 
        title: "Cell Biology", 
        pdf: "/Virtual-Room-System (2).pdf" 
    },
    { 
        semester: "2", 
        subject: "Computer Science", 
        title: "Data Structures", 
        pdf: "/Virtual-Room-System.pdf" 
    },
    { 
        semester: "3", 
        subject: "Mathematics", 
        title: "Differential Equations", 
        pdf: "/Virtual-Room-System (2).pdf" 
    },
    { 
        semester: "3", 
        subject: "Mathematics", 
        title: "Differential Equations", 
        pdf: "/Virtual-Room-System (2).pdf" 
    },
    { 
        semester: "3", 
        subject: "Physics", 
        title: "Electromagnetism", 
        pdf: "/Virtual-Room-System.pdf" 
    },
    { 
        semester: "5", 
        subject: "Theory of Computation", 
        title: "501 Exam paper -2024", 
        pdf: Toc 
    },
     { 
        semester: "5", 
        subject: "Internet and Web Technology", 
        title: "502- UNIT-1", 
        pdf: iwt1 
    },
     { 
        semester: "5", 
        subject: "Internet and Web Technology", 
        title: "504- UNIT-2", 
        pdf: iwt2 
    },
    
     { 
        semester: "4", 
        subject: "Internet and Web Technology", 
        title: "502- UNIT-3", 
        pdf: iwt3 
    },
     { 
        semester: "5", 
        subject: "Internet and Web Technology", 
        title: "502- UNIT-4", 
        pdf: iwt4 
    },
    { 
        semester: "5", 
        subject: "Internet and Web Technology", 
        title: "502- UNIT-5", 
        pdf: iwt5 
    },
    { 
        semester: "5", 
        subject: "Pattern Recognition", 
        title: "503- UNIT-1,2 Notse", 
        pdf: pr 
    }
];

