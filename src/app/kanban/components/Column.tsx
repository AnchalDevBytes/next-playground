"use client";
import { useDroppable } from '@dnd-kit/core';
import { ColumnType } from '../types';
import TaskCard from './TaskCard';

interface Props {
    column: ColumnType;
}

const Column = ({
    column
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

        {column.tasks.map((task) => (
            <TaskCard
                key={task?.id}
                task={task}
                columnId={column.id}
            />
        ))}
    </div>
  )
}

export default Column;
