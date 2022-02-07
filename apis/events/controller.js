const Event = require("../../models/Event");

exports.fetchEvents = async (req, res) => {
  try {
    const Events = await Event.find();
    res.status(200).json(Events);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.fetchEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const foundEvent = await Event.findById(eventId);
    if (foundEvent) {
      res.status(200).json(foundEvent);
    } else {
      res.status(404).json({ msg: "event not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createEvent = async (req, res) => {
  try {
    const EventQuery = req.body;
    const createdEvent = await Event.create(EventQuery);

    res
      .status(201)
      .json({ msg: "Event created successfully", payload: createdEvent });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { EventId } = req.params;
    const Event = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(EventId, Event, {
      new: true,
    });

    if (updatedEvent) {
      res
        .status(200)
        .json({ msg: "Event updated successfully", payload: updatedEvent });
    } else {
      res.status(404).json({ msg: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { EventId } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(EventId);
    if (deletedEvent) {
      res.status(204).end();
      // json({ msg: "Event deleted successfuly", payload: deletedEvent });
    } else {
      res.status(404).json({ msg: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
