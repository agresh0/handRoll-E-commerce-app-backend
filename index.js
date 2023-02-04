const express = require('express')

const cors = require('cors')

const dataService = require('./Services/dataService')

const app = express()

app.use(express.json())

app.use(cors({
    origin:"http://localhost:4200"
}))


app.listen(3000,()=>{
    console.log('Server started at port 3000');
})

// getAllProducts API
app.get('/all-products',(req,res)=>{
    console.log('Inside getAllProducts function');
    dataService.getAllProducts()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// add-to-wishlist api
app.post('/add-to-wishlist',(req,res)=>{
    console.log('Inside add-to-wishlist function');
    console.log(req.body);
    dataService.addToWishlist(req.body.id,req.body.title,req.body.price,req.body.description,req.body.category,req.body.image,req.body.rating)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// getWishList api
app.get('/get-wishlist',(req,res)=>{
    console.log('Inside get-wishlist function');
    dataService.getWishlist()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// delete-item-wishlist api
app.delete('/delete-item-wishlist/:id',(req,res)=>{
    console.log('Inside delete function');
    dataService.deleteItemList(req.params.id)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
