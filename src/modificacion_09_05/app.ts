import * as express from 'express';
import { spawn } from 'child_process';

const app = express();

app.get('/execmd', (req, res) => {
  if(!req.query.cmd || !req.query.args) {
    res.send('<h1>404</h1>');
  }
  else {
    let wholeData = '';
    const ls = spawn('ls', ['.']);

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
    });
  }
})

app.get('*', (_, res) => {
  res.send('<h1>404</h1>');
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});