import React, { useEffect } from 'react'
import NoteCard from './NoteCard'
import './Nots.css'
import './NotesList.css'

function NotesList({ notes }) {
  // 🔍 STEP 1: Debug - Check if notes prop is correctly passed
  useEffect(() => {
    console.log('🔍 [NotesList Debug] Component rendered')
    console.log('🔍 [NotesList Debug] Notes prop received:', notes)
    console.log('🔍 [NotesList Debug] Notes type:', typeof notes)
    console.log('🔍 [NotesList Debug] Is notes an array?', Array.isArray(notes))
    console.log('🔍 [NotesList Debug] Notes value:', JSON.stringify(notes, null, 2))
    
    if (notes === undefined) {
      console.error('❌ [NotesList Error] Notes prop is UNDEFINED!')
    } else if (notes === null) {
      console.error('❌ [NotesList Error] Notes prop is NULL!')
    } else if (!Array.isArray(notes)) {
      console.error('❌ [NotesList Error] Notes prop is NOT an array! Type:', typeof notes)
    } else {
      console.log('✅ [NotesList Debug] Notes is a valid array with length:', notes.length)
    }
  }, [notes])

  const handleViewPDF = (pdfPath) => {
    console.log('🔍 [NotesList Debug] handleViewPDF called with:', pdfPath)
    if (!pdfPath) {
      console.warn('⚠️ [NotesList Warning] PDF path is missing')
      alert('PDF file not available')
      return
    }
    window.open(pdfPath, '_blank')
  }

  const handleDownloadPDF = (pdfPath, title) => {
    console.log('🔍 [NotesList Debug] handleDownloadPDF called with:', { pdfPath, title })
    if (!pdfPath) {
      console.warn('⚠️ [NotesList Warning] PDF path is missing for download')
      alert('PDF file not available')
      return
    }
    
    try {
      const link = document.createElement('a')
      link.href = pdfPath
      link.download = title ? `${title}.pdf` : pdfPath.split('/').pop() || 'note.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('❌ [NotesList Error] Download error:', error)
      alert('Download initiated. If it doesn\'t start, the PDF will open in a new tab.')
      window.open(pdfPath, '_blank')
    }
  }

  // 🔍 STEP 2: Safe check - Handle undefined, null, or non-array values
  if (notes === undefined || notes === null) {
    console.warn('⚠️ [NotesList Warning] Notes is undefined or null, showing fallback UI')
    return (
      <div className="notes-section">
        <div className="notes-header">
          <h2 id="notes-count">Loading Notes...</h2>
        </div>
        <div className="no-notes-message">
          <p>Please wait while notes are being loaded...</p>
        </div>
      </div>
    )
  }

  // 🔍 STEP 3: Check if notes is an array
  if (!Array.isArray(notes)) {
    console.error('❌ [NotesList Error] Notes is not an array! Type:', typeof notes)
    return (
      <div className="notes-section">
        <div className="notes-header">
          <h2 id="notes-count">Error Loading Notes</h2>
        </div>
        <div className="no-notes-message">
          <p>There was an error loading notes. Please refresh the page.</p>
          <p style={{ fontSize: '0.8rem', color: 'red' }}>
            Debug: Notes type is {typeof notes}
          </p>
        </div>
      </div>
    )
  }

  // 🔍 STEP 4: Handle empty array
  if (notes.length === 0) {
    console.log('ℹ️ [NotesList Info] Notes array is empty')
    return (
      <div className="notes-section">
        <div className="notes-header">
          <h2 id="notes-count">No Notes Found</h2>
        </div>
        <div className="no-notes-message">
          <p>No notes found matching your filters.</p>
        </div>
      </div>
    )
  }

  // 🔍 STEP 5: Render notes with error boundary for each card
  console.log('✅ [NotesList Debug] Rendering', notes.length, 'notes')
  
  return (
    <div className="notes-section">
      <div className="notes-header">
        <h2 id="notes-count">
          {notes.length} {notes.length === 1 ? 'Note' : 'Notes'} Found
        </h2>
      </div>
      <div className="notes-grid">
        {notes.map((note, index) => {
          // 🔍 STEP 6: Validate each note before rendering
          if (!note) {
            console.error(`❌ [NotesList Error] Note at index ${index} is null or undefined`)
            return (
              <div key={`error-${index}`} style={{ 
                padding: '1rem', 
                border: '2px solid red', 
                borderRadius: '8px',
                backgroundColor: '#ffe6e6'
              }}>
                <p style={{ color: 'red' }}>Error: Invalid note at position {index + 1}</p>
              </div>
            )
          }

          console.log(`🔍 [NotesList Debug] Rendering note ${index}:`, {
            title: note.title,
            semester: note.semester,
            subject: note.subject,
            hasPDF: !!note.pdf
          })

          return (
            <NoteCard
              key={`${note.semester || 'unknown'}-${note.subject || 'unknown'}-${index}`}
              note={note}
              index={index}
              onViewPDF={handleViewPDF}
              onDownloadPDF={handleDownloadPDF}
            />
          )
        })}
      </div>
    </div>
  )
}

export default NotesList

