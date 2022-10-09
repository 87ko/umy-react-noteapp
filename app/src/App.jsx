import { useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import uuid from "react-uuid";

function App() {
	const [notes, setNotes] = useState([]);
	const [activeNote, setActiveNote] = useState(false);

	const onAddNote = () => {
		console.log("New Note!");
		const newNote = {
			id: uuid(),
			title: "あたらしいノート",
			content: "",
			modDate: Date.now(),
		};
		setNotes([...notes, newNote]);
		console.log(notes);
	};
	const onDeleteNote = (id) => {
		const filterNotes = notes.filter((note) => note.id !== id);
		setNotes(filterNotes);
	};
	//Active となっているnote Objectを取得する
	const getActiveNote = () => {
		return notes.find((note) => note.id === activeNote);
	};

	const onUpdateNote = (updatedNote) => {
		//修正後Note配列を返す
		const updatedNotesArray = notes.map((note) => {
			if (note.id === updatedNote.id) {
				return updatedNote;
			} else {
				return note;
			}
		});
		setNotes(updatedNotesArray);
	};

	return (
		<div className="App">
			<Sidebar
				onAddNote={onAddNote}
				onDeleteNote={onDeleteNote}
				notes={notes}
				activeNote={activeNote}
				setActiveNote={setActiveNote}
			/>
			<Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
		</div>
	);
}

export default App;
