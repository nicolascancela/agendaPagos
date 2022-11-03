const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.send('Mi primer backend!')
});

app.get('/usuario', (req, res) => {
    res.send({username: 'Pepito', email: 'pepito.test@gmail.com'})
  });

app.listen(PORT, () => {
  console.log(`App ejecutandose en el puerto: ${PORT}`)
});