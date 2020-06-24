var express = require('express');
const bodyParser = require('body-parser');
var app = express();
const Promise = require("bluebird");
const pa = Promise.promisifyAll;
const fs = pa(require("fs"));

const pdf = require("html-pdf");
const ejs = require("ejs");

app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/pdf', async (req, res) => {
    const data = req.body;

    const invoiceTemplate = await fs.readFileAsync("views/sample.ejs");

    const invoiceHtml = await ejs.render(invoiceTemplate.toString(), data);

    fs.writeFileSync("./result.html", invoiceHtml, 'utf8');

    const params = {
        format: 'A4',
        orientation: 'portrait',
        footer: {height: '0'}
    };

    pdf.create(invoiceHtml, params).toFile('./file.pdf', function(err, response) {
        if (err)
            return console.log(err);

        console.log(response);
    });

    res.send(`Your PDF is here: ${__dirname}/file.pdf and ${__dirname}/result.html`);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
