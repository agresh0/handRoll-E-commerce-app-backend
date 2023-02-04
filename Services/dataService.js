const db = require('./db')

// getAllProduct function
const getAllProducts = ()=>{
    return db.Product.find()
    .then((data)=>{
        if(data){
            return{
                statusCode:200,
                result:data
            }
        }
        else{
            return{
                statusCode:404,
                message:"Faialed to fetch the data from database"
            }
        }
    })
}

// add-to-wishlist api
 
const addToWishlist = (id,title,price,description,category,image,rating)=>{
    console.log('inside addToWishlist function definition');
    return db.Wishlist.findOne({
        id,
    }).then((result)=>{
        if(result){
            console.log("Already Added");
            return {
                message:'Already  added',
                statusCode:404
            }
        }
        else {
            console.log('Added Successfully');
            let newProduct = new db.Wishlist({
                id,
                title,
                price,
                description,
                category,
                image,
                rating 
            });
            newProduct.save()
            return {
                message: 'Added Successfully in wishlist',
                statusCode: 200
            }
        }
    })
}

// getWishlist api
const getWishlist = ()=>{
    return db.Wishlist.find()
    .then((data)=>{
        if(data){
            return{
                statusCode:200,
                result:data
            };
        }
        else{
            return{
                statusCode:404,
                message:"Your wishlist is empty"
            };
        }
    })
}

// delete Item api

const deleteItemList = (id)=>{
    return db.Wishlist.deleteOne({
        id
    }).then(
        (data)=>{
            if(data){
                return db.Wishlist.find()
                .then((data)=>{
                    if(data){
                        return{
                            statusCode:200,
                            wishlist:data,
                            message:"Product moved from wishlist"
                        };
                    }
                    else{
                        return{
                            statusCode:404,
                            message:"Your wishlist is empty"
                        };
                    }
                })            }
            else{
                return {
                    statusCode:404,
                    message:"Product not availiable"
               };
            }
        }
    )
        
}


module.exports ={
    getAllProducts,
    addToWishlist,
    getWishlist,
    deleteItemList 
}