"""Add user model

Revision ID: 6a0b5952ab6f
Revises: a6d78c017bca
Create Date: 2021-09-25 17:02:32.893185

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6a0b5952ab6f'
down_revision = 'a6d78c017bca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('password_hashed', sa.String(length=100), nullable=False))
    op.add_column('users', sa.Column('nickname', sa.String(length=100), nullable=True))
    op.add_column('users', sa.Column('photofileImg', sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'photofileImg')
    op.drop_column('users', 'nickname')
    op.drop_column('users', 'password_hashed')
    # ### end Alembic commands ###
