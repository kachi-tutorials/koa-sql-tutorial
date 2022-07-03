const Events = require("../models/events.models");

const getEvents = async (ctx) => {
  try {
    const foundEvents = await Events.findAll();
    ctx.body = foundEvents;
    ctx.status = 200;
  } catch (err) {
    ctx.body = err;
    ctx.status = 500;
  }
};

const postEvent = async (ctx) => {
  try {
    await Events.create({ ...ctx.request.body });
    ctx.body = "Event Created!";
    ctx.status = 201;
  } catch (err) {
    ctx.status = 500;
    throw err;
  }
};

module.exports = {
  getEvents,
  postEvent,
};
