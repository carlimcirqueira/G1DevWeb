const Database = require('better-sqlite3')

const db = new Database()

db.serialize(() => {
    db.run("PRAGMA foreign_keys = ON;");

    db.run(`CREATE TABLE IF NOT EXISTS produtoras(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cnpj TEXT NOT NULL,
        website TEXT NOT NULL
    )`)

   db.run(`CREATE TABLE IF NOT EXISTS jogos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_produtora INTERGER NOT NULL,
        titulo TEXT NOT NULL,
        preco REAL NOT NULL,
        FOREIGN KEY (id_produtora) REFERENCES produtoras (id)
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS usuarios(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cpf TEXT NOT NULL,
        email TEXT NOT NULL,
        CHECK (cpf LIKE '___________')
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS biblioteca(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario TEXT NOT NULL,
        id_jogo TEXT NOT NULL,
        horas_jogadas INTERGER NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
        FOREIGN KEY (id_jogo) REFERENCES jogos (id)
    )`)

})

import(Database.js)