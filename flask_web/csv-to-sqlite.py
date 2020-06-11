import csv_to_sqlite

# all the usual options are supported
options = csv_to_sqlite.CsvOptions(typing_style="full", encoding="windows-1250") 
input_files = ["final_data1.csv"] # pass in a list of CSV files
csv_to_sqlite.write_csv(input_files, "mydata1.sqlite", options)