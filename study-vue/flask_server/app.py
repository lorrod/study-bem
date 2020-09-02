"""
App initialization file.
Imports and initializes its main components.
"""

import os
from flask import Flask
from config import Config 				# Project configuration import
from flask_pymongo import PyMongo 		# PyMongo database
from flask_cors import CORS
from flask_jwt_extended import JWTManager



# Create Flask app, load app.config
app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
app.secret_key = b'eHk\x8d\xd9\x18\xf1\xd9)#\xaaf\x8aK=<'#os.environ.get("SECRET_KEY")

# PyMongo DB initialization
mongo = PyMongo(app)
# Bcrypt initialization
jwt = JWTManager(app)


import views
