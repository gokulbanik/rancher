const express = require("express");

const app = express();

// Use built-in body parser middleware
app.use(express.urlencoded({ extended: true }));

// Load credentials from environment or use defaults
const USERNAME = process.env.APP_USERNAME || "admin";
const PASSWORD = process.env.APP_PASSWORD || "secret";

// Simple HTML form
const HTML_FORM = `
<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
  <h2>Login Page</h2>
  <form method="post" action="/login">
    Username: <input type="text" name="username"><br><br>
    Password: <input type="password" name="password"><br><br>
    <input type="submit" value="Login">
  </form>
</body>
</html>
`;

// Default route redirects to /login
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Render login form
app.get("/login", (req, res) => {
  res.send(HTML_FORM);
});

// Handle login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USERNAME && password === PASSWORD) {
    return res.send(`<h2>Welcome, ${username}!</h2>`);
  }
  res.status(401).send("<h3>Access Denied</h3>");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));