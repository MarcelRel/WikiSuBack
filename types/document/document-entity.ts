export interface DocumentEntity {
    id: string;
    title: string;
    content: string;
    creationDate: Date;
    creationUser: string;
    modificationDate: Date;
    modificationUser: string;
}