import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import uuid from "react-uuid";

function App() {
	const [notes, setNotes] = useState(
		JSON.parse(localStorage.getItem("notes")) || []
	);
	const [activeNote, setActiveNote] = useState(false);

	useEffect(() => {
		//notesを更新するたびに、useEffectのcallback関数が発火する
		//ローカルストレージにノートを保存する
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	useEffect(() => {
		setActiveNote(notes[0].id);
	}, []);

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
