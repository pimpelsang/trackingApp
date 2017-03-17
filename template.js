const Handlebars = require('handlebars');
const promisify = require("es6-promisify");
const fs = require('fs');

exports.render = function*(name, data) {
    const templateFile = `./template/${name}.html`;
    const templateHTML = yield promisify(fs.readFile)(templateFile, 'utf8');

    const template = Handlebars.compile(templateHTML);
    return template(data)
};