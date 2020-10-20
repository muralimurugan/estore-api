const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const Sequelize = require('sequelize')

const db = require("../../db");

const User = userModel(db.sequelize, Sequelize)

module.exports = {
    create: function (req, res, next) {
        User.create({ name: req.body.name, email: req.body.email, password: req.body.password, store_id: req.body.store_id }).then(response => {
            console.log('res', response)
            if (response) {
                res.json({ status: "success", message: "user added succsully", data: { user: {'name': response.name, 'email':  response.email} } });
            } else {
                res.json({ status: "success", message: "something went wrong", });
            }

        })
    },
    authenticate: function (req, res, next) {
        console.log('req', req.body)
        User.findOne({where: {email:req.body.email}}).then(userInfo => {
            console.log('res', userInfo)
            if (userInfo) {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({ id: userInfo.id }, req.app.get('secretKey'), { expiresIn: '2h' })
                    res.json({ status: "success", message: "user found!!!", data: {  token: token } });
                } else {
                    res.json({ status: 'error', message: 'invalid email/password', data: null })
                }
            } else {
                res.status(500).json({error: new Error('User not found'), message: 'User not found'})
            }

        })
    },
    getUsersByStoreId: function (req, res, next) {
        const id = req.params.storeId
        User.findAll({ where: { status: 1, store_id: id } }).then(users => {
            console.log('res', users)
            if (users && users.length) {
                res.json({ status: "success", message: "Users list by store id", data: { users } });
            } else {
                res.json({ status: "success", message: "users not fund for this stor eid", data: { users: [] } });
            }

        })
    },
}
