import React from 'react'
import "./Theme.css";

const Theme = () => {
  return (
    <div className="navbar-group toggles-group">
        <button 
          className={`toggle-btn theme-toggle`}
        >
          Theme
        </button>
  )
}

export default Theme;