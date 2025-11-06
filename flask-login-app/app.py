from flask import Flask, request, redirect, url_for, render_template_string
import os

# Initialize Flask app with APPLICATION_ROOT
app = Flask(__name__)
app.config['APPLICATION_ROOT'] = '/flask'

# Get credentials from environment variables (fallback to defaults)
USERNAME = os.getenv("APP_USERNAME", "admin")
PASSWORD = os.getenv("APP_PASSWORD", "secret")

# HTML Login Form (uses relative URL for action)
HTML_FORM = """
<!DOCTYPE html>
<html>
<head><title>Login</title></head>
<body>
  <h2>Login Page</h2>
  <form method="post" action="{{ url_for('login') }}">
    Username: <input type="text" name="username"><br><br>
    Password: <input type="password" name="password"><br><br>
    <input type="submit" value="Login">
  </form>
</body>
</html>
"""

@app.route('/')
def home():
    return "<h2>Flask Login Home</h2>"

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = request.form.get("username")
        pwd = request.form.get("password")
        if user == USERNAME and pwd == PASSWORD:
            return f"<h2>Welcome, {user}!</h2>"
        return "<h3>Access Denied</h3>", 401
    # GET request
    return render_template_string(HTML_FORM)

if __name__ == "__main__":
    # Listen on all interfaces
    app.run(host="0.0.0.0", port=5000)
