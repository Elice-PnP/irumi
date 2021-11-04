from flask import Blueprint, request, jsonify
from irumi_server.models import Goals, GoalTypes, GoalPeriodTypes
from irumi_server import db
from sqlalchemy.exc import IntegrityError
from flask_login import login_required, current_user
from sqlalchemy import and_
from datetime import date, datetime


NOT_AUTHORIZED = {"result": 0, "message": "Not authorized."}

bp = Blueprint('goal', __name__)

###################
# ROUTES
##################

@bp.route('/goals', methods=['POST'])
@login_required
def post_goal():
    """
    GETS: [title, type, target, period_type, start_date, end_date]
    RETURNS: goal_id
    """
    try:
        goal_data = request.json
        user_id = current_user.id
        title = goal_data.get("title")
        type = goal_data.get("type")
        target = goal_data.get("target")
        period_type = goal_data.get("period_type")
        start_date = datetime.strptime(goal_data.get("start_date"), "%Y-%m-%d").date()
        if goal_data.get("end_date") != 'None':
            end_date = datetime.strptime(goal_data.get("end_date"), "%Y-%m-%d").date()
        else:
            end_date = date(0000, 00, 00)

        new_goal = Goals(
            user_id,
            title, 
            type, 
            target, 
            period_type, 
            start_date,
            #end_date
        )
        db.session.add(new_goal)
        db.session.commit()

        add_goal = Goals.query.filter(and_(Goals.user_id == user_id, Goals.title == title, Goals.type == type, Goals.target == target, Goals.period_type == period_type, Goals.start_date == start_date)).first()

        return jsonify(
            {
                "goal_id": add_goal.id,
            }
        )
    except IntegrityError:
        db.session.rollback()
        return "Existing user.", 401
    except:
        db.session.rollback()
        return "Failed registration.", 500

@bp.route('/goals/<int:goal_id>', methods=['PATCH'])
@login_required
def patch_goal(goal_id):
    """
    GETS: [title, type, target, period_type, start_date, end_date]
    RETURNS: goal_id
    """
    try:

        goal_data = request.json

        user_id = current_user.id
        title = goal_data.get("title")
        type = goal_data.get("type")
        target = goal_data.get("target")
        period_type = goal_data.get("period_type")
        start_date = datetime.strptime(goal_data.get("start_date"), "%Y-%m-%d").date()
        if goal_data.get("end_date") != 'None':
            end_date = datetime.strptime(goal_data.get("end_date"), "%Y-%m-%d").date()
        else:
            end_date = date(0000, 00, 00)

        patch_goal = Goals.query.filter_by(id=goal_id).first()
        if patch_goal.title != title:
            patch_goal.title = title
        if patch_goal.type != type:
            patch_goal.type = type
        if patch_goal.target != target:
            patch_goal.target = target
        if patch_goal.period_type != period_type:
            patch_goal.period_type = period_type
        if patch_goal.start_date != start_date:
            patch_goal.start_date = start_date        
        db.session.commit()

        return jsonify(
            {
                "goal_id": goal_id,
            }
        )
    except IntegrityError:
        db.session.rollback()
        return "Existing user.", 401
    except:
        db.session.rollback()
        return "Failed registration.", 500

@bp.route('/goals/<int:goal_id>', methods=['DELETE'])
@login_required
def delete_goal(goal_id):
    """
    GETS: goal_id
    RETURNS: goal_id
    """
    try:
        delete_row = Goals.query.filter_by(id=goal_id).first()
        db.session.delete(delete_row)
        db.session.commit()
        return jsonify({"goal_id": goal_id})

    except IntegrityError:
        db.session.rollback()
        return "Existing user.", 401
    except:
        db.session.rollback()
        return "Failed delete.", 500