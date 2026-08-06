import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/app/kanban/types";


interface Props {
    task: Task;
    columnId: string;
}

const TaskCard = ({
    task,
    columnId
}: Props) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform
    } = useDraggable({
        id: task.id,
        data: {
            columnId
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

  return (
    <div 
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="border rounded-lg p-3 cursor-grab shadow"
    >
        {task.title}
    </div>
  )
}

export default TaskCard;
