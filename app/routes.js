// app/routes.js

//load the gem model.

var Gem = require('./models/gem');
var Product = require('./models/gem');
var Shoe = require('./models/shoe');
var AllShoe = require('./models/allshoe');
var Page = require('./models/page');
var Heart = require('./models/heart');
var Thumbnail = require('./models/thumbnail');
var Email = require('./models/emaillist');
var Order = require('./models/order');
//var Heart = require('./models/heartscount');
var User = require('./models/user');
var CheckoutItem = require('./models/checkout');
var jwt  = require('jsonwebtoken');
var Hogan = require('hogan.js');
var fs = require('fs'); // node's baked in file-system module;
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport'); 
var template = fs.readFileSync('./public/views/pages/newsletter/newsletter1.hjs', 'utf-8');
var compiledTemplate = Hogan.compile(template);

//get file (email template);
//complile template;

var options = {
  auth: {
    api_user: 'ohrha',
    api_key: 'tchuva2ed'
  }
}

var client = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "t.brixton@gmail.com",
        pass: "5613111111"
    }
});
  /* var client = nodemailer.createTransport({
        service: 'Zoho',
        auth: {
            user: 'cruiserweights@zoho.com', // Your email address
            pass: 'PAssword123!@#' // Your password
        },
        tls: { rejectUnauthorized: false }
    });
*/

//var admin 
var heart = 8;
var id ="";
var secret= "haileselassie";

//expose the routes to our app with module.exports

module.exports = function(app){// passed when we required the routes.js file in server.js
    
  app.get('/api/users',function(req,res){

        console.log(res);
        User.find(function(err,users){

            res.json(users);

        });

    });

    app.post('/api/users', function(req,res){

        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.name = req.body.name;
        user.temporarytoken = jwt.sign({ username: user.username, email: user.email },secret,{ expiresIn: '24h'});
       // console.log(err);

        //console.log(req);
        console.log(user);

        if (req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == ""||
         req.body.email == null || req.body.email == ""|| req.body.name== null || req.body.name == ''){
            res.json({success: false, message:"Ensure username, email, name and password are provided"});
            

        }else{

        user.save(function(err){
            console.log(err);
            if(err){
                
               if(err.errors != null){

                    if(err.errors.name){
                        res.json({success:false,message:err.errors.name.message});
                    }else if(err.errors.email){
                        res.json({success:false,message:err.errors.email.message});
                    }else if(err.errors.username){
                        res.json({success:false, message: err.errors.username.message})
                    }else if(err.errors.password){
                        res.json({success: false, message: err.errors.password.message});
                    }else{
                    res.json({ success:false, message: err});
                    }
               } else if (err) {

                   if(err.code == 11000){
                       if(err.errmsg[61]=='u'){
                        res.json({success: false, message: "That username is already taken..."});
                       }else if(err.errmsg[61]=="e"){
                        res.json({success:false, message: "That email is already taken..."});j
                       }
                    }else{
                        res.json({success:false, message: err});
                    }
               }
            }else{
                        var email = {
                            from: 'A House Of Jewels, admin@hoj.com',
                            to: user.email,
                            subject: 'Activation Link Request',
                            text: 'Hello ' + user.name + ', You recently requested a new account activation link. Please click on the following link to complete your activation: https://immense-dusk-71112.herokuapp.com/activate/' + user.temporarytoken,
                            html: 'Hello<strong> ' + user.name + '</strong>,<br><br>You recently requested a new account activation link. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8888/activate/' + user.temporarytoken + '">http://localhost:8888/activate/</a>'
                        };

                    // Function to send e-mail to user
                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err); // If error in sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log confirmation to console
                        }
                    });


                res.json({success:true,message:"Account registerd, please check your email for activation"});
            }
        });
        }
 });

app.put('/api/pages',function(req,res){

    Page.find({},function(err,page){

        if(err) throw err;
        if(!page){
            res.json({success: false, message: "No pages found..."});

        }else{
            res.json({success: true, message: "OY. Here's yo pages!", page: page});
        }
        


    });


});
app.put('/api/allshoes', function(req,res){

     AllShoe.find({}, function(err,allshoes){

        if(err) throw err;
        if(!allshoes){
            res.json({success: false, message:"No Shoes Found :("});

        }else{
            res.json({success: true, message: "YOOSH! :3)", allshoes: allshoes});
        }


     });

});

app.post('/api/allshoes', function(req,res){


var allshoe = new AllShoe();

    allshoe.name = req.body.name;
    allshoe.price = req.body.price;
    allshoe.shoecolor = req.body.shoecolor;
    allshoe.colors = req.body.colors;
    allshoe.hearts = req.body.hearts;

    allshoe.save(function(err){

        if(err){

            res.json({success: false, message: err});
        }else{
            res.json({success: true, message: "Save Successful..." });
        }


    });

});
app.post('/api/hearts',function(req,res){

    var heart = new Heart();
    heart.hearts = req.body.hearts;
    heart.save(function(err){
        if (err){
            res.json({success: false, message:"Save failed..."});
        }else{
            res.json({success: true, message:"Save Successful..."});
        }


    });



});
app.put('/api/findhearts',function(req,res){

    Heart.find({},function(err, hearts){
        if(err) throw err;
        if(!hearts){
            res.json({success: false, message:"No hearts found-o"});

        }else{
            res.json({success: true, message: "Here is the love!", hearts: hearts});
        }
        
    });


});
app.put('/api/remhearts', function(req,res){

    Heart.findOne({name:"hearto"}, function(err,heart){

        if(err) throw err;
        if(!heart){
            res.json({success: false, message:"noo hhearto"});
        }else{
            Heart.findOneAndUpdate({name:"hearto"},{$inc:{hearts: -1}},function(err,hearts){
                if(err) throw err;
                if(!heart){
                    res.json({success:false, message: "no hearts to remove"});
                }else{
                    res.json({success: true, message: "heart declinated..."});
                }
            });
        }
    });

});
app.put('/api/hearts',function(req,res){

   
   //var nhv = req.params.newheartValue++;
   //console.log(nhv);
   ///res.json({value:nhv});
   Heart.findOne({name:"hearto"},function(err, heart){
       if(err) throw err;
       if(!heart){
            res.json({success: false, message:"noo hhearto"});
       }else{
            // res.json({success: true, message:"noo hhearto"});
            heart.hearts++;
        Heart.findOneAndUpdate({name:"hearto"},{$inc:{hearts: 1}},function(err,hearts){

        if(err) throw err;
        if(!hearts){
            res.json({success: false, message:"No hearts found"} );
        }else{

            res.json({success: true, message:"updated..."});
        }

    })

       }
   })
 
});
app.put('/api/activatedby', function(req,res){
    console.log(req.body.name);

    Heart.findOneAndUpdate({name:"hearto"},{$push:{activatedby: req.body.name}},{new:true},function(err,activatedby){

        if(err)  throw err;
        if(!activatedby){
            res.json({success:false, message:"Parameter not found"});

        }else{
            res.json({success:true,message:"Parameter found..",activatedby:activatedby});
        }

    });

});
app.put('/api/whoactivated',function(req,res){

    Heart.findOne({name:"hearto"}).select('activatedby').exec(function(err,activatedby){

        if (err) throw err;
        if(!activatedby){
            res.json({success:false, message: "Coud not parameter"});
        }else{
            res.json({success: true, message:"Found it!...", activatedby: activatedby});
        }

    });

});
app.post('/api/thumbnails',function(req,res){

    console.log(req.body.thumbnail);
    var thumbnail = new Thumbnail();
    thumbnail.thumbnail = req.body.thumbnail;
    thumbnail.save(function(err){
        if(err){
            res.json({success: false,message: "Save Failed..."});
        }else{
            res.json({success: true, message: "Save Successful..."});
        }

    });


});
app.put('/api/thumbnails', function(req,res){

    Thumbnail.find({}, function(err,thumbs){
        if(err) throw err;
        if(!thumbs){
            res.json({success: false, message: "No thumbnails found.."});
        }else{
            res.json({success: true, message: "Thumbnails found!", thumbnails: thumbs});
        }



    });

});
app.put('/api/addlove/:love/:name', function(req,res){
    console.log(req.params.love);
    console.log(req.params.name);
    
        User.findOneAndUpdate({username:req.params.name},{$push:{loves:req.params.love}},{new:true},function(err,user){

            if (err) throw err;
            if(!user){
                res.json({success: false, message: "User not found"});
            }else{
                res.json({success: true, message:"Document updated? Lets see",user:user });
            }

        });

});
app.put('/api/removelove/:love/:name',function(req,res){

        User.findOneAndUpdate({username:req.params.name}, {$pull:{ loves: req.params.love}}, {new:true},function(err,user){

            if(err) throw err;
            if(!user){
                res.json({success: false, message: "User not found.."});
            }else{
                res.json({success: true, message: "Document updated? Lets see..", user:user});
            }

        });


});
app.put('/api/getloves/:name',function(req,res){

        User.findOne({username: req.params.name}).select('loves').exec(function(err, loves){

            if (err) throw err;
            if (!loves){
                res.json({success: false, message: "Loves not found..."});
            }else{
                res.json({success: true, message: "Here is the loveee...", loves: loves});
            }

        });
});
app.put('/api/sendemail/:email',function(req,res){


    var email = {

        from: 'A House Of Jewels, admin@hoj.com',
        to: req.params.email,
        subject: 'Order Confirmation',
        text:'',
        html: compiledTemplate.render()
    };
                       // Function to send e-mail to user
                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err); // If error in sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log confirmation to console
                        }
                    });
                    res.json({success: true, message: "Email entry Save Success..."});

                    

})
app.put('/api/addtoemaillist/:email',function(req,res){

   
                var emailentry = new Email();
                emailentry.emaillist = req.params.email;
                emailentry.save(function(err,newemail){
                    if(err){
                        res.json({success:false, message:"Email Entry Save failed.."});
                    }else{
                        
                        var email = {
                            from: 'A House Of Jewels, admin@hoj.com',
                            to: newemail.emaillist[0],
                            subject: 'Welcome to The House Of Jewels Email List',
                            text: '',
                            html: compiledTemplate.render({firstName:'Zill'})
                        }; 

                    // Function to send e-mail to user
                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err); // If error in sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log confirmation to console
                        }
                    });
                    res.json({success: true, message: "Email entry Save Success...",newemail:newemail});

                    }

                });
                //res.json({success:true, message:"User found..."})
});

app.post('/api/addtocheckout', function(req, res){
/*
    var checkoutItem = new CheckoutItem();
    checkoutItem.items

*/
    var checkoutItem = new CheckoutItem();

    checkoutItem.name =req.body.name;
    checkoutItem.size = req.body.size;
    checkoutItem.price = req.body.price;
    checkoutItem.description = req.body.description;
    checkoutItem.picture = req.body.picture;
    checkoutItem.amt = req.body.amt;
    checkoutItem.available= req.body.available;
    checkoutItem.save(function(err,checkout){

        if(err){
            res.json({success:false, message:"Save failed.."});

        }else{
            res.json({success: true, message: "Save Successful...", checkout:checkout});
        }

    });
console.log(req.body.name);
//console.log(req.body.newitem);

});
app.post('/api/stripecheckout', function(req,res){

    var order = new Order();
    order.billingcountry = req.body[0].country;
    order.billingfirstname = req.body[0].name;
    order.billinglastname = req.body[0].lastname;
    order.billingstreet = req.body[0].streetaddress;
    order.billingstreet2 = req.body[0].streetaddress2;
    order.billingapt = req.body[0].apt;
    order.billingcity = req.body[0].city;
    order.billingprovince = req.body[0].province;
    order.billingphonenumber = req.body[0].phonenumber;
    order.billingpostalcode = req.body[1].postalcode;
    order.shippingcountry = req.body[1].country;
    order.shippingfirstname = req.body[1].name;
    order.shippinglastname = req.body[1].lastname;
    order.shippingstreet = req.body[1].streetaddress;
    order.shippingstreet2 = req.body[1].streetaddress2;
    order.shippingapt = req.body[1].apt;
    order.shippingcity = req.body[1].city;
    order.shippingprovince = req.body[1].province;
    order.shippingphonenumber = req.body[1].phonenumber;
    order.shippingpostalcode = req.body[1].postalcode;
    order.cccardname = req.body[2].cardname;
    order.ccstripetoken = req.body[2].stripetoken;
    //order.cccardnumber = req.body[2].cardnumber;
    //order.ccexpmonth = req.body[2].expmonth;
    //order.ccexpyear = req.body[2].expyear;
   // order.ccsecuritycode = req.body[2].securitycode;
    order.ccgrandtotal = req.body[2].grandTotal;


var stripe = require("stripe")(
  "sk_test_ht6NVhB9nETXLvHM8lC6KXVL"
  
);

stripe.charges.create({
  amount: req.body[2].grandTotal,
  currency: "usd",
  source: req.body[2].stripeToken, // obtained with Stripe.js
  description: "Charge for charlotte.johnson@example.com"
}, function(err, charge) {
  // asynchronously called
  if(err){
      res.json({success: false , message: err.message});
  }else{
      res.json({success: true, message:"Charge successful!", charge:charge});
  }

});

});
app.post('/api/checkout', function(req,res){

    console.log(req.body);
    var order = new Order();
    order.billingcountry = req.body[0].country;
    order.billingfirstname = req.body[0].name;
    order.billinglastname = req.body[0].lastname;
    order.billingstreet = req.body[0].streetaddress;
    order.billingstreet2 = req.body[0].streetaddress2;
    order.billingapt = req.body[0].apt;
    order.billingcity = req.body[0].city;
    order.billingprovince = req.body[0].province;
    order.billingphonenumber = req.body[0].phonenumber;
    order.billingpostalcode = req.body[1].postalcode;
    order.shippingcountry = req.body[1].country;
    order.shippingfirstname = req.body[1].name;
    order.shippinglastname = req.body[1].lastname;
    order.shippingstreet = req.body[1].streetaddress;
    order.shippingstreet2 = req.body[1].streetaddress2;
    order.shippingapt = req.body[1].apt;
    order.shippingcity = req.body[1].city;
    order.shippingprovince = req.body[1].province;
    order.shippingphonenumber = req.body[1].phonenumber;
    order.shippingpostalcode = req.body[1].postalcode;
    
    order.cccardname = req.body[2].cardname;
    order.ccstripetoken = req.body[2].stripetoken;
    order.ccgrandtotal = req.body[2].grandTotal/100;



    order.save(function(err,order){
        if(err){
            res.json({success: false, message: "Save Failed... "+err});
        }else{
            res.json({success: true, message: "Save Successful...", order: order});
        }

    });


});
app.post('/api/addorderstouser', function(req,res){

    console.log(req.body);

    User.findOneAndUpdate({username: req.body[3]}, {$push:{orders: req.body[4]}},{new:true},function(err,user){
        if (err) throw err;
        if(!user){
            res.json({success:false, message:"User not found.."});
        }else{

            res.json({success: true, message: "User Found And Updated..", user: user, req: req.body[4]});

        }




    })


})

app.post('/api/pages', function(req,res){

    console.log(req.body);
    var page = new Page();
    page.pages = req.body.pages;
        
    page.save(function(err){

        if (err) {
            res.json({success: false , message: err});
        }else{
            res.json({success: true, message: "Save successful..."});
        }
    });
});
app.put('/api/shoes/mensshoes/:name',function(req,res){

    console.log(req.params.name);
    AllShoe.find({name: req.params.name},function(err,allshoe){
        if (err) throw err;
        if(!allshoe){
            res.json({success: false, message:"No Mens Shoe Found..."});
        }else{
            res.json({success: true, message: "Mens Shoe Found...", allshoe: allshoe});
        }

    });
});

 app.post('/api/shoes',function(req,res){

     console.log(req.body);
     var shoe = new Shoe();
     shoe.name = req.body.name;
     shoe.price = req.body.price;
     shoe.shoecolor = req.body.shoecolor;
     shoe.pages = req.body.pages;
     shoe.colors = req.body.colors;
     
     console.log(shoe.shoecolor);
     shoe.save(function(err){

        if(err){
            res.json({success: false, message: "Save Failed...", err: err});
        }else{
            res.json({success: true, message:"Save succeeded"});
        }
     });
 });

        app.post('/api/checkusername',function(req,res){
            // res.send("Testing new route");
            User.findOne({ username: req.body.username}).select('username').exec(function(err,user){

                if(user){

                    res.json({success: false, message: 'That username is already taken' });

                }else{

                    res.json({success: true, message: 'Valid username'});

                }

            });
        });

        app.post('/api/checkemail',function(req,res){
            // res.send("Testing new route");
            User.findOne({ email: req.body.email}).select('email').exec(function(err,user){

                if(user){

                    res.json({success: false, message: 'That e-mail is already taken' });

                }else{

                    res.json({success: true, message: 'Valid e-mail'});

                }

            });
        });


        //USER LOGIN ROUTE
        // HTTP://LOCALHOST:PORT/API/AUTHENTICATE
        app.post('/api/authenticate',function(req,res){
            // res.send("Testing new route");
            User.findOne({ username: req.body.username}).select('email username password active').exec(function(err,user){

                if(err) throw err;

                if(!user){
                    res.json({success:false, message:"Could not authenticate user"});
                } else if (user){
                    if(req.body.password){
                            var validPassword =  user.comparePassword(req.body.password);
                    }else{
                        res.json({success:false, message:"No password provided"});
                    }
//create password validation
                   
                   if(!validPassword){
                       res.json({ success: false, message:'Could  not authenticate password'});
                   }else if (!user.active){
                       res.json({success: false, message:'Account not yet activated, please check your email for activation link...', expired:true});

                   }else{
                       
                      var token = jwt.sign({ username: user.username, email: user.email },secret,{ expiresIn: '1h'});
                       res.json({success: true, message:'User authenticated', token: token});
                   }

                }

            })


        });
        app.post('/api/resend',function(req,res){
            // res.send("Testing new route");
            User.findOne({ username: req.body.username}).select('username password active').exec(function(err,user){

                if(err) throw err;

                if(!user){
                    res.json({success:false, message:"Could not authenticate user"});
                } else if (user){
                    if(req.body.password){
                            var validPassword =  user.comparePassword(req.body.password);
                    }else{
                        res.json({success:false, message:"No password provided"});
                    }
//create password validation
                   
                   if(!validPassword){
                       res.json({ success: false, message:'Could  not authenticate password'});
                   }else if (user.active){
                       res.json({success: false, message:'Account is already activated...'});

                   }else{
                                           
                       res.json({success:true,user:user});
                   }

                }

            });


        });

        app.put('/api/resend',function(req,res){

            User.findOne({username: req.body.username}).select('username name email temporarytoken').exec(function(err,user){
                if(err) throw err;
                var temporarytoken = jwt.sign({ username: user.username, email: user.email },secret,{ expiresIn: '24h'});
                user.save(function(err){
                    if(err){
                        console.log(err);
                    }else{
                    var email = {
                            from: 'A House Of Jewels, admin@hoj.com',
                            to: user.email,
                            subject: 'Password Reminder',
                            text: 'Hello ' + user.name + ', You recently requested a new account activation link. Please click on the following link to complete your activation: https://immense-dusk-71112.herokuapp.com/activate/' + user.temporarytoken,
                            html: 'Hello<strong> ' + user.name + '</strong>,<br><br> You recently requested a password reminder. Well, here it is! '+user.password
                        };

                    // Function to send e-mail to user
                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err); // If error in sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log confirmation to console
                        }
                    });

                    res.json({success:true, message: "Password Reminder link send to... "+user.email+"!"});
                    }
                    



                })

            })


        });

        app.put('/api/activate/:token',function(req,res){
            console.log("OY");
            User.findOne({temporarytoken: req.params.token}, function(err, user){

                if(err) throw err;
                var token = req.params.token;
                jwt.verify(token, secret, function(err, decoded){

                    if(err) {
                    res.json({success: false, message:"Activation link has expired..."});
                }else if(!user){ // token is true but doesn't match
                    res.json({success: false, message: "Activation link has expired..."});

                }else{

                    user.temporarytoken = false;
                    user.active = true;
                    user.save(function(err){

                        if(err){
                            console.log(err);

                        }else{
                        var email = {
                            from: 'A House of Jewels, admin@hoj.com',
                            to: user.email,
                            subject: 'Localhost Account Activated',
                            text: 'Hello ' + user.name + ', Your account has ben successfully activated!',
                            html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Your account has been successfully activated!'
                        };

                    // Function to send e-mail to user
                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err); // If error in sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log confirmation to console
                        }
                    });

                        }

                    });

                    res.json({success: true, message:"Account Activated"});

               }

            });

        });
    });
    
           // Route to send user's username to e-mail
    app.put('/api/resetusername/:email', function(req, res) {
        User.findOne({ email: req.params.email }).select('email name username').exec(function(err, user) {
            if (err) {
                res.json({ success: false, message: err }); // Error if cannot connect
            } else {

                if(!req.params.email){
                    res.json({success: false, message: 'No e-mail was provided'});

                }else{
                    if (!user) {
                    res.json({ success: false, message: 'E-mail was not found' }); // Return error if e-mail cannot be found in database
                } else {
                    // If e-mail found in database, create e-mail object
                    var email = {
                        from: 'Localhost Staff, cruiserweights@zoho.com',
                        to: user.email,
                        subject: 'Localhost Username Request',
                        text: 'Hello ' + user.name + ', You recently requested your username. Please save it in your files: ' + user.username,
                        html: 'Hello<strong> ' + user.name + '</strong>,<br><br>You recently requested your username. Please save it in your files: ' + user.username
                    };

                    // Function to send e-mail to user
                    client.sendMail(email, function(err, info) {
                        if (err) {
                            console.log(err); // If error in sending e-mail, log to console/terminal
                        } else {
                            console.log(info); // Log confirmation to console
                        }
                    });
                    res.json({ success: true, message: 'Username has been sent to e-mail! ' }); // Return success message once e-mail has been sent
                }
                }

            }
        });
    });
        app.put('/api/resetpassword', function(req,res){
            console.log(req.params.username);
            User.findOne({username: req.body.username}).select('username active email name resettoken').exec(function(err,user){

                if(err) throw err;


                if(!user){
                   res.json({success: false, message: 'User could not be found...'+err});

                }else if(!user.active){
                        res.json({success:false, message: 'Account has not been activated...'});
                    
                }else{
                    user.resettoken = jwt.sign({ username: user.username, email: user.email },secret,{ expiresIn: '24h'});
                    user.save(function(err){

                        if(err){

                            res.json({success:false, message: err})
                        }else{
                            
  // If e-mail found in database, create e-mail object
                            var email = {
                                from: 'Localhost Staff, cruiserweights@zoho.com',
                                to: user.email,
                                subject: 'Localhost Username Request',
                                text: 'Hello ' + user.name + ', You recently requested a password reset link. Please use this link below to reset your password:"http://localhost:8888/reset/"'+user.resettoken,
                                html: 'Hello<strong> ' + user.name + '</strong>,<br><br>You recently requested a password reset link. Please click on the link below to reset your password:<br> <a href="http://localhost:8888/reset/'+user.resettoken+'">"http://localhost:8888/reset/"</a>' 
                            };

                            // Function to send e-mail to user
                            client.sendMail(email, function(err, info) {
                                 if (err) {
                                    console.log(err); // If error in sending e-mail, log to console/terminal
                                } else {
                                    console.log(info); // Log confirmation to console
                                 }
                             });
                           
                            res.json({success: true, message:'Please check your email for password reset link...'})
                        }

                    })
                }
            })
    });

        app.put('/api/resetpassword/:token',function(req,res){

            User.findOne({resettoken: req.params.token}).select().exec(function(err,user){
                if(err) throw err;
                var token = req.params.token;
                
               // verify token
               jwt.verify(token, secret, function(err, decoded){

                    if(err) {
                    res.json({success: false, message:"Password Link has expired..."});
                }else{
                    if(!user){
                        res.json({success: false, message: "Password link has expired..."});
                    }else{
                        res.json({success: true, user: user});
                    }
                   
                    
                    }

               })

            });
            

        });

        app.put('/api/savepassword',function(req,res){

            User.findOne({username: req.body.username}).select('username name password resettoken email').exec(function(err,user){

                if(err) throw err;
                if(req.body.password == null || req.body.password == ""){

                    res.json({success:false, message:"Password not provided..."})

                    }else{
                    

                    user.password = req.body.password;
                    user.resettoken = false;
                    user.save(function(err){
                        if(err){
                            res.json({success:false, message:err});
                        }else{

                            var email = {
                                from: 'Localhost Staff, cruiserweights@zoho.com',
                                to: user.email,
                                subject: 'Localhost Username Request',
                                text: 'Hello ' + user.name + ', This e-mail is to notify you that your password has recently been reset!',
                                html: 'Hello<strong> ' + user.name + '</strong>,<br><br>This e-mail is to notify you that your password has recently been reset!' 
                            };

                            // Function to send e-mail to user
                            client.sendMail(email, function(err, info) {
                                 if (err) {
                                    console.log(err); // If error in sending e-mail, log to console/terminal
                                } else {
                                    console.log(info); // Log confirmation to console
                                 }
                             });
                            res.json({success:true, message:"Password has been reset..."})
                        }

                    });
                }
            })
        });
               app.put('/api/shoes', function(req,res){

            Shoe.find({},function(err,shoes){
                if(err) throw err;
                if(shoes){
                    res.json({ success: true, message: "You want shoes?? You got shoes!>:(", shoes: shoes});

                }else{

                    res.json({success: false, message: "No shoe for you!"});
                }
                


            });

        });



        //EXPRESS MIDDLEWARE
        app.use(function(req,res,next){

           var token = req.body.token || req.body.query || req.headers['x-access-token'];
           //from jwt documentation
           if(token){
               // verify token
               jwt.verify(token, secret, function(err, decoded){

                    if(err) {
                    res.json({success: false, message:"Token invalid"})
                    }else{
                    req.decoded = decoded;
                    next(); //continue to post method...
                    }

               })

           }else{
               res.json({success: false, message:"No token provided"});
           }


        });

                //GET CURRENT USER
        //HTTPS://LOCALHOST:8888/API/ME
        app.post('/api/me',function(req,res){

            res.send(req.decoded);
            


        });
        jwt.sign({
            data: 'foobar'
        }, 'secret', { expiresIn: '1h'});



        //After middleware because it is a route that requires a user to be logged in...
        app.put('/api/renewtoken/:username',function(req,res){

            User.findOne({username: req.params.username}).select().exec(function(err,user){
                if(err) throw err;
                if(!user){
                    res.json({success: false, message:"User was not found..."})

                }else{
                  var newToken = jwt.sign({ username: user.username, email: user.email },secret,{ expiresIn: '24h'});
                  res.json({success: true, token:newToken});
                }

            })

        })
        //After MIDDLEWARE/LOGGEDIN, SO ALREADY HAVE USER OBJECT AT THIS POINT?
        app.put('/api/permission',function(req,res){
            User.findOne({username: req.decoded.username},function(err,user){

                if(err)throw err;
                if(!user){
                    res.json({success: false, message:"No user found..."});
                }else{
                    res.json({success: true , permission: user.permission});
                }

            });


        });
        app.put('/api/activateheart',function(req,res){
                        
            console.log(req.body.name);//check why this var is name instead of shoename...
            AllShoe.findOneAndUpdate({name: req.body.name},{$set:{heartactivated: true}},{new:true},function(err,shoe){
                if(err) throw err;
                if (!shoe){
                    res.json({success: false, message: "Shoe to be updated not found.."});
                }else{
                    res.json({success: true, message: "Shoe parameter updated...", shoe: shoe});
                }

            });

        });
                app.put('/api/deactivateheart',function(req,res){
                        
            console.log(req.body.name);//check why this var is name instead of shoename...
            AllShoe.findOneAndUpdate({name: req.body.name},{$set:{heartactivated: false}},{new:true},function(err,shoe){
                if(err) throw err;
                if (!shoe){
                    res.json({success: false, message: "Shoe to be updated not found.."});
                }else{
                    res.json({success: true, message: "Shoe parameter updated...", shoe: shoe});
                }

            });

        });
        app.put('/api/isactivated',function(req,res){
            AllShoe.findOne({name: req.body.name}).select('heartactivated').exec(function(err,active){

                if(err) throw err;
                if(!active){
                    res.json({success: false});
                }else{
                    res.json({success: true,active: active});
                }


            });

        });
 
        app.put('/api/management',function(req,res){

            User.find({},function(err,users){
                if(err) throw err;
                //make sure user has permission to access..
                User.findOne({username: req.decoded.username}, function(err, mainUser){
                    if(err) throw err;
                    if(!mainUser){
                        res.json({success: false, message: "No user found"})
                    }else{
                        if(mainUser.permission == 'admin'  || mainUser.permission == 'moderator'){
                            if(!users){
                                res.json({success:false, message:"Users not found..."});

                            }else{
                                res.json({success: true, users: users, permission:mainUser.permission});
                            }


                        }else{
                            res.json({success: false,  message: "Insufficient permissions.."});
                        }
                    }

                });
            });
         });

         app.delete('/api/management/:username',function(req,res){

            var deletedUser = req.params.username;
            User.findOne({username: req.decoded.username },function(err,mainUser){
                if(err) throw err;
                if(!mainUser){
                    res.json({success: false, message: "No user found..."});

                }else{
                    if(mainUser.permission !== "admin"){
                        res.json({success: false, message: "Insufficient Permission.."});

                    }else{
                        User.findOneAndRemove({ username: deletedUser }, function(err,user){

                            if(err) throw err;
                            res.json({success: true});


                        });
                    }
                }


            });

         });
         app.put('/api/edit/:id',function(req,res){

            var editUser = req.params.id;
            User.findOne({username: req.decoded.username},function(err,mainUser){

                if(err) throw err;
                if(!mainUser){
                    res.json({success: false,message: "User could not be found..."});
                }else{

                    if(mainUser.permission=='admin'|| mainUser.permission == 'moderator'){
                            User.findOne({_id: editUser}, function(err, user){

                                if(err) throw err;
                                if(!user){
                                    res.json({success:false, message:"User not found.."})
                                }else{
                                    res.json({success: true, user: user});
                                }

                            });

                    }else{

                        res.json({success: false, message: "Insufficient permissions..."});

                    }
                }

            })


         });
         //EDITING EVERYTHING
         app.put('/api/edit',function(req,res){

             var editUser= req.body._id;
             if(req.body.name) var newName = req.body.name;
             if(req.body.username) var newUsername = req.body.username;
             if(req.body.email) var newEmail = req.body.email;
             if(req.body.permission) var newPermission = req.body.permission;
             User.findOne({username: req.decoded.username},function(err,mainUser){
                 if(err) throw err;
                 if(!mainUser){
                    res.json({success:false, message: "User not found.."});
                 }else{
                    if(newUsername){
                        if(mainUser.permission == 'admin' || mainUser.permission == 'moderator'){
                            User.findOne({_id: editUser}, function(err,user){
                                if (err) throw err;
                                if(!user){
                                    res.json({success: false, message:"User not found..."});
                                }else{
                                    user.username = newUsername;
                                    user.save(function(err){

                                        if(err){
                                            console.log(err);
                                          }else{
                                            res.json({success: true, message: "Username has been updated..."});
                                        }

                                    })
                                }
                                


                            });

                        }else{
                            res.json({success: false, message: "Insufficient permissions..."});

                        }


                    }
                    if(newName){
                        if(mainUser.permission == 'admin' || mainUser.permission == 'moderator'){
                            User.findOne({_id: editUser}, function(err,user){
                                if (err) throw err;
                                if(!user){
                                    res.json({success: false, message:"User not found..."});
                                }else{
                                    user.name = newName;
                                    user.save(function(err){

                                        if(err){
                                            console.log(err);
                                          }else{
                                            res.json({success: true, message: "Name has been updated..."});
                                        }

                                    })
                                }
                                


                            });

                        }else{
                            res.json({success: false, message: "Insufficient permissions..."});

                        }


                    }
                     if(newEmail){
                        if(mainUser.permission == 'admin' || mainUser.permission == 'moderator'){
                            User.findOne({_id: editUser}, function(err,user){
                                if (err) throw err;
                                if(!user){
                                    res.json({success: false, message:"User not found..."});
                                }else{
                                    user.email = newEmail;
                                    user.save(function(err){

                                        if(err){
                                            console.log(err);
                                          }else{
                                            res.json({success: true, message: "Email has been updated..."});
                                        }

                                    })
                                }
                                


                            });

                        }else{
                            res.json({success: false, message: "Insufficient permissions..."});

                        }


                    }
                    if(newPermission){
                        if(mainUser.permission == 'admin' || mainUser.permission == 'moderator'){
                            User.findOne({_id: editUser}, function(err,user){
                                if (err) throw err;
                                if(!user){
                                    res.json({success: false, message:"User not found..."});
                                }else{

                                    if(newPermission === "user"){
                                        if(user.permission === 'admin'){
                                            if(mainUser.permission !== 'admin'){
                                                res.json({success: false, message: "Insufficient permissions... You must be an admin to downgrade another admin..."})
                                            }else{
                                                user.permission = newPermission;
                                                user.save(function(err){
                                                    if (err){
                                                        console.log(err);
                                                    }else{
                                                        res.json({success: true, message: "Permission updated..."});
                                                    }
                                                    
                                                });
                                            }
                                        }else{
                                                user.permission = newPermission;
                                                user.save(function(err){
                                                    if (err){
                                                        console.log(err);
                                                    }else{
                                                        res.json({success: true, message: "Permission updated..."});
                                                    }
                                                    
                                                });
                                        }
                                    }
                                    if(newPermission === 'moderator'){
                                        if(user.permission === 'admin'){
                                            if(mainUser.permission !== 'admin'){
                                                res.json({success: false, message: 'Insufficient permissions...You must be an admin to downgrade another admin...'});
                                            }else{

                                                user.permission = newPermission;
                                                user.save(function(err){
                                                    if (err){
                                                        console.log(err);
                                                    }else{
                                                        res.json({success: true, message: "Permission updated..."});
                                                    }
                                                    
                                                });
                                            }
                                        }else{
                                                user.permission = newPermission;
                                                user.save(function(err){
                                                    if (err){
                                                        console.log(err);
                                                    }else{
                                                        res.json({success: true, message: "Permission updated..."});
                                                    }
                                                    
                                                });
                                        }
                                    }
                                    if(newPermission === 'admin'){
                                        if(mainUser.permission === 'admin'){
                                                user.permission = newPermission;
                                                user.save(function(err){
                                                    if (err){
                                                        console.log(err);
                                                    }else{
                                                        res.json({success: true, message: "Permission updated..."});
                                                    }
                                                    
                                                });

                                        }else{
                                            res.json({success: false, message: "Insufficient permission...You must be an administrator to grant administrator access."});
                                        }
                                    }

//
                                }
                                


                            });

                        }else{
                            res.json({success: false, message: "Insufficient permissions..."});

                        }


                    }

                 }
             });


         });
        //res.send('testing users rout'); test

    //use mongoose to get all the 
    //api ------------------------------------------
    //get all gemes

    app.get('/api/heartscounts',function(req,res){

        Heart.find(function(err,hearts){

                      if(err)
            res.send(err)
        
        res.json(hearts) // return all gems in JSON format


        });

        


    });


        // create todo and send back all todos after creation
 
/*
    app.get('/api/shoes/:shoe_id/:shoe_heart',function(req,res){
     var  data = {
        "info": {
            "id": req.params.shoe_id,
            "hearts": req.params.shoe_heart
        }
    };
    console.log(data);



});

   
       app.put('/api/shoes/:shoe_id/:shoe_heart', function(req,res){

 console.log(req.params);
 console.log(req.params.shoe_id);
 console.log(req.params.shoe_heart);
 heart++
  id = req.params.shoe_id;
        //create a todo, information comes from AJAX request from Angular
const doc ={
           
           
            hearts: req.params.shoe_heart
};

        Shoe.update({_id: req.params.shoe_id},doc, function(err,shoes){

            if(err){
              res.send(err);
            }
              // get and return all the todos after you create another
              Shoe.find(function(err,shoes){

                if (err)
                   res.send(err)
                   res.json(shoes);

              });
        });

    });
    */


    app.put('/api/finduser/:username',function(req,res){

        User.findOne({username:req.params.username},function(err,user){

            if(err) throw err;
            if(!user){
                res.json({success:false, message:"User not found..."});
            }else{
                res.json({success:true, message:"Here ya go!", user:user});
            }

        })

    });
    app.put('/api/heartscounts/:heartNum', function(req,res){

 console.log(req.params);
 console.log(id);
 //heart++
        //create a todo, information comes from AJAX request from Angular
const doc ={
           
           
            hearts: req.params.heartNum
};

        Shoe.update({_id: id},doc, function(err,shoes){

            if(err){
              res.send(err);
            }
              // get and return all the todos after you create another
              Shoe.find(function(err,shoes){

                if (err)
                   res.send(err)
                   res.json(shoes);

              });
        });

    });

    app.delete('/api/shoes/:shoe_id', function(req, res){

        Shoe.remove({
             _id: req.params.shoe_id
            }, function(err,shoe){

            if(err)
                res.send(err);

            // get and return all the products after you delete
            Shoe.find(function(err,shoes){

                if(err)
                    res.send(err)
                    res.json(shoes);
            });
        });
    });
};