const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const mysql = require('mysql');
const con = mysql.createConnection({
    host: '192.168.2.8',
    user: 'trainee',
    password: 'trainee@123',
    database: 'trainee',
    timezone: 'utc'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});

app.post('/addEmployee', (req, res) => {
    // console.log(req.body);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let empid = req.body.empid;
    let mobile = req.body.mobile;
    let gender = req.body.gender;
    // let status=req.body.status;
    let address = req.body.address;
    let work_location = req.body.work_location;
    let ssno = req.body.ssno;
    let salary = req.body.salary;

    var query = `INSERT INTO deep_Employee (firstname, lastname, empid, mobile, gender, address,work_location,status) VALUES ("${firstname}","${lastname}","${empid}","${mobile}","${gender}","${address}","${work_location}",1)`;
    var query1 = `Insert into deep_hr1 (ssno,empid,salary) values("${ssno}","${empid}","${salary}")`
    con.query(query, function (err, results) {
        if (err) throw err;
        con.query(query1, function (err,results){
            return res.send({ data: results, message: 'Data Added successfully.' })
        })
     
        })

    
});

app.get('/getEmployeeData', (req, res) => {
    con.query(`select * from deep_Employee where status=1 `, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send(results);
    })
})

app.post('/edit', (req, res) => {
    let id = req.body.id;
    con.query(`select * from deep_Employee where id="${id}"`, (err, results) => {
        if (err) throw err;
        res.send(results);
        // console.log(results);
    })
})

app.post('/update', (req, res) => {
    // console.log(req.body);
    con.query(`UPDATE deep_Employee SET  firstname="${req.body.firstname}",lastname="${req.body.lastname}",mobile="${req.body.mobile}",address="${req.body.address}",work_location="${req.body.work_location}",gender="${req.body.gender}" where empid="${req.body.empid}"`, function (err, results) {
        if (err) throw err;
        res.send(results);
    })
});

app.post('/deleteEmployee', (req, res) => {
    // console.log(req.body)
    con.query(`UPDATE deep_Employee SET status=0 where id="${req.body.ans}"`, function (err, results) {
        if (err) throw err;
        res.send(results);
    })
})

app.get('/gethrdata', (req, res) => {
    const query = `select * from deep_Employee as emp inner join deep_hr1 as hr  on 
                    hr.empid=emp.empid `;

    con.query(query, (err, results) => {
        if (err) throw err;
        console.log(results)
        res.send(results);
    })
})

app.post('/edithrdata', (req,res)=>{
    console.log(req.body)
    // const query = `select * from deep_hr1 where empid="${req.body.id}"`;
    const query = `select * from deep_hr1 as hr inner join deep_Employee as emp 
                    on hr.empid=emp.empid where hr.empid="${req.body.id}"`
    try{
 con.query(query, (err, results) => {
        if (err) throw err; 
        console.log(results);
        res.send(results);
    })
    }catch(err){
        req.status(400).send(err)
    }
   
})

app.post('/Hrupdate', (req, res) => {
    console.log(req.body);
    con.query(`UPDATE deep_hr1 SET ssno="${req.body.ssno}",salary="${req.body.salary}" where empid="${req.body.empid}"`, function (err, results) {
        if (err) throw err;
        res.send(results);
    })
});

// app.post('/deletehr', (req, res) => {
//     // console.log(req.body)
//     con.query(`UPDATE deep_hr1 SET status=0 where id="${req.body.ans}"`, function (err, results) {
//         if (err) throw err;
//         res.send(results);
//     })
// })


app.get('/getworklocation', (req, res) => {
    con.query(`select * from deep_location`, (err, results) => {
        if (err) throw err;
        res.send(results);

    })
})

app.get('/getOfficedata', (req, res) => {
    con.query(`select * from deep_location`, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
})

app.post('/addoffice', (req, res) => {
    // console.log(req.body);

    let buliding_id = req.body.buliding_id;
    let address = req.body.address;
    let zipcode = req.body.zipcode;
    let manager = req.body.manager;
    var query = `INSERT INTO deep_location (buliding_id,  address,zipcode, manager) VALUES ("${buliding_id}","${address}","${zipcode}","${manager}")`;
    con.query(query, function (err, results) {
        if (err) throw err;
        return res.send({ data: results, message: 'Data Added successfully.' });
    });
});

app.post('/editoffice', (req, res) => {
    let id = req.body.id;
    con.query(`select * from deep_location where id="${id}"`, (err, results) => {
        if (err) throw err;
        res.send(results);
        console.log(results);
    })
});

app.post('/updateOffice', (req, res) => {
    // console.log(req.body);
    con.query(`UPDATE deep_location SET buliding_id="${req.body.building_id}", address="${req.body.address}",zipcode="${req.body.zipcode}", manager="${req.body.manager}" where id="${req.body.id}"`, function (err, results) {
        if (err) throw err;
        res.send(results);
    })
});


// app.get('/', (req, res) => {
//     res.send("Hello World!");
// });

app.listen(7000, () => {
    console.log(`Server is running on port 7000.`);
});