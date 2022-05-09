import * as express from 'express';
import { spawn } from 'child_process';

if(process.argv,length >= 3)
{
  const app = express();

  app.get('/*', (_, res) => {
    res.send('<h1>404</h1>');
  });

  app.get('/execmd', (req, res) => {
    let wholeData = '';
    const ls = spawn(process.argv[2], ['.']);

    ls.on('error', (err) => {
      res.send({
        error: err.message,
      });
    });

    ls.stdout.on('data', (data) => {
      wholeData += data;
    });

    ls.on('close', () => {
      res.send({
        output : wholeData,
      });
    })
  });

  app.get('error', (_, res) => {
    res.send({
      error: 'error',
    });
  });

  app.listen(3000, () => {
    console.log('Server is up on port 3000');
  });
}