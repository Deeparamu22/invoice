const express = require('express')
const app= express();
const port =5009;
const database =require ("mysql");
const bodyParser=require("body-parser");
const db=database.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"invoice",
});
let ele;
let value;
let values=[];
let json;
let urlid;
var urlencodeParser=bodyParser.urlencoded({extended: false})
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(express.static('public'));
db.connect((err,res)=>{
    if(err){
        console.log(err);
    }
    else{
        // var sql=   `INSERT INTO Persons (${keys[0]}, ${keys[1]}, ${keys[2]}, ${keys[3]}, ${keys[4]}, ${keys[5]},${keys[6]},${keys[7]},${keys[8]},${keys[9]},${keys[10]},${keys[11]}) VALUES ?`
        // var sql="DROP TABLE Persons;";
        var sql= `select * from Persons`
        // var sql=`CREATE TABLE Persons (${keys[0]} varchar(255),${keys[1]} varchar(255),${keys[2]} varchar(255),${keys[3]} varchar(255),${keys[4]} int,${keys[5]} varchar(255),${keys[6]} varchar(255),${keys[7]} varchar(255),${keys[8]} json,${keys[9]} json,${keys[10]} json,${keys[11]} varchar(255)); `;
        db.query(sql,[values],(err,respond)=>{
            if(err!=null)
            {
                console.log(err);
            }
            convertparse(JSON.parse(JSON.stringify(respond)));
        })
        console.log("connected");
        
    }
})
function convertparse(a){
    value=a;
    value.forEach(a=>{
        a.senderAddress=JSON.parse(a.senderAddress);
        a.clientAddress=JSON.parse(a.clientAddress);
        a.items=JSON.parse(a.items);
        
        a.total=parseFloat(a.total.toString()).toFixed(2);
        a.items.forEach(e=>{
            if(e.price!=undefined){
                e.price=parseFloat(e.price.toString()).toFixed(2);
                e.total=parseFloat(e.total.toString()).toFixed(2);
            }
            
        })
    })
}

app.post("/index",urlencodeParser,(req,res)=>{
    suma(req,"newinvoice");
            let sql="INSERT INTO `Persons` (`id`, `createdAt`, `paymentDue`, `description`, `paymentTerms`, `clientName`, `clientEmail`, `status`, `senderAddress`, `clientAddress`, `items`, `total`) VALUES ('"+json.id+"','"+json.createdAt+"','"+json.paymentDue+"','"+json.description+"',"+json.paymentTerms+",'"+json.clientName+"','"+json.clientEmail+"','"+json.status+"','"+json.senderAddress+"','"+json.clientAddress+"','"+json.items+"','"+json.total+"');"
            db.query(sql,(err,respond)=>{
                if(err!=null)
                {
                    console.log(err);
                }
            })
    res.redirect("/index");
})

app.get('/index',(req,res)=>{
    var sql;
    if(req.query.id!=undefined)
    {
        sql="DELETE FROM `Persons` WHERE `id` = '"+req.query.id+"';"
        db.query(sql,(err,respond)=>{
            if(err!=null)
            {
                console.log(err);
            }
        })
    }
    db.query(`select * from Persons`,(err,respond)=>{
        if(err!=null)
        {
            console.log(err);
        }
        convertparse(JSON.parse(JSON.stringify(respond)));
    });
    let variable2="assets/logo.svg";
    let variable1="assets/icon-moon.svg";
    let variable3="assets/image-avatar.jpg";
    let object=value;
    let arrow1="assets/icon-arrow-down.svg"
    let arrow2="assets/icon-arrow-right.svg"
    let image="assets/illustration-empty.svg"
    res.render("index",{variable2,variable1,variable3,object,arrow1,arrow2,image});
});
app.get('/viewInvoice',(req,res)=>{
    let sql;
    if(req.query.changeStatus=="change")
    {
        sql="UPDATE `Persons` SET `status`='paid' WHERE `id`='"+req.query.id+"';"
        db.query(sql,(err,respond)=>{
            if(err!=null)
            {
                console.log(err);
            }
        })
    }
    db.query(`select * from Persons`,(err,respond)=>{
        if(err!=null)
        {
            console.log(err);
        }
        convertparse(JSON.parse(JSON.stringify(respond)));
    });
    urlid=req.query.id;
    idCheck(urlid);
    let object1=ele;
    let variable2="assets/logo.svg";
    let variable1="assets/icon-moon.svg";
    let variable3="assets/image-avatar.jpg";
    res.render("viewInvoice",{variable2,variable1,variable3,object1});
})
app.post("/viewInvoice",urlencodeParser,function(req,res){
    suma(req,"viewinvoice");
    let sql="UPDATE `Persons` SET `id`='"+json.id+"',`createdAt`='"+json.createdAt+"',`paymentDue`='"+json.paymentDue+"',`description`='"+json.description+"',`paymentTerms`='"+json.paymentTerms+"',`clientName`='"+json.clientName+"',`clientEmail`='"+json.clientEmail+"',`status`='"+json.status+"',`senderAddress`='"+json.senderAddress+"',`clientAddress`='"+json.clientAddress+"',`items`='"+json.items+"',`total`='"+json.total+"' WHERE `id`='"+urlid+"';"
            db.query(sql,(err,respond)=>{
                if(err!=null)
                {
                    console.log(err);
                }
            })
    res.redirect("/index");
})
function idCheck(a)
{   
    value.forEach(element => {
        if(element.id==a)
        {
           ele=element;
        }
    });
}

function suma(req,a)
{
    let alpha="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id="";
    if(a=="newinvoice")
    {
        id+=alpha[Math.floor(Math.random()*alpha.length)];
        id+=alpha[Math.floor(Math.random()*alpha.length)];
        for(let i=2; i<6; i++)
        {
          id+=Math.floor(Math.random()*9);
        }
    }
    else{
        id=urlid;
    }
    let items=[];
    let total=0;
    let date=new Date(req.body.invoiceDate);
    date.setDate(date.getDate()+Number(req.body.paymentTerm));
    if(typeof req.body.name=="object")
    {
        for(var i=0; i<req.body.name.length; i++)
        {
            items.push({
                "name":req.body.name[i],
                "quantity":req.body.quantity[i],
                "price":req.body.price[i],
                "total":Number(req.body.price[i])*Number(req.body.quantity[i])
            })
            total+=Number(req.body.price[i])*Number(req.body.quantity[i]);
        }
    }
    else{
        items.push({
            "name":req.body.name,
            "quantity":req.body.quantity,
            "price":req.body.price,
            "total":Number(req.body.quantity)*Number(req.body.price)
        })
        total=Number(req.body.quantity)*Number(req.body.price);
    }
    let status;
    if(req.body.submit=="Save as Draft")
    {
        status="draft"
    }
    else{
        status="pending"
    }
    json={
        "id": id,
        "createdAt": req.body.invoiceDate,
        "paymentDue": `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
        "description": req.body.description,
        "paymentTerms":Number(req.body.paymentTerm),
        "clientName": req.body.clientName,
        "clientEmail": req.body.clientEmail,
        "status": status,
        "senderAddress": JSON.stringify({
          "street": req.body.senderAddressstreet,
          "city": req.body.senderAddresscity,
          "postCode": req.body.senderAddresspostcode,
          "country": req.body.senderAddresscountry
        }),
        "clientAddress": JSON.stringify({
          "street": req.body.clientAddressstreet,
          "city": req.body.clientAddresscity,
          "postCode": req.body.clientAddresspostCode,
          "country": req.body.clientAddresscountry
        }),
        "items":JSON.stringify(items),
        "total": total.toString()
    }
}
app.listen(port, ()=> console.log("listening"));