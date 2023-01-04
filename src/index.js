const express = require("express");
const path = require("path");
const hbs = require("hbs");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const PORT = 3000;
const app = express();
const templatePath = path.join(__dirname, "../templates");

//MODELS
const collection = require("./models/user")


app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async(req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    await collection.insertMany([data]);
    res.render("login");
});


mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("mongodb connected");
        const server = app.listen(PORT, () => {
            console.log(`Server Started 💚 at http://localhost:3000`);
        });
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB.\n", { error });
    });