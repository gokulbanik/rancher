const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const USERNAME = process.env.APP_USERNAME || "admin";
const PASSWORD = process.env.APP_PASSWORD || "secret";

const HTML_FORM = `
<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
  <h2>Login Page</h2>
  <form method="post" action="/node/login">
    Username: <input type="text" name="username"><br><br>
    Password: <input type="password" name="password"><br><br>
    <input type="submit" value="Login">
  </form>
</body>
</html>
`;

app.get("/node", (req, res) => {
  res.redirect("/node/login");
});

app.get("/node/login", (req, res) => {
  res.send(HTML_FORM);
});

app.post("/node/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    return res.send(`<h2>Welcome, ${username}!</h2>`);
  }
  res.status(401).send("<h3>Access Denied</h3>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
