const  express=require("express");
const app=express();
const mongoose=require("mongoose");
const ejs=require("ejs");
const  Listing=require("../Wanderlust/models/listing.js");
const path=require("path");
const methodOverride=require("method-override");

main().then(()=>{
    console.log("Connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Wander');
}

app.listen(8080,()=>{
    console.log("App is listening the port");
});

app.get("/",(req,res)=>{
    res.send("Hii , i am root");
});

// app.get("/testlisting",async(req,res)=>{
//     let samplelisting=new Listing({
//         title:"Yash Khedkar",
//         description:"Sanjivani Clg ",
//         price:1200,
//         location:"India",
//         country:"India"
//     });

//     await samplelisting.save();
//     console.log("Successs");
//     res.send("Done");
// });

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));


//Index Route
app.get("/listings",async(req,res)=>{
 const alllistings=  await Listing.find({});
 res.render("listings/index.ejs",{alllistings});
        
});

//create new Listing
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs",)
});

app.post("/listings",async(req,res)=>{
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
})

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
//show route
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})
 //Update route

 app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`)
 })

 //delete route

 app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedlisting=await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
 })





