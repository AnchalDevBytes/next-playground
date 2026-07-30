"use client";

import { useState } from "react";
import Column from "./components/Column";

export interface Todo {
    id: number;
    title: string;
}

const Kanban = () => {
    const [input, setInput] = useState("");
    const[columns, setColumns] = useState({
        todo: [] as Todo[],
        progress: [] as Todo[],
        done: [] as Todo[],
    });

    const addTask = () => {
        if(!input.trim()) {
            return;
        }

        const task = {
            id: Date.now(),
            title: input
        };

        setColumns((prev) => ({
            ...prev,
            todo: [...prev.todo, task],
        }));

        setInput("");
    }

    const moveTask = (
        task: Todo,
        from: keyof typeof columns,
        to: keyof typeof columns
    ) => {
        setColumns((prev) => ({
            ...prev,
            [from] : prev[from].filter((t) => t.id !== task.id),
            [to] : [...prev[to], task],
        }));
    };


  return (
    <div className="flex flex-col items-center justify-center p-10">
        <div className="flex gap-3 mb-8">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Task..."
                className="border rounded p-2"
                onKeyDown={(e) => {
                    if(e.key === "Enter") {
                        addTask();
                    }
                }}
            />

            <button
                onClick={addTask}
                className="bg-blue-600 text-white px-4"
            >
                Add 
            </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
            <Column
                title="Todo"
                tasks={columns.todo}
                onMove={(task) => 
                    moveTask(task, "todo", "progress")
                }
            />

            <Column
                title="In Progress"
                tasks={columns.progress}
                onMove={(task) => 
                    moveTask(task, "progress", "done")
                }
            />

            <Column
                title="Done"
                tasks={columns.done}
            />
        </div>

    </div>
  )
}

export default Kanban;
