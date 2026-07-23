"use client";

import { useState } from "react";
import Comment from "@/app/nestedComments/components/Comment";

export interface CommentType {
  id: number;
  text: string;
  children: CommentType[];
}


const initialComments: CommentType[] = [
  {
    id: 1,
    text: "Hello everyone!",
    children: [
      {
        id: 2,
        text: "Hi!",
        children: [
          {
            id: 3,
            text: "Welcome 😊",
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    text: "React is awesome.",
    children: [],
  },
];


const NestedComments = () => {
    const [comments, setComments] = useState(initialComments);

    const insertReply = ({
        comments, 
        parentId, 
        reply
    } : { 
        comments: CommentType[], 
        parentId: number, 
        reply: CommentType 
    }) : CommentType[] => {

        return comments.map((comment : CommentType) => {
            if(comment.id === parentId) {
                return {
                    ...comment,
                    children: [...comment.children, reply]
                };
            }

            return {
                ...comment,
                children: insertReply({
                    comments: comment.children,   
                    parentId,
                    reply
                })
            }
        })
    }

    const addReply = ({parentId, text} : {parentId: number, text: string}) => {
        const reply = {
            id: Date.now(),
            text,
            children: [],
        };

        setComments((prev) => 
            insertReply({
                comments: prev, 
                parentId, 
                reply
            })
        );
    };



  return (
    <div className="flex items-center justify-center min-h-screen">
        <div className="p-10">
            {comments.map((comment) => (
                <Comment 
                    key={comment.id} 
                    comment={comment}
                    addReply={addReply}
                />
            ))}
        </div>

    </div>
  )
}

export default NestedComments;
