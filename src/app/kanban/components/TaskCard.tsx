import { useDraggable } from "@dnd-kit/core";
import { Todo } from "../types";
import { CSS } from "@dnd-kit/utilities";


interface Props {
    task: Todo;
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
