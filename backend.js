const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const staticpath = path.join(__dirname,'./public');
require('./mongodbs')
const myschema = require('./todoschema');
const { result } = require('lodash');
const app = express();
app.use(express.static(staticpath));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.sendFile('D:/js/database/src/public/todo.html');
})
async function storedata(req,res,next){
     let customer_email = req.query.email;
    let customer_data = req.query.data;
    console.log(typeof(customer_data))
    let data = new myschema({
        email:customer_email,
        data:customer_data
    })
    let result = await data.save();
    next();
}
app.post('/myOrder',storedata,(req,res)=>{
   
    console.log(req.query.data)
    res.send('successfully')
})
async function finddata(req,res,next){
       let result = await myschema.find({});
       let alldata = [];
       res.set('Content-Type','text/json');
       for(let i = 0;i<result.length;i++){
        let singledata = await JSON.parse(result[i].data);
        console.log(typeof(singledata));
        alldata[i] = {
            email:result[i].email,
            data:singledata
           }
       }
       alldata.forEach(element => {
        console.log(element);
       });
      
       res.send(alldata);
       next();
}
app.get('/mytodolist',(req,res)=>{
    res.sendFile('D:/js/database/src/public/sellertodo.html')
})
app.get('/customerdata',finddata,async(req,res)=>{
 res.end();
})

app.post('/delete',async(req,res)=>{
    let deletedata = await myschema.deleteOne({email:req.query.email});
    console.log(deletedata);
    res.send('delete');
})
app.listen(80);
console.log('Server listen on port 80');