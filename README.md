# Heritage Trees in Portland

Table of Contents:
=======
- [Summary of Project](#summary-of-project)
- [Required software](#required-software)
- [How to replicate our code](#how-to-replicate-our-code)
- [Data Sources](#data-sources)
- [Visuals](#visuals)
- [Conclusion](#conclusion)
- [Original proposal](#original-proposal)


Group Members:
=======
- Lauren Toothaker
- Katie Hartmann
- Charlie Loveall

Summary of Project:
==========
The goal of this project is to look at Heritage Tree sites in the Portland area
and compare it with U.S. Census Bureau data on demographics of the site near
the Heritage tree.

After further scrutiny of our data and visualizations, more data is needed to
further determine correlation between Heritage tree designation and median home
value. There are a number of factors that affect home price, and our data from
the census is only a current snapshot of home value.

Required software:
==============
- Python 3.8.x
- MongoDB
- Gitbash or equivalent

How to replicate our code:
=======
1. In your config.js add these things: const API_KEY as a variable. (mapbox)
2. In your config.py add these things: g_key, census_api_key as variables.
(g_key = Google Maps API, census_api_key= U.S Census Bureau API)
3. Set up a new conda environment using requirements.txt.
4. Activate your new conda environment.
5. Run ETL_process.ipynb in jupyter notebook to query the api's and store them to a local MongoDB. When finished, it should look like below:
![Screenshot of MongoDB](static/images/MongoDB.png)
6. Close jupyter notebook in console.
7. Run app.py in python.
8. Go to [localhost]/api/censusdata/
9. Go back to the home page of [localhost]

If your website doesn't look like this snippet below, go to [localhost]/api/censusdata/.
Then you can go back to the home directory and your charts should update.
![Screenshot of Site](static/images/SiteScreenshot.png)


Data Sources:
=========

Portland Maps OpenData Heritage Trees:
(https://gis-pdx.opendata.arcgis.com/datasets/heritage-trees/data?geometry=-122.953%2C45.434%2C-122.306%2C45.602)

Portland Neighborhood Regions:
(https://hub.arcgis.com/datasets/9f50a605cf4945259b983fa35c993fe9_125/data?geometry=-123.320%2C45.459%2C-122.014%2C45.627)

U.S. Census Bureau API

Google Geocode API:
(https://maps.googleapis.com/maps/api/geocode/json)


Visuals:
=======
- A single Portland area map with:
    - Cluster markers of Heritage trees with informative tool tips
    - Circle markers of median home values by zip code with pop-up of home value
    - Neighborhood outlines with pop-up of name
- Bar plot of stats
    - Median home value by zip
    - Median income by zip
    - Heritage tree designation years

Conclusion:
========

Given more time, we would like to further look into the following:
- adding information related to education
- median home values and incomes by zip code over the same range of years included in the heritage trees dataset
- identify and execute a means of comparing locations on either neighborhoods or zip codes for a one-to-one comparison

Original proposal:
========
Katie will utilize prior experience with U.S. Census Bureau (UCB) data and Google Geocode to combine Google coordinates with UCB data and upload them to a single CSV file
that will then be pushed to a MongoDB database. She will manage the API endpoint
 and configure the data so we can utilize the data.

From Mongo we will utilize Flask to create a website structure.

Charlie has a heatmap about Heritage trees that can be repurposed for this site.
He will also manage the Flask framework creation.

Lauren will create visualizations and manage the front end.
