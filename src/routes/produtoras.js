
















router.get('/', async (req,res) => {
    try{
    db.all("SELECT * FROM produtoras",[],(rows) =>{res.json(rows);})}
    catch(err){return res.status(500).json({error: 'Erro interno no servidor'})}
}) 

router.post('/',async (req,res)=>{
    try{
        const { nome , cnpj, website} = req.body;
        const sql = 'INSERT INTO produtoras (nome , cnpj, website) VALUES (?,?,?)';
        db.run (sql,[nome,cnpj,website])
        return res.status(201).json({ mensagem: 'produtora criada'})
    } 
    catch(err){
        return res.status(400).json({ error: "Falha do cliente"})
    }
})

import(produtoras.js)