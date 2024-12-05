const fs = require('fs');

function readEnvFile() {
    try {
        const content = fs.readFileSync('./.env', 'utf8');
        return content.replace(/\r\n/g, '\n').trim();
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error('.env not found.')
            return '';
        }
        throw error;
    }
}

function update(config, value) {
    let envcontent = readEnvFile();
    const regex = new RegExp(`^${config}=.*`, 'm');
    if (regex.test(envcontent)) {
        envcontent = envcontent.replace(regex, `${config}=${value}`);
        console.log(`Updated.`);
    } else {
        envcontent += `\n${config}=${value}`;
        console.log(`Added.`)
    }
    fs.writeFileSync('./.env', envcontent.trim() + '\n', 'utf8');
    console.log('Successfully update environment variables.');
}

module.exports = {
    update,
}