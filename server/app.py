from flask import Flask
import os
import sys
from flask.globals import current_app
import pymysql
from sqlalchemy.exc import IntegrityError
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
from flask_login import LoginManager

db_migration = Migrate()
db.init_app(app)
db_migration.init_app(app, db)
print("migration added")

# =================================
# Initialization to use flask-login
# =================================
app.secret_key = os.urandom(24)
login_manager = LoginManager()
login_manager.init_app(app)

from models import User  # temporary for migration

# =================================
# Routes (Temp)
# =================================
from flask import request, jsonify
from flask_login import login_user, current_user, login_required, logout_user

@app.route("/")
def index():
    return "Hello World!"

@app.route('/signup', methods=['POST'])
def register():
    try:
        user_data = request.json

        new_user = User(
            user_data.get("email"), 
            user_data.get("password"), 
            user_data.get("name"), 
        )
        nickname = user_data.get("nickname")
        if nickname:
            new_user.nickname = nickname
            
        db.session.add(new_user)
        db.session.commit()

        # log the user in straight away and send user data.
        login_user(new_user)

        return jsonify(
            {
                "id": current_user.id,
                "email": current_user.email,
                "name": current_user.name,
                "nickname": current_user.nickname,
            }
        )
    except IntegrityError:
        db.session.rollback()
        return "Existing user.", 401
    except:
        db.session.rollback()
        return "Failed registration.", 500


# Login user
@app.route("/login", methods=["POST"])
def login():
    login_data = request.json
    user = User.query.filter_by(email=login_data.get("email")).first()
    if user and user.is_password_correct(login_data.get("password")):
        # valid credentials - log in user
        login_user(user, remember=True)
        return {
            "id": current_user.id,
            "email": current_user.email,
            "name": current_user.name,
            "nickname": current_user.nickname
        }

    return jsonify({"result": 0, "message": "invalid credentials"}), 401

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return jsonify({"result": 1, "message": "logout success"})