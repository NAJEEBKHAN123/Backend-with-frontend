const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use(cors())

const users = [
    {id: 1, name: 'najeebkhan', email: 'najeebkhan@gmail.com'},
    {id: 2, name: 'kamranali', email: 'kamranali@gmail.com'}
]


function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong',
        error: true
    })
}

// GET request  

app.get('/api/user', (req, res) =>{
    res.status(200).json({ message: 'Fetched all users!', data: users })
})

// POST Requst  create new user 

app.post('/api/user', (req, res) =>{
    const user = req.body;
    const newuser = {
        id: users.length + 1,
        ...user
    }
    users.push(newuser)
    res.status(201).json({ message: 'new User created!', data: newuser })
})

//update users

app.put('/api/user/:id', (req, res) =>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId)
    if(userIndex === -1){
        res.status(404).json({message: "User not found!"})
    }
    users[userIndex] ={
        ...users[userIndex],
        ...req.body,
}
res.status(201).json({ message: 'new User created!', data: users[userIndex] })
   
})

// delete user 

app.delete('/api/user/:id',(req, res) =>{
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId)

    if(userIndex === -1){
        res.status(404).json({message: "User not found!"})
    }
    else{
        users.splice(userIndex, 1);
        res.status(201).json({ message: 'users deleted successfully!'})
        
    }
})

app.use(errorHandler);


app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`)
})