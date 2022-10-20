const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
//const exphbs = require("express-handlebars");
const {engine} = require("express-handlebars");

// Initializations
const app = express();
require('./database')

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.json()); //P
app.use(express.urlencoded({ extended: false })); // strings 

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));//id
  },
});

app.use(multer({ storage }).single("image"));

// Routes

//app.use(require("./routes/index"));
app.use(require("./routes"));//busca x defecto el index.js

app.use(express.static(path.join(__dirname, "static")));

module.exports=app;