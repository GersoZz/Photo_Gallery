if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = require("./app");

app.listen(app.get("port"), () => {
  console.log("Server on port ", app.get("port"));
  console.log(process.env.NODE_ENV);
});
