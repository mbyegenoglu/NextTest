const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()



app.prepare().then(() => {
  const server = express();

  /*
  server.get('/:culture([a-z]{2})', (req, res) => {
    app.render(req, res, "/", {hl: req.params.culture});
  });
  */

  server.all('*', (req, res) => {
    return handle(req, res)
  });

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  });
})
