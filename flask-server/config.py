""" Project settings file """

class Config(object):
	HOST = 'localhost'
	PORT = 5000
	THREADED = True				# Allows multithreading.
	DEBUG = True					# Debug mode. Do not allow in production.
	MONGO_URI = "mongodb://127.0.0.1:27017/shop?retryWrites=false"
	JWT_SECRET_KEY = 'super-secret'
