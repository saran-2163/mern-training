const express = require('express')
let mongodb = require('mongodb')

let url = require('../url')
let mcl = mongodb.MongoClient
let router = express.Router()

router.post("/",(req,res)=>{
    let obj = req.body
    mcl.connect(url,(err,conn)=>{
        if(err)
            console.log('Error in connection :-', err)
        else{
            let db = conn.db("nodedb")
            db.collection('products').insertOne(obj, (err) => {
                if (err)
                    res.json({ 'insert': 'Error ' + err })
                else{
                    console.log("Data inserted")
                    res.json({'insert' : 'Success'})
                    conn.close()
                }
            })
        }
    })
})

module.exports = router
