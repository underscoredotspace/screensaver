const http = require('http'),
      fs = require('fs')

http.createServer((req, res) => {
  let filename
  if (req.url === '/') {
    filename = `${process.cwd()}/public/index.html`
  } else if(req.url === '/p5.js') {
    filename = `${process.cwd()}/node_modules/p5/lib/p5.min.js`
  } else {
    filename = `${process.cwd()}/public${req.url}`
  }

  console.log(filename)

  fs.readFile(filename, 'binary', (err, file) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'})
      res.write('Some error')
    } else { 
      res.writeHead(200)
      res.write(file, 'binary')
    }
    res.end()
  })
}).listen(3000)