from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
import os
import sys
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

# =======================================
# To be initialized with Flask App.
# =======================================
db = SQLAlchemy()
db_migration = Migrate()
login_manager = LoginManager()
bcrypt = Bcrypt()


# ========================
# Initialize Flask App
# ========================
def create_app():
    app = Flask(__name__)
    print(env_variables['DB_PORT'])
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{env_variables['DB_USER']}:{env_variables['DB_PWD']}@{env_variables['DB_HOST']}:{env_variables['DB_PORT']}/{env_variables['DB_NAME']}"

    # Configure Database
    app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)  # SQLAlchemy 객체를 app 객체와 이어줍니다.
    db_migration.init_app(app, db)
    login_manager.init_app(app) # Initialization to use flask-login
    bcrypt.init_app(app)

    print("migration added")

    from .api import user
    from . import models

    app.register_blueprint(user.bp)

    # 비밀번호 암호화
    app.secret_key = 'afsfsa'
    # # 세션 일정시간 서버 저장파일
    # app.config["SESSION_TYPE"] = "filesystem"

    return app