# Antartica Global Node Test


## Instalation Steps :
```bash
1. git clone the repository
    https://github.com/suniilghate/antartica-global.git
2. npm install
3. chagne the db configuration settings in config/config.json
3. sequelize db:migrate
4. npm start
```

## Folder Structure
```bash
-config
    - config.json: Db configuration for development|test|production environment

-controllers
    - user.controller.js : User contoller file including CURD methods

-middleware
    - verify_user.js : User authentication using jwt token

- migrations
    - 20210412133512-create-user.js : User table migration file
    - 20210412134422-create-employee.js : Employee table migration file

- models
    - employee.js : Employee model file 
    - user.js : User model file with Employee association

- public/assets
    - css : CSS file
    - js :  
        - cookies.js : jQuery Cookie Plugin for storing cookies.
        - index.js : jquery form submition.

- routes
    - users.js : User routes

- views
    - layouts : 
        - header.ejs : Header layout file
        - footer.ejs : Footer layout file
        - fields.ejs : Form fields file
        - loginFields.ejs : Login form fields file
        - table.ejs : User data file.
    - users :
        - add_user.ejs : Add User file
        - index.ejs : User listing file
        - login-user.ejs : Login file
        - update_user.ejs : Update user file

- .env : Environment variables file

- index.js : Node start file

- package.json : Package dependencies file
```