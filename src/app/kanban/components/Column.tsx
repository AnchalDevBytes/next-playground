import { Todo } from '../page';
import TaskCard from './TaskCard';

interface Props {
    title: string;
    tasks: Todo[];
    onMove?: (task: Todo) => void;
}

const Column = ({
    title,
    tasks,
    onMove,
} : Props) => {
  return (
    <div className='border rounded p-4 h-[80vh] min-w-sm max-w-sm'>
        <h2 className='text-xl font-bold mb-4'>{title}</h2>

        {tasks.map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                onMove={onMove}
            />
        ))}
    </div>
  )
}

export default Column;
