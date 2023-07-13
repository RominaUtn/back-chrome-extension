const express = require('express')
require('dotenv').config();
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 3000;

// Configurar body-parser como middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api',async function (req, res) {
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

    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();

    // Emula un dispositivo móvil
    const mobileDevice = puppeteer.devices['iPhone X'];

    console.log(mobileDevice);

    await page.emulate(mobileDevice);

    // Navega a la página en versión móvil
    await page.goto(url);

    // Espera a que la etiqueta <video> esté disponible
    await page.waitForSelector('video');

    // Obtiene el valor del atributo src de la etiqueta <video>
    const videoSrc = await page.$eval('video', (element) => element.src);

    // Descarga el video utilizando el enlace obtenido
    // Aquí puedes implementar la lógica de descarga según tus necesidades

    await browser.close();

    return videoSrc;
}
