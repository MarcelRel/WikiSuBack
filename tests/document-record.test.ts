import {DocumentRecord} from "../records/document.record";

let defaultDocumentRecord = {
    title: 'Test',
    content: 'Test content',
    creationUser: 'Test user',
    modificationDate: new Date(),
    modificationUser: 'Test user',
}

test('Can build DocumentRecord', () => {
    const documentRecordTest = new DocumentRecord(defaultDocumentRecord);
    console.log(documentRecordTest)
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