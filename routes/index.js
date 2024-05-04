var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
//const {  routes } = require('../app');
let x;
let name;
let userRoles;
let sa;
let email;
router.use(bodyParser.json());

/* GET home page. */
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/submit',function(req,res,next){
     let memberType=req.body.memberType;
     console.log(memberType);
     const membername=req.body.memberName;
     console.log(membername);
     const admno=req.body.membershipID;
     console.log(admno);
     const query = 'SELECT * FROM library.member WHERE memtype=? AND fname = ? AND admno = ?';
     con.query (query, [memberType,membername,admno], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
       x=results.map((result)=>({
        field1 : result.fname,
        field2 : result.lname,
        field3 : result.membershipid,
        field4 : result.branch,
        field5 : result.phno,
        field6 : result.email,
        field7 : result.admno
    }))
    name=results[0].fname;
    email=results[0].email;
    if(results.length>0){
       userRoles = results[0].memtype;
      if(userRoles.includes('Student')){
      //res.render('home',{x,userRoles});
      const querys='select * from library.booked where namel=?';
      con.query(querys, [name], (err, results) => {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        let y=results.map((result)=>({
          field1 : result.bookname,
          field2 : result.author,
          field3 : result.bookedon,
          field4 : result.befor,
          field5 : result.returnedon
      }))
      res.render('home',{x,userRoles,y});
      }
      )
    }
    else {
      res.render('home1',{x,userRoles})
    }
  }
    else{
      res.send('Incorrect username or password');
    }

  }
     )




})
router.post('/register',function(req,res){
 res.render('register')

});
//router.post('/register',function(req,res){
  //res.render('register')

  // Middleware to parse JSON requests
  //router.use(bodyParser.json());
  
  // Configure nodemailer with your email service details
  
  
  // Route to handle registration
  router.post('/regist', (req, res) => {
    const firstname = req.body.firstName;
    const lastname=req.body.lastName;
const branch=req.body.Branch;
const semster=req.body.Semster;
const email=req.body.email;
const phoneNumber=req.body.phoneNumber;
const rollNumber=req.body.rollNumber;
const admissionNumber=req.body.admissionNumber;
  
    // Check if the data is present in the 'users' table
    const query = 'SELECT * FROM library.student WHERE fname= ? AND admno = ?';
  
    con.query (query, [firstname,admissionNumber], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (results.length > 0) {
        // Data is present in the 'users' table
        // Add the data to another table (e.g., 'valid_students')
       /* function generateRandomId(prefix, length) {
          const characters = '0123456789';
          let randomPart = '';
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomPart += characters.charAt(randomIndex);
          }
          return `${prefix}${randomPart}`;
        }*/
        
      
        
        const querys = 'INSERT INTO library.member(fname,lname,admno,branch,phno,email) VALUES (?, ?, ?, ?, ?, ?)';
        con.query (querys,[firstname,lastname,admissionNumber,branch,phoneNumber,email], (err,results) => {
          if (err) {
            console.error('Error inserting data into library.member table:',err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          res.status(201).json({ message: 'Registration successful' });
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'meenakshysanthosh675@gmail.com',
              pass: 'xkgq xqqs ixes eydm'
            }
          });
          
          var mailOptions = {
            from: '3admbbs@gmail.com',
            to: email,
            subject: 'Sending Email from mssl',
            text: 'REGISTRATION SUCCESSFULL'
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })
          res.render('succ')
        });
      } else {
        // Data is not present in the 'users' table
        res.status(401).json({ error: 'Invalid student' });
      }
    });
   // res.render('succ')
  });
  
  // Start the server
  router.post('/bo',(req,res) =>{
    const query = 'SELECT * FROM library.book where availability="avail"';
    con.query(query,(queryError, results) => {
      if (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.render('error', { message: 'Error querying the database' });
        return;
      }
       sa=results.map((result)=>({
          field1 : result.bookname,
          field2 : result.author,
          field3 : result.bookid
      }))
      console.log(sa);
      res.render('bname',{sa})
})
  })
  router.post('/search',(req,res) =>{
    const text=req.body.sear;
    const query = 'SELECT * FROM library.book where availability="avail" and bookname = ?';
    con.query(query,[text],(queryError, results) => {
      if (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.render('error', { message: 'Error querying the database' });
        return;
      }
       sa=results.map((result)=>({
          field1 : result.bookname,
          field2 : result.author,
          field3 : result.bookid
      }))
      console.log(sa);
      res.render('bname',{sa})
})
  })
  router.post('/logout',(req,res) =>{
res.redirect('/');
  }
  );
  router.post('/boo',(req,res) =>{
    const query = 'SELECT * FROM library.book';
    con.query(query,(queryError, results) => {
      if (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.render('error', { message: 'Error querying the database' });
        return;
      }
      let s=results.map((result)=>({
          field1 : result.bookname,
          field2 : result.author,
          field3 : result.bookid,
          field4 : result.availability
      }))
      console.log(s);
      res.render('bna',{s})
})
  })
  router.post('/std',(req,res) =>{
    const query = 'SELECT * FROM library.member where memtype = "Student"';
    con.query (query, (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
       let u=results.map((result)=>({
        field1 : result.fname,
        field2 : result.lname,
        field3 : result.branch,
        field4 : result.phno,
        field5 : result.email,
        field6 : result.membershipid
    }))
res.render('users',{u})
  }
    )
  }
  )
  router.post('/add',(req,res) =>{
    res.render('add')
  })
  router.post('/appr',(req,res) =>{
    const bname=req.body.name;
    const auth=req.body.owner;
    const id=req.body.fro;
    const query = 'insert into library.book(bookname,author,bookid) values(?,?,?)';
    con.query (query,[bname,auth,id],(err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
     res.render('add');
    }
    )
  }
  )
  router.post('/ybedit',(req,res) =>{
    const bname=req.body.fro;
    const auth=req.body.des;
    const query = 'insert into library.booked(bookname,author,bookedon,namel) values(?,?,CURDATE(),?)';
    con.query (query,[bname,auth,name],(err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      const querys='update library.booked set befor=DATE_ADD(CURDATE(),INTERVAL 7 DAY)';
      con.query (querys,(err, results) => {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.render('bname',{sa})
      }
      )
      //res.render('bname',{sa}); 
    }
    )
    
  })
 router.post('/ho',(req,res) =>{
   const querys='select * from library.booked where namel=?';
      con.query(querys, [name], (err, results) => {
        if (err) {
          console.error('Error querying database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        let y=results.map((result)=>({
          field1 : result.bookname,
          field2 : result.author,
          field3 : result.bookedon,
          field4 : result.befor,
          field5 : result.returnedon
      }))
      res.render('home',{x,userRoles,y});
      }
      )
 })
 router.post('/ret',(req,res) =>{
  const querys='select * from library.booked where returnedon IS NULL';
  con.query(querys,(err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    let y=results.map((result)=>({
      field1 : result.bookname,
      field2 : result.author,
      field3 : result.bookedon,
      field4 : result.befor,
      field5 : result.namel
  }));
  console.log(y);
  res.render('returnstatus',{y});
  }
  )
 }
 )
 router.post('/retu',(req,res) =>{
  const bname=req.body.bname;
  const uname=req.body.uname;
  const querys='select * from library.booked where bookname=? AND namel=? AND returnedon IS NULL';
  con.query(querys,[bname,uname],(err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
   const c=results[0].idbooked;
   console.log(c);
   const query='update library.booked set returnedon=CURDATE() where idbooked=?';
   con.query(query,[c],(err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const querys='select * from library.booked where returnedon IS NULL';
  con.query(querys,(err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    let y=results.map((result)=>({
      field1 : result.bookname,
      field2 : result.author,
      field3 : result.bookedon,
      field4 : result.befor,
      field5 : result.namel
  }));
  console.log(y);
  res.render('returnstatus',{y});
}
  )
  }
   )
  }
  )

 }
 )
 router.post('/ybedi',(req,res) =>{
  const bname=req.body.fro;
  const uname=req.body.des;
  const querys='select * from library.booked where bookname=? AND author=?';
  con.query(querys,[bname,uname],(err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    let y=results.map((result)=>({
      field1 : result.bookname,
      field2 : result.author,
      field3 : result.bookedon,
      field4 : result.befor,
      field5 : result.namel,
      field6 : result.returnedon
  }));
  console.log(y);
  res.render('returnstatu',{y});
}
  )
 

})
router.post('/ho1',(req,res) =>{
  res.render('home1',{x,userRoles});
})
router.post('/avail',(req,res) =>{
  const bname=req.body.body;
  const querys='update library.book set availability="avail" where bookname = ?';
  con.query(querys,[bname],(err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const query = 'SELECT * FROM library.book';
    con.query(query,(queryError, results) => {
      if (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.render('error', { message: 'Error querying the database' });
        return;
      }
      let s=results.map((result)=>({
          field1 : result.bookname,
          field2 : result.author,
          field3 : result.bookid,
          field4 : result.availability
      }))
      console.log(s);
      res.render('bna',{s})
})
  }
  )
})
router.post('/navail',(req,res) =>{
  const bname=req.body.body;
  const querys='update library.book set availability="not avail" where bookname = ?';
  con.query(querys,[bname],(err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const query = 'SELECT * FROM library.book';
    con.query(query,(queryError, results) => {
      if (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.render('error', { message: 'Error querying the database' });
        return;
      }
      let s=results.map((result)=>({
          field1 : result.bookname,
          field2 : result.author,
          field3 : result.bookid,
          field4 : result.availability
      }))
      console.log(s);
      res.render('bna',{s})
})
  }
  )
})
router.post('/delete',(req,res) =>{
  const bname=req.body.body;
  const querys='delete from library.book where bookname = ?';
  con.query(querys,[bname],(err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const query = 'SELECT * FROM library.book';
    con.query(query,(queryError, results) => {
      if (queryError) {
        console.error('Error executing SQL query:', queryError);
        res.render('error', { message: 'Error querying the database' });
        return;
      }
      let s=results.map((result)=>({
          field1 : result.bookname,
          field2 : result.author,
          field3 : result.bookid,
          field4 : result.availability
      }))
      console.log(s);
      res.render('bna',{s})
})
  }
  )
})
router.post('/conta',(req,res) =>{
  res.render('conta',{name,email});
})
router.post('/cont',(req,res) =>{
  res.render('cont',{name,email});
})
router.post('/nota',(req,res) =>{
  const query ='select * from library.contacts where too="admin"';
  con.query(query,(queryError,results) => {
    if (queryError) {
      console.error('Error executing SQL query:', queryError);
      res.render('error', { message: 'Error querying the database' });
      return;
    }
    let s=results.map((result)=>({
      field1 : result.name,
      field2 : result.message
  }))
  res.render('nota',{s});
  }
  )
})
router.post('/not',(req,res) =>{
  const query ='select * from library.contacts where too=?';
  con.query(query,[name],(queryError,results) => {
    if (queryError) {
      console.error('Error executing SQL query:', queryError);
      res.render('error', { message: 'Error querying the database' });
      return;
    }
    let s=results.map((result)=>({
      field1 : result.name,
      field2 : result.message
  }))
  res.render('not',{s});
  }
  )
  
})
router.post('/conts',(req,res) =>{
  const name=req.body.name;
  const too=req.body.too;
  const message=req.body.message;
  const query ='insert into library.contacts(name,message,too) values(?,?,?)';
  con.query(query,[name,message,too],(queryError,results) => {
    if (queryError) {
      console.error('Error executing SQL query:', queryError);
      res.render('error', { message: 'Error querying the database' });
      return;
    }
    res.render('conta',{name,email});
  }
  )
})
router.post('/contaa',(req,res) =>{
  const name=req.body.name;
  const message=req.body.message;
  const query ='insert into library.contacts(name,message,too) values(?,?,"admin")';
  con.query(query,[name,message],(queryError,results)=>{
    if (queryError) {
      console.error('Error executing SQL query:', queryError);
      res.render('error', { message: 'Error querying the database' });
      return;
    }
    res.render('cont',{name,email});
  }
  )
})

module.exports = router;


