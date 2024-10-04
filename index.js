const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const users = [
    { id: 1, name: 'najeebkhan', email: 'najeebkhan@gmail.com' },
    { id: 2, name: 'kamranali', email: 'kamranali@gmail.com' }
];

// Error handler middleware
function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong',
        error: true
    });
}

// GET request to fetch all users
app.get('/api/user', (req, res) => {
    res.status(200).json({ message: 'Fetched all users!', data: users });
});

// POST request to create a new user
app.post('/api/user', (req, res) => {
    const user = req.body;
    const newUser = {
        id: users.length + 1,
        ...user
    };
    users.push(newUser);
    res.status(201).json({ message: 'New user created!', data: newUser });
});

// PUT request to update an existing user
app.put('/api/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found!' });
    }

    users[userIndex] = {
        ...users[userIndex],
        ...req.body,
    };

    res.status(200).json({ message: 'User updated!', data: users[userIndex] });
});

// DELETE request to remove a user by ID
app.delete('/api/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found!' });
    }

    users.splice(userIndex, 1);
    res.status(200).json({ message: 'User deleted successfully!' });
});

// Use the error handler middleware
app.use(errorHandler);

// Export the Express app instead of listening to a port
module.exports = app;
