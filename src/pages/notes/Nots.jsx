import React, { useState, useEffect } from 'react'
import './Nots.css'
import NotesList from './NotesList'
import FilterSection from './FilterSection'
import { notesData } from './notesData'
import Navbar from '../../components/Navbar.js'

function App() {
  const [filteredNotes, setFilteredNotes] = useState(notesData)
  const [selectedSemester, setSelectedSemester] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [availableSubjects, setAvailableSubjects] = useState([])
  const [availableSemesters, setAvailableSemesters] = useState([])

  // Initialize available semesters and subjects
  useEffect(() => {
    const semesters = [...new Set(notesData.map(note => note.semester))].sort()
    setAvailableSemesters(semesters)
    
    const subjects = [...new Set(notesData.map(note => note.subject))].sort()
    setAvailableSubjects(subjects)
  }, [])

  // Update available subjects based on selected semester
  useEffect(() => {
    if (selectedSemester) {
      const subjects = [...new Set(
        notesData
          .filter(note => note.semester === selectedSemester)
          .map(note => note.subject)
      )].sort()
      setAvailableSubjects(subjects)
      // Reset subject if it's not available in the selected semester
      if (selectedSubject && !subjects.includes(selectedSubject)) {
        setSelectedSubject('')
      }
    } else {
      const allSubjects = [...new Set(notesData.map(note => note.subject))].sort()
      setAvailableSubjects(allSubjects)
    }
  }, [selectedSemester])

  // Filter notes based on selected criteria
  useEffect(() => {
    const filtered = notesData.filter(note => {
      const semesterMatch = !selectedSemester || note.semester === selectedSemester
      const subjectMatch = !selectedSubject || note.subject === selectedSubject
      return semesterMatch && subjectMatch
    })
    setFilteredNotes(filtered)
  }, [selectedSemester, selectedSubject])

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester)
  }

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject)
  }

  const handleClearFilters = () => {
    setSelectedSemester('')
    setSelectedSubject('')
  }

  return (
    <>
      <Navbar/>
     
   
      <header>
        <h1>📚 Academic Notes</h1>
        <p className="subtitle">Your centralized platform for accessing all semester notes</p>
      </header>

      <FilterSection
        availableSemesters={availableSemesters}
        availableSubjects={availableSubjects}
        selectedSemester={selectedSemester}
        selectedSubject={selectedSubject}
        onSemesterChange={handleSemesterChange}
        onSubjectChange={handleSubjectChange}
        onClearFilters={handleClearFilters}
      />

      <NotesList notes={filteredNotes} />
    
    </>
  )
}

export default App

