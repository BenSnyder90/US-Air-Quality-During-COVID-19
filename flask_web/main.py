from flask import Flask, jsonify, render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_sqlalchemy import SQLAlchemy



# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///aqi.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# class pm25(db.Model):
#     pm25_id = db.Column(db.Integer, primary_key=True)
#     city =db.Column(db.String(50))
#     lat =db.Column(db.Float)
#     lon =db.Column(db.Float)
#     aqi =db.Column(db.Float)
     
#     def __init__(self, city, lat,lon,aqi):
#          self.city = city
#          self.lat = lat
#          self.lon = lon
#          self.aqi = aqi

engine = create_engine("sqlite:///aqi.db")


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
pm25 = Base.classes.pm25
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/map')
def details():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of pm25 data including the city, lat, and lon and aqi of each pm25"""
    # Query all pm25s
    results = session.query(pm25.city, pm25.lat, pm25.lon, pm25.aqi).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_pm25s
    all_pm25s = []
    for city, lat, lon, aqi in results:
        pm25_dict = {}
        pm25_dict["city"] = city
        pm25_dict["lat"] = lat
        pm25_dict["lon"] = lon
        pm25_dict["aqi"] = aqi
        all_pm25s.append(pm25_dict)
    # print(all_pm25s)    
    j = all_pm25s
    #return j 
    return render_template('map.html', j=j)
if __name__ == "__main__":
    app.run(debug=True)