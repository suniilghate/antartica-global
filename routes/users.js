const express = require('express');
const userController = require('../controllers/user.controller');
const userAuthMiddleware = require('../middleware/verify_user');

const route = express.Router();

route.get('/userlogin', userController.userLogin);
route.post('/login', userController.login);
route.get('/', userAuthMiddleware.userAuth, userController.index);
route.get('/add-user', userController.addUser);
route.post('/', userController.save);
route.get('/:id', userAuthMiddleware.userAuth, userController.show);
route.put('/:id', userAuthMiddleware.userAuth, userController.update);
route.delete('/:id', userAuthMiddleware.userAuth, userController.destroy);



module.exports = route;