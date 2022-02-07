const express = require("express");
const {
  fetchEvents,
  fetchEvent,
  updateEvent,
  createEvent,
  deleteEvent,
} = require("./controller");
const eventRouter = express.Router();

eventRouter.get("/", fetchEvents);
eventRouter.post("/", createEvent);
eventRouter.get("/:eventId", fetchEvent);
eventRouter.put("/:eventId", updateEvent);
eventRouter.delete("/:eventId", deleteEvent);

module.exports = eventRouter;
