const { Schema, model } = require("mongoose");

const EventSchema = new Schema({
  organizer: {
    type: String,
    maxlength: 20,
    unique: true,
  },
  name: {
    type: String,
    validate: {
      validator: function (v) {
        return !v.toLowerCase().includes("event");
      },
      message: "name should not include event",
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function validateEmail(v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "You have entered an invalid email address!",
    },
  },

  image: { type: String, required: true },

  numOfSeats: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v > 5;
      },
      message: "Event seats must not be less than five seats.",
    },
  },

  bookedSeats: {
    type: Number,
    default: 0,
    required: true,
    validate: {
      validator: function (v) {
        return v < this.numOfSeats;
      },
      message:
        "An event booked seats must not exceed the number of total available seats.",
    },
  },

  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        return v.getTime() > Date.now() + 24 * 60 * 60 * 1000;
      },
      message: "An event must be at least 1 day from today.",
    },
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (v) {
        console.log(this.startDate.getTime(), v.getTime(), Date.now());
        return v.getTime() > this.startDate.getTime() + 24 * 60 * 60 * 1000 - 1;
      },
      message: "An event must last atleast 1 day from start of event.",
    },
  },
});

module.exports = model("Event", EventSchema);
