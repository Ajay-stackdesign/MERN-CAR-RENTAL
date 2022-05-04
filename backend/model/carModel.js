const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    capacity: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        required: true

    },
    bookedTimeSlots: [
        {
            from: {
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            }
        }
    ],
    rentPerHour: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = new mongoose.model("Car", carSchema)
