
const mongoose = require("mongoose");
const express=require("express");
const path=require("path");
const app= express();
const Chat=require("./models/chat.js");
app.use(express.urlencoded({extended:true}));
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,'/views'));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride("_method"));

main().then(()=>{console.log("connection successful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};


let port=8080;
app.listen(port,()=>{
    console.log("request listen");
});

// Index Route
app.get("/chats",async(req,res)=>{
   let chats= await Chat.find();
   res.render("index.ejs",{chats})
});

// New Route
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
});

// CreateRoute
app.get("/chats/:id/edit",async(req,res)=>{
  let{id}= req.params;
  let chat= await Chat.findById(id);
  // console.log(id);
  res.render("edit.ejs",{chat});
});
app.post("/chat",(req,res)=>{
  let{from, to,msg}=req.body;
  let newChat= new Chat({
    from:from,
    msg:msg,
    to:to,
    created_at:new Date()
  });
  // update route

 app.put("/chats/:id",async(req,res)=>{
    let{ id }=req.params;
    console.log(id);
    let{ msg }=req.body;
    console.log(msg);


    let updatedMsg= await Chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { runValidators: true,
      new: true } );
      res.redirect("/chats");
 });

//  app.patch('/chats/:id', async (req, res) => {
//   let { id } = req.params;
//   let { msg: updatedMsg } = req.body;
//   let updatedChat = await Chat.findByIdAndUpdate(`${id}`, { msg: updatedMsg }, { runValidators: true, new: true });
//   res.redirect('/chats');
// })

  console.log(newChat);
  newChat.save() .then((res)=>{
    console.log("chat was save");
  }) .catch((err)=>{
     console.log(err);
  })
  res.redirect("/chats");
});
 



