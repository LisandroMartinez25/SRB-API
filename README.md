# SRB-API
This is the backend for an app that allows users  find a restaurant that fits the dietary restrictions of the whole group, with an available table at a specific time, and then create a reservation for that group and time.

## Dependences Instalation
You need have node v12.20.1 in your computer
install selquelize and sequelize-cli globally

## Create DB
For create the tables and add content tha we need the follow: 
1. You have to install postgres prevously
2. Create a _.env_ file and put the same that have in _.env-example_ with your correspondent informations of your porvious postgres install
3. run the next command for create the tables
> npm run migrate
4. run the next command for add the previous data
> npm run seed

## Running and Building
For run the project locally you can run the next command
> npm run start

For generate the build you can run the next command
> npm run build