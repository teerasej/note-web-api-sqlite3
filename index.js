const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const express = require('express');

const app = express()

app.use(express.json()) // for parsing application/json
 

const connectDB = async () => {
     // open the database
     console.log('connecting db...')
    const db = await sqlite.open({
        filename: 'database.db',
        driver: sqlite3.Database
      })
    await db.exec('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)')
    console.log('db ready')
    
    return db;
}


app.get('/', (req, res) => {
  res.send(200,'ok')
})

app.get('/notes', async (req, res) =>  {

    const db = await connectDB();
    const notes = await db.all('SELECT * FROM notes')
    console.log(notes);
    res.json(notes);
})

app.post('/notes', async (req, res) => {

    const newNote = req.body
    const db = await connectDB()

    const sql = `INSERT INTO notes (message) VALUES (?)`

    await db.run(sql, newNote.message)

    res.status(200).json({message:'insert success'})
})
 
app.listen(3000, () => {
    console.log('server ready.')
})