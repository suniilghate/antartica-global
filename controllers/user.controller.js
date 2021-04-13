const validator = require('fastest-validator');
const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {v4 : uuidv4} = require('uuid');

//Fetching all employees
const getEmployees = (req, res) => {
    console.log('Fetching the employees listing');
    res.send('Fetching the employees listing');
}

//fetch all users
const index = (req, res) => {
    console.log('requesting......');

    models.User.findAll({include: [models.Employee]}).then(result => {
        //res.status(200).json(result);
        console.log(JSON.stringify(result));
        res.render('users/index', { users : result});
    }).catch(error => {
        res.status(500).send({ message : error.message || "Error Occurred while retriving user information" })
        /*res.status(500).json({
            message: "Error Occured",
            error: error
        })*/
    });
}

//Add new user
const save = (req, res) => {
    
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    
    const createUser = {
        firstname : req.body.data.firstname,
        lastname : req.body.data.lastname,
        email: req.body.data.email,
        password : req.body.data.password
    };
    console.log('..........Adding User....');
    console.log(JSON.stringify(req.body.data));
    
    models.User.findOne({where:{email:req.body.data.email}}).then(result => {
        if(result){
            res.status(409).json({
                message: "Email already exists"
            })
        } else {
            const schema = {
                firstname : "string|min:3|max:50",
                lastname : "string|min:3|max:50",
                email: "email|unique",
                password : "string|min:6",
                //confirmPassword: { type: "equal", field: "password" } 
            }
        
            const valid = new validator();
            const validatorRes = valid.validate(createUser, schema);
            
            if(validatorRes !== true){
                return res.status(400).json({
                    message: "Validation failed",
                    errors: validatorRes 
                })
            }
        
            bcryptjs.genSalt(10, function(err, salt){
                bcryptjs.hash(req.body.data.password, salt, function(err, hash) {
                    const hashedCreateUser = createUser;
                    hashedCreateUser.password = hash;
                    models.User.create(hashedCreateUser).then(result => {
                        const minm = 10000;
                        const maxm = 99999;
                        const employeeIdUnq = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

                        const createEmployee = {
                            employeeId : employeeIdUnq,
                            userId : result.id,
                            organization: req.body.data.organization
                        };
                        const userObj = result;
                        console.log(JSON.stringify(createEmployee));

                        models.Employee.create(createEmployee).then(result => {
                            res.status(201).json({
                                message: "User registered successfully",
                                data: {'employee': result, 'user': userObj}
                            });
                        }).catch(error => {
                            res.status(500).json({
                                message: "Error Occured Employee",
                                error: error
                            })
                        });

                        /*res.status(201).json({
                            message: "User registered successfully",
                            data: result
                        });*/

                    }).catch(error => {
                        res.status(500).json({
                            message: "Error Occured User",
                            error: error
                        })
                    });
                })
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Error Occured......",
            error: error
        })
    });
}

//login user 
const login = (req, res) => {
    console.log(req.body.email);
    console.log(req.body.data.email);
    models.User.findOne({where: {email: req.body.data.email}}).then(user => {
        if(user === null){
            res.status(401).json({
                message: "Invalid credentials"
            })
        } else {
            bcryptjs.compare(req.body.data.password, user.password, function(err, result){
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.SECRET, function(err, token){
                        res.status(200).json({
                            message: "User authentication successfull",
                            token: token
                        });
                    });
                } else {
                    res.status(401).json({
                        message: "Invalid credentials"
                    })      
                }
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Error Occured",
            error: error
        });
    })
}

//user login screen
const userLogin = (req, res) => {
    console.log('User login form');
    res.render('users/login-user');
}

//user login screen
const addUser = (req, res) => {
    console.log('Add User form');
    res.render('users/add_user');
}

//fetch specific user by id
const show = (req, res) => {
    const id = req.params.id;

    models.User.findByPk(id).then(result => {
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: "User not found"
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Error Occured",
            error: error
        })
    });
}

//update the specific user record
const update = (req, res) => {
    const uid = req.params.id;

    const updateUser = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        email: req.body.email,
    }
    
    if(req.body.password){
        updateUser.password = req.body.password 
        
    }

    const schema = {
        firstname : "string|min:3|max:50",
        lastname : "string|min:3|max:50",
        email: "email|unique"
    }

    console.log(`Update User ${updateUser}`);
    
    const valid = new validator();
    const validatorRes = valid.validate(updateUser, schema);

    if(validatorRes !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validatorRes 
        })
    }

    models.User.update(updateUser, {where : {id: uid}}).then(result => {
        res.status(200).json({
            message: "User updated successfull",
            data: updateUser
        })
    }).catch(error => {
        res.status(500).json({
            message: "Error Occured",
            error: error
        })
    });
    
}

//delete the specific user record
const destroy = (req, res) => {
    const uid = req.params.id;

    models.User.destroy({where: {id: uid}}).then(result => {
        res.status(200).json({
            message: "User destoryed successfull",
            data: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Error Occured",
            error: error
        })
    })
}

module.exports = {
 getEmployees,
 save,
 show,
 index,
 update,
 destroy,
 login,
 userLogin,
 addUser
}