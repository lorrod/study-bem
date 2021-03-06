from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

app = Flask(__name__)
CORS(app)
# Setup the Flask-JWT-Extended extension
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!
jwt = JWTManager(app)


# Provide a method to create access tokens. The create_access_token()
# function is used to actually generate the token, and you can return
# it to the caller however you choose.
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

    if username != 'test' or password != 'test':
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

    print(username, password)
    # Identity can be any data that is json serializable
    access_token = create_access_token(identity=username)
    return jsonify(token=access_token), 200

# Protect a view with jwt_required, which requires a valid access token
# in the request to access.
@app.route('/products', methods=['GET'])
@jwt_required
def products():
    # Access the identity of the current user with get_jwt_identity
    by_article = request.args.get('article')
    print(by_article)
    current_user = get_jwt_identity()
    print("logged in as")
    print(current_user)
    return jsonify(logged_in_as=current_user), 200


if __name__ == '__main__':
    app.run()
