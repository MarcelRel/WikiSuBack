import {DocumentEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {document} from "../utils/db";
import {ObjectId} from "mongodb";

interface NewDocumentEntity extends Omit<DocumentEntity, 'id' | 'creationDate'> {
    creationDate?: Date;
}

export class DocumentRecord implements DocumentEntity {
    title: string;
    content: string;
    creationDate: Date;
    creationUser: string;
    modificationDate: Date;
    modificationUser: string;
    category: string;
    constructor(obj: NewDocumentEntity) {
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
        this.category = obj.category;

    }

    static async getOne(id: string) {
        const item = await document.findOne({_id: new ObjectId(String(id))});
        return item === null ? null: item;
    }

    static async findAll() {
        return await document.find().toArray();
    }

    static async insert(record: DocumentRecord) {
        await document.insertOne(record);
    }

    static async update(id: string, record: DocumentRecord) {
        const documentRecord = await DocumentRecord.getOne(id);
        if(documentRecord === null) {
            throw new ValidationError('Document not found');
        }

        await document.replaceOne({_id: new ObjectId(id)}, {
            ...documentRecord,
            title: String(record.title),
            content: String(record.content),
            category: String(record.category),
            modificationDate: new Date(),
            modificationUser: String(record.modificationUser),

        });
    }

    static async delete(id: string) {
        await document.deleteOne({_id: new ObjectId(id)});
    }


}