


# # from flask import Flask, jsonify, render_template
# # from flask_sqlalchemy import SQLAlchemy



# # app = Flask(__name__)
# # app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flask33.db'
# # app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# # db = SQLAlchemy(app)

# # class data3(db.Model):
# #     pm25_id = db.Column(db.Integer, primary_key=True)
# #     city =db.Column(db.String(50))
# #     lat =db.Column(db.Float)
# #     lng =db.Column(db.Float)
# #     aqi =db.Column(db.Float)
     
# #     def __init__(self, city, lat,lon,aqi):
# #          self.city = city
# #          self.lat = lat
# #          self.lon = lon
# #          self.aqi = aqi
# # ############################################################################

# #import numpy as np

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func

# from flask import Flask, jsonify

# engine = create_engine("sqlite:///flask3.db")


# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# # Save reference to the table
# pm25 = Base.classes.pm25
# app = Flask(__name__)

# @app.route('/')
# def home():    
#     return render_template('home.html')
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of pm25 data including the city, lat, and lon and aqi of each pm25"""
#     # Query all pm25s
#     results = session.query(pm25.city, pm25.lat, pm25.lon, pm25.aqi).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of airquality
#     all_pm25s = []
#     for city, lat, lon, aqi in results:
#         pm25_dict = {}
#         pm25_dict["city"] = city
#         pm25_dict["lat"] = lat
#         pm25_dict["lon"] = lon
#         pm25_dict["aqi"] = aqi
#         all_pm25s.append(pm25_dict)
#     jsonify(all_pm25s)
#     return j 
    
# @app.route('/map')
# def details():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of pm25 data including the city, lat, and lon and aqi of each pm25"""
#     # Query all pm25s
#     results = session.query(pm25.city, pm25.lat, pm25.lon, pm25.aqi).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_pm25s
#     all_pm25s = []
#     for city, lat, lon, aqi in results:
#         pm25_dict = {}
#         pm25_dict["city"] = city
#         pm25_dict["lat"] = lat
#         pm25_dict["lon"] = lon
#         pm25_dict["aqi"] = aqi
#         all_pm25s.append(pm25_dict)
#     jsonify(all_pm25s)
#     return j 


# if __name__ == "__main__":
#     app.run(debug=True)

# ######################################################################    
from flask import Flask, jsonify, render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_sqlalchemy import SQLAlchemy
#  # Python SQL toolkit and Object Relational Mapper

# # # import psycopg2

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///AirQuality.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# class Airqualityindex(db.Model):
#     air_id = db.Column(db.Integer, primary_key=True)
#     date = db.Column(db.Date)
#     city =db.Column(db.String(50))
#     state = db.Column(db.String(100))
#     lat =db.Column(db.Float)
#     lng =db.Column(db.Float)
#     population = db.Column(db.Integer)
#     aqi =db.Column(db.Float)
#     category = db.Column(db.String(50))
#     particle = db.Column(db.String(50))
#     initial_business_closing =db.Column(db.Date)
     
#     def __init__(self,date,city,state,lat,lng,population,aqi,category,particle,initial_business_closing):
#          self.date = date
#          self.city = city
#          self.state = state
#          self.lat = lat
#          self.lng = lng
#          self.population = population
#          self.aqi = aqi
#          self.category = category
#          self.particle = particle
#          self.initial_business_closing = initial_business_closing
#####################################################################
#engine = create_engine("sqlite:///mydata1.sqlite")


#create database connection - you will need to change your password here for Postgres
connection_string = "postgres:Sika1985@localhost:5432/AirQuality"
engine = create_engine(f'postgresql://{connection_string}')


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
data = Base.classes.airqualityindex

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/map')
def details():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of data data including the city, lat, and lon and aqi of each data"""
    # Query all pm25s
    results = session.query(data.city, data.lat, data.lng, data.aqi).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_pm25s
    data = []
    for city, lat, lng, aqi in results:
        airquality_dict = {}
        airquality_dict["city"] = city
        airquality_dict["lat"] = lat
        airquality_dict["lng"] = lng
        airquality_dict["aqi"] = aqi
        data.append(airquality_dict)
    print(data)    
    j = data
    #return j 
    return render_template('map.html', j=j)

@app.route('/image')
def image():
    return render_template('image.html') 


@app.route('/team')
def team():
    return render_template('team.html')


if __name__ == "__main__":
    app.run(debug=True)