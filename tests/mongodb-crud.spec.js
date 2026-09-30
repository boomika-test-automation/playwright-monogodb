const { test, expect } = require('@playwright/test');
const { getMongoDB, closeMongoDB } = require('../utils/mongodb');

test('MongoDB CRUD Operations', async ({ page }) => {

    // Open Chrome
    await page.goto('about:blank');

    const db = await getMongoDB();
    const students = db.collection('Students');

    // CREATE
    const insertResult = await students.insertOne({
        name: 'TestUser',
        age: 25,
        course: 'Playwright',
        experience: 3,
        city: 'Chennai'
    });

    expect(insertResult.acknowledged).toBeTruthy();

    console.log('CREATE: Student inserted');
    console.log('Inserted ID:', insertResult.insertedId.toString());

    // READ
    let student = await students.findOne({
        _id: insertResult.insertedId
    });

    expect(student).not.toBeNull();
    expect(student.name).toBe('TestUser');
    expect(student.course).toBe('Playwright');

    console.log('READ: Student found');
    console.log(student);

    // UPDATE
    const updateResult = await students.updateOne(
        {
            _id: insertResult.insertedId
        },
        {
            $set: {
                experience: 4
            }
        }
    );

    expect(updateResult.matchedCount).toBe(1);
    expect(updateResult.modifiedCount).toBe(1);

    console.log('UPDATE: Experience changed from 3 to 4');

    // READ after UPDATE
    student = await students.findOne({
        _id: insertResult.insertedId
    });

    expect(student.experience).toBe(4);

    console.log('READ after UPDATE:');
    console.log(student);


    // DELETE
    const deleteResult = await students.deleteOne({
        _id: insertResult.insertedId
    });

    expect(deleteResult.deletedCount).toBe(1);

    console.log('DELETE: Student deleted');

    // READ after DELETE
    student = await students.findOne({
        _id: insertResult.insertedId
    });

    expect(student).toBeNull();


    console.log('MongoDB CRUD test completed');

    await closeMongoDB();
});