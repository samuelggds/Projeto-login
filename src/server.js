import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const port = 3001

const prisma = new PrismaClient()

const app = express()

app.use(express.json())

app.use(cors())




app.get('/users', async (req, res) => {

    const allUsers = await prisma.user.findMany()


    res.status(200).json(allUsers)

})


app.post('/users', async (req, res) => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: parseInt(req.body.age)
        }
    })

    res.status(201).json({ message: 'Usuário criado com sucesso!', user })
})

app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: parseInt(req.body.age)
        }
    })

    res.status(200).json({ message: 'Usuário editado com sucesso!' })
})



app.delete('/users/:id', async (req, res) => {

    await prisma.user.delete({
     where: {
        id: req.params.id
     }
    })

    res.status(200).json({ message: 'Usuário deletado com sucesso!' })

})



app.listen(port, () => {
    console.log(`✔ Servidor online na porta: ${port} ✔`);

})