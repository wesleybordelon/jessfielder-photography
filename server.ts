import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
//import { MongoClient, ServerApiVersion } from 'mongodb';
//import * as fs from 'fs'; // Import the filesystem module to read the certificate file

// Adjust the MongoDB URI and path to the certificate as necessary
//const credentialsPath = '<path_to_certificate>'; // Replace with the actual path to your certificate
// const uri = 'mongodb+srv://photographycluster.wtpcz7o.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';

// async function connectToMongoDB() {
//   try {
//     // Ensure the certificate file is read properly
//     // const tlsCertificateKeyFile = fs.readFileSync(credentialsPath);

//     // const client = await MongoClient.connect(uri, {
//     //   tls: true, // Enable TLS, required for the connection
//     //   tlsCertificateKeyFile: credentialsPath, // Provide the certificate for authentication
//     //   serverApi: ServerApiVersion.v1
//     // });

//     console.log("Connected successfully to MongoDB server");
//     const db = client.db('yourDbName'); // Replace 'yourDbName' with your actual database name
//     // Your database operations go here

//     return { client, db };
//   } catch (error) {
//     console.error('An error occurred connecting to MongoDB:', error);
//     throw error; // Rethrow the error to be handled where `connectToMongoDB` is called
//   }
// }

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
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

async function run(): Promise<void> {
  try {
    //const { client, db } = await connectToMongoDB();
    // Now you have access to the MongoDB client and db instances
    
    const server = app(); // Pass the MongoDB client if needed
    const port = process.env['PORT'] || 4000;

    // Start up the Node server
    server.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });

    // Handle server shutdown gracefully
    // process.on('SIGINT', async () => {
    //   try {
    //     await client.close();
    //     console.log('MongoDB connection closed');
    //     process.exit(0);
    //   } catch (error) {
    //     console.error('Failed to close MongoDB connection:', error);
    //     process.exit(1);
    //   }
    // });

  } catch (error) {
    console.error('Failed to start the server:', error);
    process.exit(1);
  }
}

run();
