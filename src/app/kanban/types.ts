export interface Todo {
    id: string;
    title: string;
}

export interface ColumnType {
    id: string;
    title: string;
    tasks: Todo[];
}
