from irumi_server import db, bcrypt
from datetime import date

class User(db.Model):
    """
    Represents a user of the application.
    Attributes:
        * email (string) : 이메일 주소
        * password_hashed (string) : 해쉬된 비밀번호
        * name (string) : 이름
        * nickname (string) : 닉네임
        * photofileImg (string) : 프로필 사진 링크
    """

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    email = db.Column(
        db.String(100), nullable=False, unique=True
    )  # user id must be unique
    name = db.Column(db.String(100), nullable=False)
    password_hashed = db.Column(db.String(100), nullable=False)
    nickname = db.Column(db.String(100), nullable=True)
    photofileImg = db.Column(db.String(255))

    def __init__(self, email: str, password: str, name: str):
        self.email = email
        self.password_hashed = bcrypt.generate_password_hash(password)  # temp!
        # self.password_hashed = password
        self.name = name

    def is_password_correct(self, password: str):
        return bcrypt.check_password_hash(self.password_hashed, password)
        # return self.password_hashed == password
    
    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,           
            "nickname": self.nickname,
            "image": self.photofileImg,
        }


class Goals(db.Model):
    """
    Attributes:
        * user_id (int) : user의 id
        * title (string) : 목표 제목
        * type (int) : 목표 타입 (횟수 기반 목표 or 시간 기반 목표)
        * target (int) : 목표 시간 또는 목표 횟수
        * period_type (int) : 하루 / 일주일 / 한달 단위 선택
        * start_date (datetime) : 시작 날짜
        * end_date (datetime) : 끝 날짜 (조금 애매함)
    """

    __tablename__ = "goals"
    
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    type = db.Column(db.Integer, db.ForeignKey("goal_types.id"), nullable=False)
    target = db.Column(db.Integer, nullable=False)
    period_type = db.Column(db.Integer, db.ForeignKey("goal_period_types.id"), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False) 
    end_date = db.Column(db.DateTime, nullable=True)

    def __init__(
        self, 
        user_id: int, 
        title: str, 
        type: int, 
        target: int, 
        period_type: int, 
        start_date: date
    ):
        self.user_id = user_id
        self.title = title
        self.type = type
        self.target = target
        self.period_type = period_type
        self.start_date = start_date

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "target": self.target,
            "period_type": self.period_type,
            "start_date": self.start_date,
            "end_date": self.end_date
        }


class GoalTypes(db.Model):
    """
    Attributes:
        * unit (string) : 목표 타입 (횟수 기반 목표 / 시간 기반 목표)
    """

    __tablename__ = 'goal_types'

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    unit = db.Column(db.String(255), nullable=False)



class GoalPeriodTypes(db.Model):
    """
    Attributes:
        * goal_period_types (string) : 얼마동안 하는 목표인지 (day / week / month)
    """

    __tablename__ = 'goal_period_types'

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    type = db.Column(db.String(255), nullable=False)


class Progress(db.Model):
    """
    Attributes:
        * goal_id (int) : 목표 id (FK - goals.id)
        * progress (int) : 목표 progress (goals.target 과 비교해서 퍼센테이지 나오도록)
        * date (datetime) : 날짜
        
        -> 매일 생성되는 테이블인가?
    """

    __tablename__ = "progress"
    
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    goal_id = db.Column(db.Integer, db.ForeignKey("goals.id"), nullable=False)
    progress = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, nullable=False) 