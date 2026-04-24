const db = require('db');
const express = requeire('express');
const router = express();

router.post('/',async (req,res)=>{
    try{
        const { nome , cpf, email} = req.body;
        const sql = 'INSERT INTO usuarios (nome , cpf, email) VALUES (?,?,?)';
        db.run (sql,[nome,cpf,email])
        return res.status(201).json({ mensagem: 'usuario criado'})
    } 
    catch(err){
        return res.status(400).json({ error: "Falha do cliente"})
    }
})

router.patch('/:titulo', async(req,res) =>{
    try{
    const {titulo} = req.params;
    const {horas} = req.body
    const sql = 'UPDATE biblioteca SET horas_jogadas = ? WHERE id = ?';
    db.run(sql,[preco,id]);
    return res.json({ mensagem: "Jogo atualizado com sucesso"});
} catch(err){return res.status(400).json({ erro: "Erro ao atualizar"})}
});

router.get('/:cpf', async(req,res) =>{
     try{
        const {cpf} = req.params;
    db.all("SELECT * FROM usuarios WHERE cpf = ?",cpf);    
}
    catch(err){return res.status(500).json({error: 'Erro interno no servidor'})}
})

router.delete('/:id', (req,res) =>{
    try{
    const {id} = req.params;
    db.run("DELETE FROM usuarios WHERE id = ?"),id;
    } catch(err){ return res.status(500).json({ erro: err.message})}
    res.json({ mensagem: "usuario removido"});
})

module.exports(router)