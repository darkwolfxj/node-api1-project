const express = require("express")
const shortid = require("shortid")

const users = [
    {
        id: 1, // hint: use the shortid npm package to generate it
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    }      
]

const server = express()

server.use(express.json())
    
server.get("/api/users", (req, res) => {
    res.status(200).json(users)
})

server.get("/api/users/:id", (req, res) => {
    console.log(req.body.id)
   if (users.map(v => v.id).includes(req.body.id)){
    const request = req.body
    
    const reqUser = users.filter(v => v.id === request.id)
    
    res.status(200).json(reqUser)
   }else{ res.status(404).json({ message: "The user with the specified id does not exist." }) }
})

server.post("/api/users", (req, res) => {
    const newUser = req.body
    console.log(Object.keys(newUser))
    if (Object.keys(newUser).includes("name"&&"bio")){
    newUser.id = shortid.generate()
    users.push(newUser)
    res.status(201).json(newUser)
    } else { res.status(400).json({ errorMessage: "Please provide name and bio for the user" }) }
})

const PORT = 5000
server.listen(PORT, () => console.log(`\n ** server listening on http://localhost:${ PORT } ** \n`))