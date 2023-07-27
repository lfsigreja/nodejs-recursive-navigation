const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, '.');

function isDirectory(p) {
    return fs.lstatSync(p).isDirectory()
}

const rhObject = `string`
function readdir(dirpath) {
    fs.readdir(dirpath, function (err, itens) {
        if (err) {
            console.log('Unable to scan directory: ' + err);
            return;
        }

        itens.forEach(function (item) {
            let path = `${dirpath}/${item}`;

            if (!path.includes("i18n")) {
                return
            }

            if(isDirectory(path)) {
                console.log(`[INFO] IS DIRECTORY: ${path}`);
                readdir(path);
                return
            }

            if (!path.includes("_posts")) return

            console.log(`[INFO] IS FILE: ${path}`);

            let buffer = fs.readFileSync(path);
            let content = buffer.toString('utf-8');
            let text = '';

            text = content.replace(/(regex:)/g, `${rhObject} \regex:`);

            fs.writeFileSync(path, text, 'utf-8');
        });
    });
}

readdir(directoryPath);
