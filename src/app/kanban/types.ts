export interface Task {
    id: string;
    title: string;
}

export interface Column {
    id: string;
    title: string;
    taskIds: string[];
}

export interface BoardState {
    tasks: Record<string, Task>;
    columns: Record<string, Column>;
    columnOrder: string[];
}
