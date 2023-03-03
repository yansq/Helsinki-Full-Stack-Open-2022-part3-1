const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://felzyan33:${password}@cluster0.mogjdll.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Note = mongoose.model('Note', noteSchema)

const searchAll = () => {
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}

const addNote = () => {
  const note = new Note({
    name: process.argv[3],
    number: process.argv[4]
  })
  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
}

process.argv.length === 3 ? searchAll() : addNote()

