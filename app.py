# import necessary libraries
from flask import Flask, render_template, redirect, url_for
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
    # tree_data= mongo.db.portland_census_db.find_one()
    # print(tree_data)
    return render_template("index.html")
@app.route("/api/heatmapdata/")
def getHeatMapData():
    response= requests.get("https://opendata.arcgis.com/datasets/fd1d618ac3174ad5be730524a4dd778e_26.geojson").json()

    return response


if __name__ == "__main__":
    app.run(debug=True)
