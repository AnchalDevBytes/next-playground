"use client";
import { useState } from "react";
import { ColumnType } from "../types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "./Column";

const Board = () => {
     const [columns, setColumns] = useState<ColumnType[]>([
        {
            id: "todo",
            title: "Todo",
            tasks: [
                { id: "1", title: "Learn React" },
                { id: "2", title: "Learn TypeScript" },
            ],
        },
        {
            id: "progress",
            title: "In Progress",
            tasks: [],
        },
        {
            id: "done",
            title: "Done",
            tasks: [],
        },
    ]);

    const moveTask = (
        taskId: string,
        sourceId: string,
        destinationId: string
    ) => {
        if(sourceId === destinationId) return;

        setColumns((prev) => {
            const updated = structuredClone(prev);

            const sourceColumn = updated.find((col) => col.id === sourceId)!;
        
            const destinationColumn = updated.find((col) => col.id === destinationId)!;

            const taskIndex = sourceColumn.tasks.findIndex((task) => task.id === taskId);

            const [task] = sourceColumn.tasks.splice(taskIndex, 1);

            destinationColumn.tasks.push(task);
            return updated;
        });
    }
    

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if(!over) return;

        const sourceId = active.data.current?.columnId;
        const destinationId = over.id;

        moveTask(
            active.id as string,
            sourceId,
            destinationId as string
        );
    }

  return (
    <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6">
            {columns.map((column) => (
                <Column
                    key={column.id}
                    column={column}
                />
            ))}
        </div>
    </DndContext>
  )
}

export default Board;
