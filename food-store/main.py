from flask import Flask, request, send_from_directory, send_file, jsonify
from flask_restful import Resource, Api
from pymongo import MongoClient
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)
api = Api(app)
food_items = [
    {"id": 0,
     "food_name": "Beef-tacos",
     "food_img": "beef-tacos.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 1,
     "food_name": "Caesar Salad",
     "food_img": "caesar-salad.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 2,
     "food_name": "Chicken Curry",
     "food_img": "chicken-curry.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 3,
     "food_name": "Chocolate Brownie",
     "food_img": "chocolate-brownie.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 4,
     "food_name": "Egg Plant Parmesan",
     "food_img": "eggplant-parmesan.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 5,
     "food_name": "Falafel Wrap",
     "food_img": "falafel-wrap.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 6,
     "food_name": "Grilled Chicken Sandwich",
     "ffood_img": "grilled-chicken.jpg-sandwich",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 7,
     "food_name": "Lemon Cheesecake",
     "food_img": "lemon-cheesecake.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 8,
     "food_name": "Lobster Bisque",
     "food_img": "lobster-bisque.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 9,
     "food_name": "Mac and Cheese",
     "food_img": "mac-and.jpg-cheese",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 10,
     "food_name": "Margherita Pizza",
     "food_img": "margherita-pizza.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 11,
     "food_name": "Miso Ramen",
     "food_img": "miso-ramen.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 12,
     "food_name": "Mushroom Risotto",
     "food_img": "mushroom-risotto.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 13,
     "food_name": "Pancake Stack",
     "food_img": "pancake-stack.jpg",
     "food_price": "10",
     "food_quantity": 0},
    {"id": 14,
     "food_name": "Seafood Paella",
     "food_img": "seafood-paella.jpg",
     "food_price": "10",
     "food_quantity": 0},
]
client = MongoClient("mongodb://localhost:27017/")
db = client["MyDB"]


class food_order(Resource):
    def get(self):
        pass

class food_store_images(Resource):
    def get(self, id):
        data = None
        try:
            data = food_items[id]
        except IndexError as e:
            print("ERR:", e)
            return "Food ID is not available"
        files = os.listdir("./images")

        if data is None:
            return "No Image found", 404
        elif data is not None:
            try:
                # print(data["food_img"])
                return send_file(f"./images/{data['food_img']}", mimetype="image/jpeg")
                # return send_from_directory(f"./images", data["food_img"]), 200
            except :
                return send_file(f"./images/brokenImg.png", mimetype="image/png")


class food_store(Resource):
    def get(self):
        return jsonify({"food-store": food_items})


api.add_resource(food_order, "/food-order")
api.add_resource(food_store_images, "/food-store/images/<int:id>")
api.add_resource(food_store, "/food-store")
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
