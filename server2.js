const express = require('express');
const db = require('./database');
const router = express();
const PORT = 3000;

router.use(express.json())

router.listen(PORT,() => {
    console.log(`Servidor Rodando em http://localhost:${PORT}`)
});

router.get('/jogos', async (req,res) => {
    try{
    await db.all("SELECT * FROM jogos",[],(rows) =>{res.json(rows);})}
    catch(err){return res.status(500).json({error: 'Erro interno no servidor'})}
}) 

router.post('/jogos',async (req,res)=>{
    try{
        const { titulo , preco, id_produtora} = req.body;
        const sql = 'INSERT INTO produtoras (titulo , preco, id_produtora) VALUES (?,?,?)';
        await db.run (sql,[titulo,preco,id_produtora])
        return res.status(201).json({ mensagem: 'produtora criada'})
    } 
    catch(err){
        return res.status(400).json({ error: "Falha do cliente"})
    }
})

router.patch('/jogos/:id', async(req,res) =>{
    try{
    const {id} = req.params;
    const {preco} = req.body
    const sql = 'UPDATE jogos SET preco = ? WHERE id = ?';
    await db.run(sql,[preco,id]);
    return res.json({ mensagem: "Jogo atualizado com sucesso"});
} catch(err){return res.status(400).json({ erro: "Erro ao atualizar"})}
});

router.get('/jogos/:preco', async(req,res) =>{
     try{
    const sql = `SELECT * FROM jogos WHERE preco < ?`;
    await db.all(sql,[])    
}
    catch(err){return res.status(500).json({error: 'Erro interno no servidor'})}
})

//produtoras

router.get('/produtoras', async (req,res) => {
    try{
    await db.all("SELECT * FROM produtoras",[],(rows) =>{res.json(rows);})}
    catch(err){return res.status(500).json({error: 'Erro interno no servidor'})}
}) 

router.post('/produtoras',async (req,res)=>{
    try{
        const { nome , cnpj, website} = req.body;
        const sql = 'INSERT INTO produtoras (nome , cnpj, website) VALUES (?,?,?)';
        await db.run (sql,[nome,cnpj,website])
        return res.status(201).json({ mensagem: 'produtora criada'})
    } 
    catch(err){
        return res.status(400).json({ error: "Falha do cliente"})
    }
})

//usuarios

router.post('/usuarios',async (req,res)=>{
    try{
        const { nome , cpf, email} = req.body;
        const sql = 'INSERT INTO usuarios (nome , cpf, email) VALUES (?,?,?)';
        await db.run (sql,[nome,cpf,email])
        return res.status(201).json({ mensagem: 'usuario criado'})
    } 
    catch(err){
        return res.status(400).json({ error: "Falha do cliente"})
    }
})

router.put('/usuarios/:id', async(req,res) =>{
    try{
    const {id} = req.params;
    const {nome,cpf,email} = req.body;
    const sql = 'UPDATE usuarios SET nome = ?,cpf = ?, email = ? WHERE id = ?';
    await db.run(sql,[nome,cpf,email,id])
} catch(err){return res.status(400).json({ erro: "Erro ao atualizar"})}
res.json({ mensagem: "Usuario atualizado com sucesso"});
});

router.get('/usuarios/:cpf', async(req,res) =>{
     try{
        const {cpf} = req.params;
    await db.all("SELECT * FROM usuarios WHERE cpf = ?",cpf);    
}
    catch(err){return res.status(500).json({error: 'Erro interno no servidor'})}
})

router.delete('/usuarios/:id', async (req,res) =>{
    try{
    const {id} = req.params;
    await db.run("DELETE FROM usuarios WHERE id = ?"),id;
    } catch(err){ return res.status(500).json({ erro: err.message})}
    res.json({ mensagem: "usuario removido"});
})