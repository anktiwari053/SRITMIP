import React from 'react'
import './Nots.css'

function FilterSection({
  availableSemesters,
  availableSubjects,
  selectedSemester,
  selectedSubject,
  onSemesterChange,
  onSubjectChange,
  onClearFilters
}) {
  return (
    <div className="filter-section">
      <h2>Filter Notes</h2>
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="semester">Semester:</label>
          <select
            id="semester"
            value={selectedSemester}
            onChange={(e) => onSemesterChange(e.target.value)}
          >
            <option value="">All Semesters</option>
            {availableSemesters.map(sem => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="subject">Subject:</label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
          >
            <option value="">All Subjects</option>
            {availableSubjects.map(subject => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <button className="clear-btn" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  )
}

export default FilterSection

