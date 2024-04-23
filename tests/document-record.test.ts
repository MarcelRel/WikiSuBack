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
    category: 'Test category',
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
    // console.log(documentRecord);
});

test('DocumentRecord returns all data from database', async () => {
    const documentRecord = await DocumentRecord.findAll();
    expect(documentRecord).toBeDefined();
    console.log(documentRecord);
});

test('Inserting data into MongoDB database', async () => {

    const documentRecord = new DocumentRecord(defaultDocumentRecord);
    await DocumentRecord.insert(documentRecord);
    const documentRecords = await DocumentRecord.findAll();
    expect(documentRecords).toBeDefined();
    console.log(documentRecords);

});

test('Updating data in MongoDB database', async () => {

    const updatedDocumentRecord = new DocumentRecord({
        ...defaultDocumentRecord,
        title: 'Updated title',
        content: 'Updated content',
        category: 'Updated category',
    });
    await DocumentRecord.update('6627bee400cdbfe433b1ae6b', updatedDocumentRecord);
    const updatedDocumentRecords = await DocumentRecord.getOne('6627bee400cdbfe433b1ae6b');
    expect(updatedDocumentRecords).toBeDefined();
    console.log(updatedDocumentRecords);

});

test('Deleting data in MongoDB database', async () => {

    await DocumentRecord.delete('6627bee400cdbfe433b1ae6b');
    const documentRecords = await DocumentRecord.getOne('6627bee400cdbfe433b1ae6b');
    expect(documentRecords).toBeNull();

});