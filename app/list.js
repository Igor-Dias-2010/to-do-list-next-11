"use client"

import { useState, useEffect } from 'react'

export default function List() {
    const [tasks, setTasks] = useState([])
    const [input, setInput] = useState("")
    const [error, setError] = useState("")
    const [editingIndex, setEditingIndex] = useState(null)

    const handleInputChange = e => setInput(e.target.value)
    const handleEnterToAdd = e => { if (e.key === 'Enter') add() }

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("tasks"))
            if (Array.isArray(saved)) {
                setTasks(saved)
            } else {
                setTasks([])
            }
        } catch {
            setTasks([])
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    function add() {
        if (input.trim() === "") {
            setError("Please, fill in this filter")

            setTimeout(() => setError(""), 3000)
            return
        }

        if (editingIndex !== null) {
            const updated = [...tasks]
            updated[editingIndex] = input
            setTasks(updated)
            setEditingIndex(null)
        } else {
            setTasks([...tasks, input])
        }

        setInput("")

    }


    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index))
    }

    function editTask(index) {
        setInput(tasks[index])
        setEditingIndex(index)
    }
    return (
        <div>
            <h1>To-do list</h1>
            {error && <p>{error}</p>}
            <input type="text" placeholder='Type a task' value={input} onChange={handleInputChange} onKeyDown={handleEnterToAdd} />
            <button onClick={add}>{editingIndex !== null ? "Save" : "Add"}</button>

            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}{""}
                        <button onClick={() => editTask(index)}>Edit</button>
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}