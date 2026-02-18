const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

let students = [];
let attendance = [];

function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
<title>Student Attendance Tracker</title>
</head>
<body>
<h2>Student Attendance Tracker</h2>

<h3>Add Student</h3>
<form method="POST" action="/add-student">
<input type="text" name="roll" placeholder="Roll Number" required />
<input type="text" name="name" placeholder="Student Name" required />
<button type="submit">Add Student</button>
</form>

<h3>Students</h3>
<ul>
${students.map(s => `<li>${s.roll} - ${s.name}</li>`).join('')}
</ul>

</body>
</html>
`);
});

app.post('/add-student', (req, res) => {
    const { roll, name } = req.body;
    students.push({ roll, name });
    res.redirect('/');
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});
