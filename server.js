const express = require('express');
const cors = require('cors');
const knex = require('knex');
const history = require('./controllers/history');
const addNew = require('./controllers/addNew');


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'timer'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('success')
})

app.get('/history', (req, res) => { history.handleHistoryGet(req, res, db) })

app.post('/addNew', (req, res) => { addNew.handleAddNew(req, res, db) })

app.listen(process.env.port, () => {
	console.log('runnin')
})