export interface EventResponseModel {
    body: Pagination;
    error: boolean;
    shortCode: string;
    message: string;
    description: string;

}

interface Pagination {
    total: number;
    page: number;
    data: Data[];
}

interface Data {
    websiteTitle: string;
    date: Date;
    title: string;
    venue: string;
}