# Noam_Cohen
Noam Cohen_208524389

# How to run the app?
- In db.config.js enter only the password 

- In the command line run the following command:
    - `nodemon index.js`

- Navigate to: http://localhost:3000/createDb 
(This command will create the schema `web` and use it, also the tables will be created)

- Navigate to: http://localhost:3000/insertData
(This command will insert some starter data into the tables by reading a related csv files for each table)

From this stage you are free to go to the app's main page:
- Navigate to: http://localhost:3000


# How to remove the app db?
- Navigate to: http://localhost:3000/dropDb 
(This command will remove the Db entirely - drop `web` schema and recreate it empty)