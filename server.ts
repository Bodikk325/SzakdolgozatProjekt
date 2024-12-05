import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import { createRequire } from 'node:module';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);
  
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));
  
  
  
  const require = createRequire(import.meta.url);
  const { exec } = require("child_process");
  const cors = require('cors'); 
  server.use(cors());
  server.use(express.json());
 

const { spawn } = require("child_process");

let espruinoProcess: { stdout: { on: (arg0: string, arg1: (data: any) => void) => void; }; stderr: { on: (arg0: string, arg1: (data: any) => void) => void; }; on: (arg0: string, arg1: (code: any) => void) => void; stdin: { writable: any; write: (arg0: string) => void; }; };

function startEspruinoCLI() {
  espruinoProcess = spawn("espruino", [
    "--port", "/dev/tty.usbmodem1102",
    "--no-ble"
  ]);

  espruinoProcess.stdout.on("data", (data: any) => {
    console.log(`Espruino stdout: ${data}`);
  });

  espruinoProcess.stderr.on("data", (data: any) => {
    console.error(`Espruino stderr: ${data}`);
  });

  espruinoProcess.on("close", (code: any) => {
    console.log(`Espruino process exited with code ${code}`);
  });
}

function sendCommandToEspruino(command: any) {
  if (espruinoProcess && espruinoProcess.stdin.writable) {
    espruinoProcess.stdin.write(`${command}\n`);
    console.log(`Command sent: ${command}`);
    
  } else {
    console.error("Espruino CLI process is not running.");
  }
}

function getTemperature() {
  return new Promise((resolve, reject) => {
    if (espruinoProcess && espruinoProcess.stdin.writable) {
      let response = '';

      const onData = (data: { toString: () => string; }) => {
        response += data.toString();

        if (response.includes('>')) {

          const match = response.match(/=([\d.]+)/);
          if (match && match[1]) {
            resolve(parseFloat(match[1])); 
          } else {
            reject("Hiba: Nem található hőmérséklet az Espruino válaszában.");
          }
        }
      };

      const onError = (err: any) => {
        reject(err);
      };

      espruinoProcess.stdout.on('data', onData);
      espruinoProcess.stdin.write(`E.getTemperature()\n`);
    } else {
      reject("Espruino CLI process is not running.");
    }
  });
}



  startEspruinoCLI();

  server.get("/api/reset", (req, res) => {
    sendCommandToEspruino('reset();');
  });

  server.post("/api/do", (req, res) => {
    sendCommandToEspruino("reset()");
    sendCommandToEspruino(req.body.code);
    res.json({ message: req.body });
  });

  server.get("/api/temperature", async (req, res) => {
    try {
      const temperature = await getTemperature()
      res.json({ temperature: temperature });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch temperature", details: error });
    }
  });

  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
