import {DocumentEntity} from "../types/document";
import {v4 as uuid} from 'uuid';
import {ValidationError} from "../utils/errors";

interface NewDocumentEntity extends Omit<DocumentEntity, 'id' | 'creationDate'> {
    id?: string;
    creationDate?: Date;
}

export class DocumentRecord implements DocumentEntity {
    id: string;
    title: string;
    content: string;
    creationDate: Date;
    creationUser: string;
    modificationDate: Date;
    modificationUser: string;

    constructor(obj: NewDocumentEntity) {
        if(!obj.id) {
            this.id = uuid();
        }
        if(!obj.title || obj.title.length > 100) {
            throw new ValidationError('Title is required and must be less than 100 characters');
        }
        if(!obj.content) {
            throw new ValidationError('Content is required');
        }
        this.title = obj.title;
        this.content = obj.content;
        this.creationDate = obj.creationDate || new Date();
        this.creationUser = obj.creationUser;
        this.modificationDate = obj.modificationDate || new Date();
        this.modificationUser = obj.modificationUser;

    }

}