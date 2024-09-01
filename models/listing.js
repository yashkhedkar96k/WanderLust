const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "default-filename.jpg",
        },
        url: {
            type: String,
            default: "https://unsplash.com/photos/a-yellow-sports-car-parked-in-front-of-a-garden-SjhznhGhL74",
            set: (v) => v === "" ? "https://unsplash.com/photos/a-yellow-sports-car-parked-in-front-of-a-garden-SjhznhGhL74" : v,
        },
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
