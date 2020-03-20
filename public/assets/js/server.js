var express = require("express")
var path = require("path")
var db = require("../../../db/db.json")

//Setting up the server
var app = express()
var PORT = process.env.PORT || 8080

//Middle ware for methods
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Route to get to the notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../notes.html"))
})

//Default route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"))
})

//API access for the stored notes
app.get("/api/notes", (req, res) => {
    return res.sendFile(path.join(__dirname, "../../../db/db.json"))
})

app.get("/api/notes/:title", (req, res) => {
    var chosen = req.params.title

    console.log(chosen)

    for(var i=0; i < db.length; i++){
        if (chosen == db[i].routeName) {
            return res.json(db[i])
        }
    }
})

app.post('/api/notes', (req, res) => {
    var newNote = req.body
    newNote.routeName = newNote.title.replace(/\s+/g, "").toLowerCase()

    db.push(newNote)
    res.json(newNote)
})

// Runs the server on the specified port
app.listen(PORT, () => {
    console.log("APP LISTENING ON PORT " + PORT)
})