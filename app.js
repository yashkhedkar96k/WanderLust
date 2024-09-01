const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Listing = require("../Wanderlust/models/listing.js");

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wander');
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to the database", err);
  }
})();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.listen(8080, () => {
  console.log("App is listening on port 8080");
});

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// Index Route: Display all listings
app.get("/listings", async (req, res) => {
  try {
    const alllistings = await Listing.find({});
    res.render("listings/index", { alllistings });
  } catch (err) {
    console.error("Error fetching listings", err);
    res.status(500).send("Server Error");
  }
});

// Create New Listing Form
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

// Create New Listing (POST)
app.post("/listings", async (req, res) => {
  try {
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
  } catch (err) {
    console.error("Error creating new listing", err);
    res.status(500).send("Server Error");
  }
});

// Edit Listing Form
app.get("/listings/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
  } catch (err) {
    console.error("Error fetching listing for edit", err);
    res.status(500).send("Server Error");
  }
});

// Show Single Listing
app.get("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
  } catch (err) {
    console.error("Error fetching listing", err);
    res.status(500).send("Server Error");
  }
});

// Update Listing (PUT)
app.put("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  } catch (err) {
    console.error("Error updating listing", err);
    res.status(500).send("Server Error");
  }
});

// Delete Listing (DELETE)
app.delete("/listings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  } catch (err) {
    console.error("Error deleting listing", err);
    res.status(500).send("Server Error");
  }
});
