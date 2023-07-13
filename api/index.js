const express = require('express')
require('dotenv').config();
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 3000;

// Configurar body-parser como middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', async function (req, res) {
    const { url } = req.body;

    let ret = 'Debe enviar una url valida';

    if (url) {
        ret = await videoDownloadLink(url);
    }

    res.send({ ret });
});

app.post('/api', async (req, res) => {

    const { url } = req.body;

    let ret = 'Debe enviar una url valida';

    if (url) {
        ret = await videoDownloadLink(url);
    }

    res.send({ ret });
})

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: "${port}"`);
});


async function videoDownloadLink(url) {


    return url;
}
