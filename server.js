const express = require('express'),
      path = require('path'),
      app = express(),
      port = 3000;

const files = path.resolve(__dirname, 'public')
app.use(express.static(files))

app.listen(port, () => {
  console.log('Weather Application is running on port 3000')
})
