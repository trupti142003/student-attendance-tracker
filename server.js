const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage
let students = [];
let attendance = [];

// Get today's date
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// HOME PAGE
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Student Attendance Tracker</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #4e73df, #1cc88a);
            margin: 0;
            padding: 30px;
        }

        h2 {
            text-align: center;
        }

        .section {
            background: white;
            padding: 20px;
            margin-bottom: 30px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }

        input, select {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border-radius: 6px;
            border: 1px solid #ccc;
        }

        button {
            width: 100%;
            padding: 10px;
            background: #4e73df;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
        }

        button:hover {
            background: #2e59d9;
        }

        table {
            width: 100%;
            margin-top: 15px;
            border-collapse: collapse;
        }

        th, td {
            padding: 8px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f8f9fc;
        }

        .present {
            color: green;
            font-weight: bold;
        }

        .absent {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>

<h2>📘 Student Attendance Tracker</h2>

<div class="section">
    <h3>Add Student</h3>
    <form method="POST" action="/add-student">
        <input type="text" name="roll" placeholder="Roll Number" required />
        <input type="text" name="name" placeholder="Student Name" required />
        <button type="submit">Add Student</button>
    </form>
</div>

<div class="section">
    <h3>Mark Attendance</h3>
    <form method="POST" action="/mark-attendance">
        <label>Select Date</label>
        <input type="date" name="date" value="${getTodayDate()}" required />

        <select name="roll" required>
            <option value="">Select Student</option>
            ${students.map(s => `
                <option value="${s.roll}">
                    ${s.roll} - ${s.name}
                </option>
            `).join('')}
        </select>

        <select name="status" required>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
        </select>

        <button type="submit">Mark Attendance</button>
    </form>
</div>

<div class="section">
    <h3>Attendance Records</h3>
    <table>
        <tr>
            <th>Date</th>
            <th>Roll</th>
            <th>Name</th>
            <th>Status</th>
        </tr>

        ${attendance.map(a => `
            <tr>
                <td>${a.date}</td>
                <td>${a.roll}</td>
                <td>${a.name}</td>
                <td class="${a.status === 'Present' ? 'present' : 'absent'}">
                    ${a.status}
                </td>
            </tr>
        `).join('')}
    </table>
</div>

</body>
</html>
    `);
});

// ADD STUDENT
app.post('/add-student', (req, res) => {
    const { roll, name } = req.body;

    if (!students.find(s => s.roll === roll)) {
        students.push({ roll, name });
    }

    res.redirect('/');
});

// MARK ATTENDANCE
app.post('/mark-attendance', (req, res) => {
    const { roll, status, date } = req.body;
    const student = students.find(s => s.roll === roll);

    if (student) {
        const existing = attendance.find(a =>
            a.roll === roll && a.date === date
        );

        if (!existing) {
            attendance.push({
                roll: student.roll,
                name: student.name,
                date: date,
                status: status
            });
        } else {
            existing.status = status;
        }
    }

    res.redirect('/');
});

// START SERVER
app.listen(port, () => {
    console.log("Server running on port " + port);
});
