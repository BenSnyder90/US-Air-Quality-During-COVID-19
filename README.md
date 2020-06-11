## Project # 2
## CWRU Data Analytics Bootcamp 2020

## AirQuality before and after COVID-19
Kafui Ahedor, Chris Bock, Ali Rizvi, Ben Snyder

Project Proposal: AirQualityProject/Proposal.docx

## Background
The main objective of this project is to review the air quality (2019-20) for different geographical locations and analyze against COVID-19 data by utilizing effective data analytical skills.

## Data Sources
Initial csv files were imported from EPA database and stored in our github asset folder; AirQualityProject/asset/sample_data, (1) covid19_policydates.csv (2) daily_aqi_by_cbsa_2019.csv (3) daily_aqi_by_cbsa_2020.csv 

## Technique/Technology
*Python/Pandas, was used to initial cleaning and visualizing the data. EPA Data was scraped on the basis of daily AQI (Air Quality Index) value. 51 major US cities were selected based upon their location and population density. SQL/PGAdmin was used to transform and load the data. For graphic analysis; D3, Leaflet and mapbox were used.  

## Files in the repository:
* AirQualityProject /master/Proposal;- initial proposal
* AirQualityProject /master/merge_data.ipynb;- This Jupyter notebook includes, importing the raw data, cleaning the data-base, saving the clean data into new csv.s
* AirQualityProject /master/assets/sample_data- hold all the CSVs, working files
* AirQualityProject /master/assets;- includes all css, js and csv files
* AirQualityProject /master/README.md;
* AirQualityProject/master/sprint_planning_checklist


## Other Sources
https://aqs.epa.gov/aqsweb/airdata/download_files.html#Meta - EPA database of zip files with daily AQI index values going back to 1980
https://aqs.epa.gov/aqsweb/documents/data_api.html - EPA API documentation
https://docs.google.com/presentation/d/12NXxuREse69DebGqxVG1fSlRxbPscjRRaZ0V7StgUyU/edit - Project Guidelines
