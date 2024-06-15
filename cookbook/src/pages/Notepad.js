import React, { useState } from "react";
import Navbar2 from "./NavBar2";
import Footer from "./Footer";
import "../styles/notepad.css";

function Notepad() {
  const [note, setNote] = useState(""); // State to store the note text

  const handleChange = (event) => {
    // Update the note state when the input changes
    setNote(event.target.value);
  };

  const handleSave = () => {
    // Implement save functionality here, for example, you could send the note to a server or store it locally
    console.log("Note saved:", note);
    // Clear the note after saving if needed
    setNote("");
  };

  return (
    <>
      <Navbar2></Navbar2>
      <div className="notes">
        <h1 id="noteheader">Notes</h1>
        <textarea
          value={note}
          onChange={handleChange}
          placeholder="Write your notes here..."
          rows={30}
          cols={100}
        />
        <br />
        <button id="SaveButton" onClick={handleSave}>
        <i className="fas fa-save"></i> Save Note
</button>

      </div>
      <Footer></Footer>
    </>
  );
}

export default Notepad;
