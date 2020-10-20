const storeModel = require('../models/stores');
const Sequelize = require('sequelize')

const db = require("../../db");

const Store = storeModel(db.sequelize, Sequelize)

module.exports = {

    getById: function (req, res, next) {
        Store.findByPk(req.params.storeId).then(response=>{
            console.log('res',response)
            if(response) {
              
                res.json({ status: "success", message: "Store list found!!!", data: { store: response } });
            } else{
                res.json({ status: "success", message: "Store list not found!!!", data: { store: [] } });
            }
            
        })
    },
    getAll: function (req, res, next) {
        Store.findAll({where: {status:1}}).then(response=>{
            console.log('res',response)
            if(response && response.length) {
              
                res.json({ status: "success", message: "Store list found!!!", data: { stores: response } });
            } else{
                res.json({ status: "success", message: "Store list not found!!!", data: { stores: [] } });
            }
            
        })
    },
    updateById: function (req, res, next) {
        const id = req.params.storeId;
        Store.update(req.body,{where: {id:id }}).then(response=>{
            console.log('res',response)
            if(response) {
              
                res.json({ status: "success", message: "store updated successfully", data: { store: response } });
            } else{
                res.json({ status: "success", message: "Store list not found!!!", data: { store: [] } });
            }
            
        })
    },
    deleteById: function (req, res, next) {
        const id = req.params.storeId;
        // Store.destroy({where: {id:id }}).then(response=>{
        //     console.log('res',response)
        //     res.json({ status: 'success', message: 'deleted successfully' })
            
        // })
        Store.update({status: 0},{where: {id:id }}).then(response=>{
            console.log('res',response)
            res.json({ status: 'success', message: 'deleted successfully' })
            
        })
    },
    create: (req, res, next) => {
        Store.create({ name: req.body.name,code: req.body.code,email: req.body.email,mobile: req.body.mobile}).then(response=>{
            console.log('res', response)
            if(response) {
                res.json({ status: "success", message: "store added succsully", data: { store: response } });
            } else {
                res.json({ status: "success", message: "something went wrong",  });
            }
            
        })
     
    }
}