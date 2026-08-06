"use client";
import { useDroppable } from '@dnd-kit/core';
import { Column as ColumnType, Task } from '@/app/kanban/types';
import TaskCard from '@/app/kanban/components/TaskCard';

interface Props {
    column: ColumnType;
    tasks: Record<string, Task>;
}

const Column = ({
    column,
    tasks
} : Props) => {

    const { setNodeRef } = useDroppable({
        id: column.id
    });

  return (
    <div 
        ref={setNodeRef}
        className='border rounded p-4 h-[80vh] min-w-sm max-w-sm flex flex-col gap-5'
    >
        <h2 className='text-xl font-bold mb-4'>{column.title}</h2>

        {column.taskIds.map((taskId) => (
            <TaskCard
                key={taskId}
                task={tasks[taskId]}
                columnId={column.id}
            />
        ))}
    </div>
  )
}

export default Column;
