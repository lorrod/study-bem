""" Views file """

import os
import mongodb_query
from app import app, JWTManager
from flask import Flask, jsonify, request
from flask_jwt_extended import (
	jwt_required, create_access_token,
	get_jwt_identity
)



@app.route('/login', methods=['POST'])
def login():
	print(request.json.get('password', None))
	if not request.is_json:
		return jsonify({"msg": "Missing JSON in request"}), 400

	username = request.json.get('username', None)
	password = request.json.get('password', None)
	if not username:
		return jsonify({"msg": "Missing username parameter"}), 400
	if not password:
		return jsonify({"msg": "Missing password parameter"}), 400

	registered = mongodb_query.find_user(username, password)

	if not registered:
		return jsonify({"msg": "Bad username or password"}), 401

	# Identity can be any data that is json serializable
	access_token = create_access_token(identity=username)
	return jsonify(token=access_token), 200


@app.route('/register', methods=['POST'])
def register():
	print(request.json.get('password', None))
	if not request.is_json:
		return jsonify({"msg": "Missing JSON in request"}), 400

	username = request.json.get('username', None)
	password = request.json.get('password', None)
	if not username:
		return jsonify({"msg": "Missing username parameter"}), 400
	if not password:
		return jsonify({"msg": "Missing password parameter"}), 400

	register_complete = mongodb_query.register_user(username, password)

	if not register_complete:
		return jsonify({"msg": "Username is busy"}), 409
	# Identity can be any data that is json serializable
	access_token = create_access_token(identity=username)
	return jsonify(token=access_token), 200

# Protect a view with jwt_required, which requires a valid access token
# in the request to access.
#@jwt_required
@app.route('/products', methods=['GET'])
def products():
	# Access the identity of the current user with get_jwt_identity
	current_user = get_jwt_identity()
	current_product = request.args.get('article')
	if current_product != None:
		product = mongodb_query.get_product(current_product)
		return jsonify(product), 200
	products = mongodb_query.get_products()
	return jsonify(products), 200

@jwt_required
@app.route('/order', methods=['POST'])
def order():
	current_user = get_jwt_identity()
	data = request.get_json()
	print(data)
	return jsonify(200)


# ==========================================================================================
# All functions for testing will be placed BELOW
