const express = require('Express');
const app = express();

const rotaProdutoras = require('./src/routes/produtoras')
const rotaJogos = require('./src/routes/jogos')
const rotaUsuarios = require('./src/routes/usuarios')
const rotaBiblioteca = require('./src/routes/biblioteca')

app.use(express.json())

app.use('/produtoras', rotaProdutoras)
app.use('/jogos', rotaJogos)
app.use('/usuarios', rotaUsuarios)
app.use('/biblioteca', rotaBiblioteca)

const port = 3000;
app.listen(port,() => {
    console.log('Servidor Rodando em http://localhost:${port}')
});
