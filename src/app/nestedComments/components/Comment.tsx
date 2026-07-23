import { useState } from "react";
import { CommentType } from "../page";

interface CommentItemProps {
  comment: CommentType;
  addReply: ({parentId, text} : {parentId: number, text: string}) => void;
}

const Comment = ( { comment, addReply }: CommentItemProps ) => {
    const [showReply, setShowReply] = useState(false);
    const [text, setText] = useState("");

  return (
    <div className="ml-5 border-l-2 border-gray-300 pl-2">
        <p>{comment.text}</p>

        <button
            onClick={() => setShowReply(!showReply)}
            className="text-xs text-gray-500"
        >
            Reply
        </button>

        {showReply && (
            <div className="flex gap-4">
                <input 
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border border-gray-500 rounded text-white bg-gray-800"
                />

                <button 
                    onClick={() => {
                        addReply({parentId: comment.id, text});
                        setText("");
                        setShowReply(false);
                    }}
                    className="text-sm cursor-pointer"
                >
                    Add 
                </button>
            </div>
        )}

        { comment.children.length > 0 
            && comment.children.map((child : CommentType) => (
                <Comment 
                    key={child.id} 
                    comment={child}
                    addReply={addReply}
                />
        ))}
    </div>
  )
}

export default Comment;
