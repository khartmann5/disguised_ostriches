# import necessary libraries
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo
import our_function

# create instance of Flask app
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/portland_census_db")
# create route that renders index.html template
@app.route("/")
def index():

    return render_template("index.html")

# Route that will trigger the scrape function
@app.route("/refresh")
def refresh():

    # Run the scrape function
    costa_data = scrape_costa.scrape_info()

    # Update the Mongo database using update and upsert=True
    mongo.portland_census_db.portland_census_db.update({}, costa_data, upsert=True)

    # Redirect back to home page
    return redirect(url_for('home'))

if __name__ == "__main__":
    app.run(debug=True)
