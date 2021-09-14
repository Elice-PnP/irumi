"""
Script to initialize database at the beginning.
Please ensure .env file has the required variables.
"""
import os
import mysql.connector
import sys
from dotenv import load_dotenv

load_dotenv()

env_variables = {
    "DB_NAME": os.getenv("DATABASE_NAME"),
    "DB_HOST": os.getenv("DATABASE_HOST"),
    "DB_USER": os.getenv("DATABASE_USER"),
    "DB_PASSWORD": os.getenv("DATABASE_PASSWORD"),
}

# Check all required env variables are set.
for key, val in env_variables.items():
    if env_variables[key] is None or env_variables[key] == "None":
        print("Not all required variables are set. Please double check.")
        sys.exit()
    else:
        print(f"{key} variable loaded.")

mydb = mysql.connector.connect(
    host=env_variables["DB_HOST"],
    user=env_variables["DB_USER"],
    passwd=env_variables["DB_PASSWORD"],
)
print("connected!")

cursor = mydb.cursor()
cursor.execute(
    "CREATE DATABASE {} DEFAULT CHARACTER SET 'utf8'".format(env_variables["DB_NAME"])
)
print("Database {} created successfully.".format(env_variables["DB_NAME"]))

mydb.commit()
cursor.close()

mydb.close()
