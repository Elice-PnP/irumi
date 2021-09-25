from flask import Blueprint, request, jsonify
from irumi_server.models import User
from irumi_server import db
from sqlalchemy.exc import IntegrityError
from flask_login import login_user, current_user, login_required, logout_user

bp = Blueprint('user', __name__)

@bp.route("/")
def index():
    return "Hello World!"

@bp.route('/signup', methods=['POST'])
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
@bp.route("/login", methods=["POST"])
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

# Logout user
@bp.route("/logout")
@login_required
def logout():
    try:
        logout_user()
        return jsonify({"result": 1, "message": "logout success"})
    except Exception as e:
        print(e)