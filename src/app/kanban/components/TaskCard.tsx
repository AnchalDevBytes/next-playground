import React from 'react'
import { Todo } from '../page';

interface Props {
    task: Todo;
    onMove?: (task: Todo) => void;
}

const TaskCard = ({
    task,
    onMove
}: Props) => {
  return (
    <div className='flex justify-between border p-3 rounded mb-3 w-full'>
        <p>{task.title}</p>

        {onMove && (
            <button
                onClick={() => onMove(task)}
            >
                Move →
            </button>
        )}
    </div>
  )
}

export default TaskCard;
