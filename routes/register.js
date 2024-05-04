var express = require('express');
var mysql = require('mysql');
var router=express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { router } = require('../app');

const app = express();
const port = 3000;

// Create a connection to the MySQL database
var con1 = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'library',
});

// Connect to the database
con1.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Express' });
// Middleware to parse JSON requests
router.use(bodyParser.json());

// Configure nodemailer with your email service details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'meenakshysanthosh675@gmail.com',
    pass: 'meenu@2003',
  },
});

// Route to handle registration
router.post('/register', (req, res) => {
  const { firstname,lastname,Semster,Branch,admissionNumber,rollNumber,phoneNumber,email  } = req.body;

  // Check if the data is present in the 'users' table
  const query = 'SELECT * FROM student WHERE fname= ? AND admno = ?';

  con1.query(query, [firstname,admissionNumber], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length > 0) {
      // Data is present in the 'users' table
      // Add the data to another table (e.g., 'valid_students')
      function generateRandomId(prefix, length) {
        const characters = '0123456789';
        let randomPart = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomPart += characters.charAt(randomIndex);
        }
        return `${prefix}${randomPart}`;
      }
      
      const membershipId = generateRandomId('MEMID', 6); // Adjust the length as needed
      
      const query = 'INSERT INTO member (firstname,lastname,admissionNumber,membershipId,Branch,phoneNumber,email) VALUES (?, ?, ?, ?, ?, ?, ?)';
      con1.query(query,[firstname,Semster,Branch,admissionNumber,rollNumber,phoneNumber,email], (insertError) => {
        if (insertError) {
          console.error('Error inserting data into valid_students table:', insertError);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.status(201).json({ message: 'Registration successful' });

        // Send an email with the Membership ID
        const mailOptions = {
          from: 'meenakshysanthosh675@gmail.com',
          to: email,
          subject: 'Membership ID',
          text: `Thank you for registering! Your Membership ID is: ${membershipId}`,
        };

        transporter.sendMail(mailOptions, (mailError, info) => {
          if (mailError) {
            console.error('Error sending email:', mailError);
            res.status(500).json({ error: 'Failed to send email' });
            return;
          }

          console.log('Email sent:', info.response);
          res.status(201).json({ message: 'Registration successful. Membership ID sent to your email.' });
        });
      });
    } else {
      // Data is not present in the 'users' table
      res.status(401).json({ error: 'Invalid student' });
    }
  });
});

})