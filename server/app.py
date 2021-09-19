from flask import Flask
import os
import sys
import pymysql
from models import User  # temporary for migration
from dotenv import load_dotenv

# =======================================
# Load & Check environment variables
# =======================================
load_dotenv()
env_variables = {
    "DB_NAME": os.getenv("DATABASE_NAME"),
    "DB_HOST": os.getenv("DATABASE_HOST"),
    "DB_USER": os.getenv("DATABASE_USER"),
    "DB_PORT": os.getenv("DATABASE_PORT"),
    "DB_PWD": os.getenv("DATABASE_PASSWORD"),
}

# Check all required env variables are set.
for key, val in env_variables.items():
    if env_variables[key] is None or env_variables[key] == "None":
        print("Not all required variables are set. Please double check.")
        sys.exit()
    else:
        print(f"{key} variable loaded.")

# ========================
# Initialize Flask App
# ========================

app = Flask(__name__)

SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{env_variables['DB_USER']}:{env_variables['DB_PWD']}@{env_variables['DB_HOST']}:{env_variables['DB_PORT']}/{env_variables['DB_NAME']}"

# Configure Database
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# =================================
# Initialize & Apply Extensions
# =================================
from flask_migrate import Migrate
from db_connect import db

db_migration = Migrate()
db.init_app(app)
db_migration.init_app(app, db)
print("migration added")


# =================================
# Routes (Temp)
# =================================
@app.route("/")
def index():
    return "Hello World!"

from project.views import register_view

app.register_blueprint(register_view.bp)