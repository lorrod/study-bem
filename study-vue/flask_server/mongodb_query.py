from app import mongo

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
	product = list(mongo.db.items.find({"article":product_article}, { '_id': 0 }))
	print(product)
	if product:
		return product

def get_products():
	products = list(mongo.db.items.find({}, { '_id': 0 }))
	print(products)
	if products:
		return products
