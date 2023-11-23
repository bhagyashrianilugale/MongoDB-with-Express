const mongoose = require("mongoose");
const Chat=require("./models/chat.js");

main().then(()=>{console.log("connection successful")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const allChats= [{
    from:"anuj",
    to:"reva",
    msg:"mission successful",
    created_at:new Date()
  },
{
    from:"oza",
    to:"aman",
    msg:"hii oza from this side",
    created_at:new Date()

},
{
    from:"ajay",
    to:"ram",
    msg:"allright",
    created_at:new Date()
},
{ 
    from:"megha",
    to:"bhagyashri",
    msg:"are you available",
    created_at:new Date()  
},
{
    from:"aadi",
    to:"sudha",
    msg:"i am here!",
    created_at:new Date()
}];

Chat.insertMany(allChats);