const database = require('../database/database');

async function maintenance() {
    const [maintenanceData] = await database.query(`
        SELECT content
        FROM maintenance
        ORDER BY date_update DESC
        LIMIT 1
    `);
    return maintenanceData;
}

async function guideline() {
    const [guidelineData] = await database.query(`
        SELECT content
        FROM guideline
        ORDER BY date_update DESC
        LIMIT 1
    `);
    return guidelineData;
}

async function contact() {
    const contactData = await database.query(`
        SELECT content
        FROM contact
        ORDER BY date_update DESC
        LIMIT 1
    `);
    return contactData;
}

module.exports = {
    maintenance,
    guideline,
    contact
}