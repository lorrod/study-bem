from app import mongo
from secrets import token_hex# for generating randon hex string for payment token

def find_user(username, password):
	usr_data = list(mongo.db.users.find({"login": username.lower(), "password":password}))
	if len(usr_data) > 0 :
		return True
	return False

def register_user(username, password):
	usr_data = list(mongo.db.users.find({"login": username.lower()}))
	if len(usr_data) > 0 :
		return False
	mongo.db.users.insert({"login": username.lower(), "password":password})
	return True


def get_product(product_article):
	print(product_article)
	product = list(mongo.db.items.find({"article":product_article}, { '_id': 0 }))
	print(product)
	if product:
		return product

def get_products():
	products = list(mongo.db.items.find({}, { '_id': 0 }))
	print(products)
	if products:
		return products

def new_order(username, name, street, city, country, zip, list_items):
	unique_token = token_hex(8)
	isTokenUniq = False
	while isTokenUniq:
		exsist = list(mongo.db.orders.find({"token":unique_token}))
		if len(exsist) == 0:
			break
		unique_token = token_hex(8)

	mongo.db.orders.insert({"login": username.lower(),
							"name":name,
							"street":street,
							"city": city,
							"country":country,
							"zip":zip,
							"items":list_items,
							"token":unique_token,
							"status": "Waiting for payment"})
	mongo.db.users.update({"login":username.lower()}, {"$set":{
													"name":name,
													"street":street,
													"city": city,
													"country":country,
													"zip":zip,
													}})
	return unique_token


def get_recent_address(username):
	address = list(mongo.db.users.find({"login":username.lower()}, { '_id': 0, 'password': 0,  'login': 0 }))
	if len(address) == 0:
		return False
	return address[0]
