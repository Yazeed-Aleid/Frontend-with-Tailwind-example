const express =require('express');
let router = express.Router();
// const data = require('../jsonFoulder/blog.json')//data
router.use(express.json())//data
const fs = require('fs')
let data = [
    {id:1,title:"blog",description:"helloooooooo",link:"mfmo"}
]



router.get('/getB' , (req,res)=>{
    res.send(data)
})


router.post('/postDataB',(req,res)=>{
    let newPost = {id:data.length+1,
        title:req.body.title,
        description:req.body.description,
        link:req.body.link}
    data.push(newPost)
    res.send(data)
})

router.put('/blog/:id',(req,res)=>{
    
    let found = data.find((item)=>{
        return item.id === parseInt(req.params.id)
    })
    if(found){
        let update ={   
            id:found.id,
            title:req.body.title,
            description:req.body.description,
            link:req.body.link
        }

        let targetIndex = data.indexOf(found)

        data.splice(targetIndex,1,update)
        
        res.send(data)
        fs.writeFile(data,JSON.stringify(data))
    }else{
        res.sendStatus(404)
    }
    

})

router.delete('/blog/:id',(req,res)=>{
    let found = data.find((item)=>{
        return item.id === parseInt(req.params.id)
    })
    if(found){
        let targetIndex = data.indexOf(found)
        data.splice(targetIndex,1)
        res.send(data)
    }else{
        res.sendStatus(404)
    }
})

 

module.exports=router