const express = require("express")
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")
require('dotenv').config({ path: __dirname + '/.env' })

const app = express();
const templatePath = path.join(__dirname, '../templates')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({ extended: false }))
app.use(express.json());


app.get("/", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", async(req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    await collection.insertMany([data])
    res.render("login")
})


app.listen(3000, () => {
    console.log("Port Connected")
})