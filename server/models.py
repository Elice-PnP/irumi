from db_connect import db


class User(db.Model):
    """
    Represents a user of the application.
    Attributes:
        * email (string) : 이메일 주소
        * password_hashed (string) : 해쉬된 비밀번호
        * name (string) : 이름
    """

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    email = db.Column(
        db.String(100), nullable=False, unique=True
    )  # user id must be unique
    name = db.Column(db.String(100), nullable=False)

    def __init__(self, email: str, password_original: str, name: str):
        self.email = email
        self.password_hashed = password_original  # temp!
        self.name = name
