from flask import Blueprint, json, request, jsonify
from models import *
from sqlalchemy.exc import IntegrityError
from flask_login import login_user, current_user

bp = Blueprint('api', __name__, url_prefix='/')

# 회원가입 처리
@bp.route('/users', methods=['POST'])
def register():
    try:
        user_data = request.json

        new_user = User(
            user_data.get("email"), user_data.get("password"), user_data.get("name"), user_data.get("nickname"), user_data.get("photofileImg")
        )
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
                "photofileImg": current_user.photofileImg
            }
        )
    except IntegrityError:
        db.session.rollback()
        return "Existing user.", 401
    except:
        db.session.rollback()
        return "Failed registration.", 500

