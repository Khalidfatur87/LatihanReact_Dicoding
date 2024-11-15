import React, { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";
import { getInitialData, showFormattedDate } from "./utils"; // Mengimpor getInitialData dan showFormattedDate
import "./styles.css"; // Mengimpor stylesheet

const App = () => {
  // Menggunakan getInitialData untuk mendapatkan data awal
  const [notes, setNotes] = useState(getInitialData());
  const [searchTerm, setSearchTerm] = useState("");

  // Menambahkan catatan baru
  const addNote = (note) => {
    const newNote = {
      ...note,
      id: +new Date(), // Menetapkan ID unik menggunakan timestamp
      createdAt: new Date().toISOString(), // Menetapkan tanggal saat catatan dibuat
    };
    setNotes([...notes, newNote]);
  };

  // Menghapus catatan
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Mengarsipkan atau mengembalikan catatan dari arsip
  const toggleArchive = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  // Catatan yang diarsipkan
  const archivedNotes = notes.filter((note) => note.archived);

  // Catatan aktif (tidak diarsipkan) dan difilter berdasarkan pencarian
  const displayedNotes = notes.filter(
    (note) =>
      !note.archived &&
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Aplikasi Catatan Pribadi</h1>
      {/* SearchBar untuk mencari catatan */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Form untuk menambahkan catatan baru */}
      <NoteForm addNote={addNote} />
      <h2>Catatan Aktif</h2>
      {displayedNotes.length === 0 ? (
        <p>Tidak ada catatan</p>
      ) : (
        <NoteList
          notes={displayedNotes}
          deleteNote={deleteNote}
          toggleArchive={toggleArchive} // Mengarsipkan catatan
          showFormattedDate={showFormattedDate} // Menampilkan tanggal yang diformat
        />
      )}
      <h2>Catatan Diarsipkan</h2>
      {archivedNotes.length === 0 ? (
        <p>Tidak ada catatan diarsipkan</p>
      ) : (
        <NoteList
          notes={archivedNotes}
          deleteNote={deleteNote}
          toggleArchive={toggleArchive} // Mengembalikan catatan dari arsip
          showFormattedDate={showFormattedDate} // Menampilkan tanggal yang diformat
        />
      )}
      <div className="footer">© 2024 Khalid Fatur Rahman</div>
    </div>
  );
};

export default App;
