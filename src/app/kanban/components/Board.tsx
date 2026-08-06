"use client";
import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "@/app/kanban/components/Column";
import { initialBoard } from "@/app/kanban/data";
import { BoardState } from "@/app/kanban/types";

const Board = () => {
     const [board, setBoard] = useState(initialBoard);    

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if(!over) return;

        const sourceId = active.data.current?.columnId;
        const destinationId = over.id as string;

        if(sourceId === destinationId) return;

        const taskId = active.id as string;

        setBoard((prev : BoardState) => {
            const source = prev.columns[sourceId];
            const destination = prev.columns[destinationId];

            return {
                ...prev,
                columns: {
                    ...prev.columns,
                    [sourceId] : {
                        ...source,
                        taskIds: source.taskIds.filter(((id) => id !== taskId))
                    },
                    [destinationId] : {
                        ...destination,
                        taskIds: [...destination.taskIds, taskId],
                    },
                },
            }
        })
    }

  return (
    <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6">
            {board.columnOrder.map((columnId) => (
                <Column
                    key={columnId}
                    column={board.columns[columnId]}
                    tasks={board.tasks}
                />
            ))}
        </div>
    </DndContext>
  )
}

export default Board;
