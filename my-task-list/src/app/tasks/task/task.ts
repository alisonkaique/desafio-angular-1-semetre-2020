export interface Task {
    id: number;
    title: string;
    description: string;
    createDate: Date;
    deadLine: Date;
    status: number;
    categoryId: number;
    category: string;
    userId: number;
}
