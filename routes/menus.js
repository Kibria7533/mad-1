const router = require('express').Router();
const Mymenus = require('../models/Menus');
const Posts = require("../models/Posts");
const {body, check, validationResult } = require('express-validator');

router.post('/add_simple_menus', async (req, res) => {

    const {Topic}=req.body;
    await Mymenus.updateOne({},
        { $push: { menus: Topic } }).then(data=>{
            if(!data.n){
                const newpost =new Posts({
                    "Topic":Topic
                });
                newpost.save((err,savedata)=>{
                    if(err)
                    throw res.send("data cant be save");
                    
                })
                const menu = new Mymenus({});
                    menu.save(async (err, data) => {
                        if (err)
                            return res.send(err)
                            if(data){
                           const menusave=await Mymenus.updateOne({},
                                { $push: { menus: Topic } })

                                res.send("Menu created");
                            }
                            
            
                    });
            }
            else{
                const newpost =new Posts({
                    "Topic":Topic
                });
                newpost.save((err,savedata)=>{
                    if(err)
                    throw res.send("data cant be save");
                    res.send("Menu created");
                    
                })
            }
        })

       
       
 
})
router.post('/add_sub_menu_holder', async (req, res) => {
    const {Topic}=req.body;
    await Mymenus.updateOne({},
        { $push: { menuwithsub: { "name": Topic } } }).then(data => {
            if(!data.n){
                const menu = new Mymenus({});
                menu.save(async (err, data) => {
                    if (err)
                        return res.send(err)
                        if(data){
                       const menusave=await Mymenus.updateOne({},
                        { $push: { menuwithsub: { "name": Topic } } })

                            res.send("Menu created");
                        }
                        
        
                });

            }
            else{
                res.send("Menu created");
            }
            
        }).catch(err => {
            res.send(err)
        })

})
router.post('/add_submenu_on_submenuholder',[ check('name').not().isEmpty().withMessage('Fullname can not be empty')], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var errorResponse = errors.array({ onlyFirstError: true });
      return res.status(422).json({ message: errorResponse[0] });
    }
    const {name,Topic}=req.body
    await Mymenus.updateOne({ "menuwithsub.name": name },
        { $push: { "menuwithsub.$.submenus": Topic } }).then(data => {
           
            const newpost =new Posts({
                "Topic":Topic
            });
            newpost.save((err,savedata)=>{
                if(err)
                throw res.send("data cant be save");
                res.send('menu created');
            })
        }).catch(err => {
            console.log(err);
        })

})
router.post('/add_mega_menu_holder', async (req, res) => {
    const {Topic}=req.body;
    await Mymenus.updateOne({},
        { $push: { menuwithmega: { "name": Topic } } }).then(data => {
           if(!data.n){
            const menu = new Mymenus({});
            menu.save(async (err, data) => {
                if (err)
                    return res.send(err)
                    if(data){
                   const menusave=await  Mymenus.updateOne({},
                    { $push: { menuwithmega: { "name": Topic } } })

                        res.send("Menu created");
                    }
                    
    
            });
           }
           else{
            res.send("Menu created");
           }
        }).catch(err => {
            res.send(err);
        })

})
router.post('/add_sub_menu_on_megamenu_holder',[ check('name').not().isEmpty().withMessage('Fullname can not be empty')], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        var errorResponse = errors.array({ onlyFirstError: true });
      return res.status(422).json({ message: errorResponse[0] });
    }
  const {name,Topic}=req.body
  console.log(name,Topic);
    await Mymenus.updateOne({ "menuwithmega.name": name },
        { $push: { "menuwithmega.$.submenus": Topic } }).then(data => {
            console.log(data);
            const newpost =new Posts({
                "Topic":Topic
            });
            newpost.save((err,data)=>{
                if(err)
                throw res.send("data cant be save");
               res.send(data);
            })
        }).catch(err => {
            console.log(err);
        })

})
router.get('/create_menus_scheama', async (req, res) => {
        const me = new Mymenus({});
        me.save((err, data) => {
            if (err)
                return res.send(err)
            res.send(data);

        });
   

})

router.get('/getallmegamenuholder',async(req,res)=>{
    const megamenus=await Mymenus.find({},{"menuwithmega.name":1})
    res.send(megamenus);
})
router.get('/getallsubmenuholder',async(req,res)=>{
    const submenus=await Mymenus.find({},{"menuwithsub.name":1})
    res.send(submenus);
})

router.get('/allmenus',async(req,res)=>{
    const allmenus=await Mymenus.find({});
    res.send(allmenus);
})
router.post('/get_particuler_submenus',async(req,res)=>{
    const {topic}=req.body;
    const submenus=await Mymenus.find({"menuwithsub.name":topic},{menuwithsub:{$elemMatch:{"name":topic}}})
    res.send(submenus);
})
router.post('/get_particuler_mega_submenus',async(req,res)=>{
    const {topic}=req.body;
    const submenus=await Mymenus.find({"menuwithmega.name":topic},{menuwithmega:{$elemMatch:{"name":topic}}})
    res.send(submenus);
})
router.get('/only_menus',async(req,res)=>{
    const simplemenus=await Mymenus.find({},{menus:1});
    res.send(simplemenus);
})
router.post('/deleteasimplemenue',async(req,res)=>{
    const {topic}=req.body;
    const data=await Mymenus.updateOne({},{$pull:{"menus":topic}})
    res.send(data);
})

router.post('/delete_a_subholeder',async(req,res)=>{
    const {subholder}=req.body;
    const data=await Mymenus.updateOne({},
        { $pull: { menuwithsub: { "name": subholder} } })
    res.send(data);
})
router.post('/delete_a_megaholder',async(req,res)=>{
    const {megaholder}=req.body;
    const data=await Mymenus.updateOne({},
        { $pull: { menuwithmega: { "name": megaholder} } })
    res.send(data);
})
router.post('/delete_a_sub_submenu',async(req,res)=>{
             const {submenuholder,submenu}=req.body;
    const data=await Mymenus.updateOne({"menuwithsub.name":submenuholder},
        {$pull:{"menuwithsub.$.submenus":submenu}})
        res.send(data);
})
router.post('/delete_a_sub_megamenu',async(req,res)=>{
    const {megamenuholder,submenu}=req.body;
const data=await Mymenus.updateOne({"menuwithmega.name":megamenuholder},
{$pull:{"menuwithmega.$.submenus":submenu}})
res.send(data);
})
module.exports = router;