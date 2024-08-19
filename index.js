let express = require("express");
const metdodeoverride = require("method-override");
const mysql = require("mysql2");
const path = require("path");
const app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(metdodeoverride("_method"))
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port,()=>
{
    console.log("listening");
})

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : "",
    database : 'bookbazzar'
})




 

// 


app.get("/",(req,res)=>
{
    res.render("index.ejs")
})

app.get("/home",(req,res)=>
{
    res.render("index.ejs");
})
app.post("/searchresult",(req,res)=>
{   
    const name = req.body.searched;
    res.send(`search pagee done ${name}`);
})

app.get("/sellform",(req,res)=>
{
    res.render("sell.ejs");
})

app.post("/submit",(req,res)=>
{
    let bname = req.body.bookname;
    let aname = req.body.authorname;
    let btype = req.body.booktype;
    console.log(btype)
   const p = ["123",bname,aname,btype];
    
    let q = "insert into booksinfo (bid,bookname,bookauthor,booktype) values (?,?,?,?)"
        try{   
    
                conn.query(q,p, (err,result,field) =>
                {    
                if(err) throw err;
                   console.log(result);
                   
                   res.send("hgya");
                })
            
            }catch
            (err)
                {
               console.log(err);
               res.send("some error")
           }
       
      
})


app.get("/yourprofile",(req,res)=>
{
    res.render("profile.ejs");
})

