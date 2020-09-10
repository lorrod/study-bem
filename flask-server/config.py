""" Project settings file """

class Config(object):
	HOST = '0.0.0.0'
	PORT = 5000
	THREADED = True				# Allows multithreading.
	DEBUG = True					# Debug mode. Do not allow in production.
	MONGO_URI = "mongodb://mongodb:27017/shop?retryWrites=false"
	JWT_SECRET_KEY = 'super-secret'
