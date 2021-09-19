from db_connect import db


class User(db.Model):
    """
    Represents a user of the application.
    Attributes:
        * email (string) : 이메일 주소
        * password_hashed (string) : 해쉬된 비밀번호
        * name (string) : 이름
        * nickname (string) : 닉네임
        * photofileImg (string) : 프로필사진링크(필수아님)
    """

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    email = db.Column(
        db.String(100), nullable=False, unique=True
    )  # user id must be unique
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    nickname = db.Column(db.String(100), nullable=False)
    photofileImg = db.Column(db.String(255))

    def __init__(self, email: str, password: str, name: str,nickname: str):
        self.email = email
        self.password = password  # temp!
        self.name = name
        self.nickname =nickname
