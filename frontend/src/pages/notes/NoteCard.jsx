import React, { useEffect } from 'react'
import './Nots.css'

function NoteCard({ note, index, onViewPDF, onDownloadPDF }) {
  // 🔍 STEP 2: Debug - Check if note prop is valid
  useEffect(() => {
    console.log(`🔍 [NoteCard Debug] Card ${index} rendered`)
    console.log(`🔍 [NoteCard Debug] Card ${index} note prop:`, note)
    
    if (!note) {
      console.error(`❌ [NoteCard Error] Card ${index} - Note prop is missing!`)
      return
    }

    // Check each required field
    if (!note.title) {
      console.warn(`⚠️ [NoteCard Warning] Card ${index} - Title is missing`)
    }
    if (!note.semester) {
      console.warn(`⚠️ [NoteCard Warning] Card ${index} - Semester is missing`)
    }
    if (!note.subject) {
      console.warn(`⚠️ [NoteCard Warning] Card ${index} - Subject is missing`)
    }
    if (!note.pdf) {
      console.warn(`⚠️ [NoteCard Warning] Card ${index} - PDF path is missing`)
    }
  }, [note, index])

  // 🔍 Safe fallback if note is missing
  if (!note) {
    console.error(`❌ [NoteCard Error] Note is null/undefined for card ${index}`)
    return (
      <div className="note-card" style={{ 
        border: '2px solid red',
        backgroundColor: '#ffe6e6',
        animationDelay: `${index * 0.05}s` 
      }}>
        <div className="note-title" style={{ color: 'red' }}>
          Error: Invalid Note Data
        </div>
        <div className="note-meta">
          <p style={{ color: 'red', fontSize: '0.9rem' }}>
            This note card could not be displayed due to missing data.
          </p>
        </div>
      </div>
    )
  }

  // 🔍 Safe values with fallbacks
  const safeTitle = note.title || 'Untitled Note'
  const safeSemester = note.semester || 'N/A'
  const safeSubject = note.subject || 'N/A'
  const safePDF = note.pdf || null

  return (
    <div className="note-card" style={{ animationDelay: `${index * 0.05}s` }}>
      <div className="note-title">{safeTitle}</div>
      <div className="note-meta">
        <div className="meta-item">
          <strong>Semester:</strong>
          <span className="meta-badge badge-semester">{safeSemester}</span>
        </div>
        <div className="meta-item">
          <strong>Subject:</strong>
          <span className="meta-badge badge-subject">{safeSubject}</span>
        </div>
      </div>
      <div className="note-actions">
        <button
          className="action-btn btn-view"
          onClick={() => {
            console.log(`🔍 [NoteCard Debug] View PDF clicked for card ${index}`)
            if (onViewPDF) {
              onViewPDF(safePDF)
            } else {
              console.error(`❌ [NoteCard Error] onViewPDF handler is missing`)
            }
          }}
          disabled={!safePDF}
          style={{ opacity: !safePDF ? 0.5 : 1, cursor: !safePDF ? 'not-allowed' : 'pointer' }}
        >
          <span>👁️</span> View PDF
        </button>
       {/* <button
          className="action-btn btn-download"
          onClick={() => {
            console.log(`🔍 [NoteCard Debug] Download clicked for card ${index}`)
            if (onDownloadPDF) {
              onDownloadPDF(safePDF, safeTitle)
            } else {
              console.error(`❌ [NoteCard Error] onDownloadPDF handler is missing`)
            }
          }}
          disabled={!safePDF}
          style={{ opacity: !safePDF ? 0.5 : 1, cursor: !safePDF ? 'not-allowed' : 'pointer' }}
        >
          <span>⬇️</span> Download
        </button>
*/}
      </div>
    </div>
  )
}

export default NoteCard

