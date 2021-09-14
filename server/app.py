from flask import Flask

app = Flask(__name__)

# example get request
@app.route("/")
def index():
    return "Hello World!"
