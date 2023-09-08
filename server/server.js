import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mysql"
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

con.connect(function(err) {
    if(err) {
        console.log(err)
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

app.get('/getNewQuery', (req, res) => {
    const sql = "SELECT * FROM queries WHERE statusn='New'";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/getPendingQuery', (req, res) => {
    const sql = "SELECT * FROM queries WHERE statusn='Pending'";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.get('/getClosedQuery', (req, res) => {
    const sql = "SELECT * FROM queries WHERE statusn='Closed'";
    con.query(sql, (err, result) => {
        if(err) return res.json({Error: "Get employee error in sql"});
        return res.json({Status: "Success", Result: result})
    })
})

app.put('/close/:id',(req,res) => {
    const id=req.params.id;
    const sql="UPDATE queries set statusn='Closed' WHERE id=?";
    con.query(sql,[id],(err,result) =>{
        if(err) return res.json({Error: "update queries error in sql"});
        return res.json({Status: "Success"})
    })
})

app.put('/pending/:id',(req,res) => {
    const id=req.params.id;
    const sql="UPDATE queries set statusn='Pending' WHERE id=?";
    con.query(sql,[id],(err,result) =>{
        if(err) return res.json({Error: "update queries error in sql"});
        return res.json({Status: "Success"})
    })
})


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are no Authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) return res.json({Error: "Token wrong"});
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        } )
    }
}

app.get('/dashboard',verifyUser, (req, res) => {
    return res.json({Status: "Success", role: req.role, id: req.id})
})


app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login Where email = ? AND  passwordd = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if(err) return res.json({Status: "Error", Error: "Error in runnig query"});
        if(result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({role: "admin"}, "jwt-secret-key", {expiresIn: '1d'});
            res.cookie('token', token);
            return res.json({Status: "Success"})
        } else {
            return res.json({Status: "Error", Error: "Wrong Email or Password"});
        }
    })
})


app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})

app.post('/create',upload.fields([]), (req, res) => {
    const sql = "INSERT INTO queries (`Uname`,`MobNo`,`email`, `queryn`,`statusn`) VALUES (?)";
        const values = [
            req.body.name,
            req.body.mobile,
            req.body.email,
            req.body.query,
            'New'
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Error: "Inside singup query"});
            return res.json({Status: "Success"});
        })
})

app.listen(8081, ()=> {
    console.log("Running");
})