import {DocumentRecord} from "../records/document.record";
import {client} from "../utils/db";

afterAll(async () => {
  await client.close();
});

let defaultDocumentRecord = {
    title: 'Test',
    content: 'Test content',
    creationUser: 'Test user',
    modificationDate: new Date(),
    modificationUser: 'Test user',
}

test('Can build DocumentRecord', () => {
    const documentRecordTest = new DocumentRecord(defaultDocumentRecord);
    expect(documentRecordTest.title).toBe('Test');
});

test('DocumentRecord throws error if missing content ', () => {
    expect(() => new DocumentRecord({
        ...defaultDocumentRecord,
        content: '',
    })).toThrow('Content is required');
});

test('DocumentRecord throws error if missing title ', () => {
    expect(() => new DocumentRecord({
        ...defaultDocumentRecord,
        title: '',
    })).toThrow('Title is required and must be less than 100 characters');
});

test('DocumentRecord throws error if title is longer than 100 characters ', () => {
    expect(() => new DocumentRecord({
        ...defaultDocumentRecord,
        title: 'a'.repeat(101),
    })).toThrow('Title is required and must be less than 100 characters');
});

test('DocumentRecord returns data from database for one entry.', async () => {

    const documentRecord = await DocumentRecord.findAll();
    expect(documentRecord).toBeDefined();
});

test('DocumentRecord returns data from database for one entry.', async () => {

    const documentRecord = await DocumentRecord.getOne('6626969e945738679fc7f508');

    expect(documentRecord).toBeDefined();
    console.log(documentRecord);
})