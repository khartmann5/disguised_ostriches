# import necessary libraries
from flask import Flask, render_template, redirect, url_for, jsonify
from flask_pymongo import PyMongo
# from flask_cors import CORS
import requests

# create instance of Flask app
app = Flask(__name__)
# CORS(app)
# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/portland_census_db")
# create route that renders index.html template
@app.route("/")
def index():
    # portland_census_db.portland_census_db database.collection

    return render_template("index.html")
@app.route("/api/censusdata/")
def getCensusData():
    census_data= list(mongo.db.portland_census_db.find())
    # print(type(census_data))
    # print(census_data[0])
    for id in census_data:
        id.pop("_id",None)

    return jsonify(census_data)


if __name__ == "__main__":
    app.run(debug=True)
