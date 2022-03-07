const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require ('body-parser')
const AdminBro = require('admin-bro')
const AdminBroExpressjs = require ('admin-bro-expressjs')

const app = express()
app.use(bodyParser.json())

const user = mongoose.model('User', {name: String, email: String, surname: String})

var artcileSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_ad :{type: Date, default: Date.now}
});

const Article = mongoose.model ('Article', artcileSchema);

app.get('/', (req, res) => res.send ('hello word'))

app.get('/users', async (req, res) => {
  const users = await User.find({}).limit(10)
  res.send(users)
})

app.post('/users', async (req, res) => {
  const user = await new User(req.body.user).save()
  res.send(user)
})

app.get('/articles', async (req, res) => {
  const articles = await Article.find({}).limit(10)
  res.send(articles)
})

const run = async () => {
  await mongoose.connect('mongodb://localhost/admin', {useNewUrlParser: true})
  await app.listen(8080, () => console.log('Exemplo app listenes on port 8080'))
}

run()