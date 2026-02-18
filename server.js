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
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .container {
            background: white;
            padding: 30px;
            border-radius: 12px;
            width: 450px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
        }

        h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #333;
        }

        input {
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
    </style>
</head>
<body>

<div class="container">
    <h2>Student Attendance Tracker</h2>

    <form method="POST" action="/add">
        <input type="text" name="roll" placeholder="Roll Number" required />
        <input type="text" name="name" placeholder="Student Name" required />
        <button type="submit">Add Student</button>
    </form>

    <table>
        <tr>
            <th>Roll</th>
            <th>Name</th>
        </tr>
        ${students.map(s => `
        <tr>
            <td>${s.roll}</td>
            <td>${s.name}</td>
        </tr>
        `).join('')}
    </table>
</div>

</body>
</html>
`);
