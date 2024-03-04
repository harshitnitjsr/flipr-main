const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();


url="mongodb+srv://pratapmahatha9d:MoM5J0o4rHSkpYcS@cluster0.pcwhfgv.mongodb.net/flipr3";


mongoose.connect(url , (err)=>{
if (err)
{
    console.log(err)
}
else
{
    console.log("connected Success")
}

} )
