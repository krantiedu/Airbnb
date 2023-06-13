var express = require('express');
var router = express.Router();
const userModel = require("./users");
const productModel = require("./product");

const localStrategy = require("passport-local")
const passport = require("passport");
passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("hello")
  productModel.find().then(function(propertise){
    res.render('index',{propertise, user: req.user, isloggedin: req.isLogged});
  })
  
});
router.get('/read', function(req, res, next) {
  userModel.find().then(function(users){
    res.send(users);
  })
});
router.get('/propertydetails', function(req, res, next) {
  res.render("properties");
 
});
router.get('/reserve', isloggedin,function(req, res, next) {
  res.render("reserve");
 
});
router.get('/profile',isloggedin,function(req, res, next) {
  userModel.findOne({username:req.session.passport.user})
  .then(function(logddinUser){
    productModel.find()
    .then(function(properties){
      res.render("profile",{logddinUser,properties ,user: req.user, isloggedin: req.isLogged});
    })
  })
  
 
});

router.get("/dashboard",isloggedin,function(req,res){
  userModel.findOne({username:req.session.passport.user})
  .then(function(logddinUser){
    productModel.find()
    .then(function(properties){
      res.render("dashboard",{logddinUser,properties ,user: req.user, isloggedin: req.isLogged});
    })
  })
  
})

router.get("/delete/:id",isloggedin,function(req,res){
  userModel.findOne({username:req.session.passport.user})
  .then(function(logddinUser){
    productModel.findOneAndDelete({_id:req.params.id})
    .then(function(){
      res.redirect("/dashboard");
    })
  })
  
})

router.get("/update/:id",isloggedin,function(req,res){
  productModel.findOne({_id:req.params.id})
    .then(function(user){
      res.render("update",{user});
    })
  
})

router.post("/updated/:id",isloggedin,function(req,res){
  productModel.findOneAndUpdate({
    city:req.body.city,
    address:req.body.address,
    date:req.body.date,
    price:req.body.price
  })
    .then(function(){
      res.redirect("/dashboard");
    })
  
})

router.post('/property',function(req,res){
  userModel.findOne({username : req.session.passport.user})
  .then(function(user){
    productModel.create({
      userid : user._id,
      city: req.body.city ,
      address: req.body.address,
      date:req.body.date,
      price:req.body.price
    })
    .then(function(userproduct){
        user.products.push(userproduct._id);
        user.save()
        .then(function(){
          res.redirect("/profile");
        })
    })
  })
})

router.get("/readp",function(req,res){
  productModel.find().then(function(p){
    res.send(p)
  })
})





router.post('/register',function(req,res,next){
  var data = new userModel({
    name : req.body.name,
    username : req.body.username,
    email : req.body.email
  })

  userModel.register(data,req.body.password)
  .then(function(createdUser){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
})



router.post("/login" , passport.authenticate("local" ,{
  successRedirect: "/profile",
  failuRedirect: "/login"
}) , function(req,res,next){ } ) ;

router.get("/logout",function(req,res){
  req.logout(function(err){
    if(err){ return next(err);}
    res.redirect("/");
  });
})

function isloggedin(req,res,next){
  if(req.isAuthenticated()){
    req.isLogged = true;
    return next();
  }

  else{
    res.redirect("/login");
  }
}


module.exports = router;
