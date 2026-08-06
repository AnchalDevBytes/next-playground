import { BoardState } from "@/app/kanban/types";

export const initialBoard : BoardState = {
    tasks: {
        "1" : {
            id: "1",
            title: "Learn React",
        },
        "2": {
            id: "2",
            title: "Learn TypeScript",
        },
        "3": {
            id: "3",
            title: "Build Kanban",
        },
    },

    columns: {
        todo: {
            id: "todo",
            title: "Todo",
            taskIds: ["1", "2"],
        },
        progress: {
            id: "progress",
            title: "In Progress",
            taskIds: ["3"],
        },

        done: {
            id: "done",
            title: "Done",
            taskIds: [],
        }
    }, 

    columnOrder: ["todo", "progress", "done"],
}
