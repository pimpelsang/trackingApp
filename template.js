const Handlebars = require('handlebars');
const fs = require('fs');

const templateFile = './template/tracking-page.html';
const templateHTML = fs.readFileSync(templateFile, 'utf8');

const template = Handlebars.compile(templateHTML);

exports.render = (data) => template(data);
