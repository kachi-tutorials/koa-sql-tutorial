# KOA SQL Server

Before you start this part, make sure you have read [**part 1**](https://github.com/tutorial-point/koa-server-tutorial) of this tutorial series as we're gonna be starting from there.

In this tutorial, we'll be connecting a **`SQL`** (postgres) database to our **`Koa JS`** server.

## Prerequisite

Before we start let's make sure we have [**`postgres`**](https://www.postgresql.org/download/) installed:

```bash
psql --version
```

## Setup

In this tutorial we will be using **`postgres`** with **`sequelize`**.

So let's start by installing them both:

```bash
npm i pg sequelize
```

## Adding Models

Once postgres is installed, run the following command:

Let's run the following commands in the terminal:

```bash
mkdir models
touch models/index.js models/events.models.js
```

### What did we just do?

1. Created a **`models`** directory.
2. Created an **`index.js`** and an **`events.models.js`** file in the **`models`** directory.

Now add following code to our **`index.js`** file:

```javascript
const { Sequelize } = require("sequelize");

const settings = {
  host: "localhost",
  dialect: "postgres",
};

const sequelize = new Sequelize("DATABASE", "USERNAME", "PASSWORD", settings);

module.exports = sequelize;
```

This file will connect **`sequelize`** to our **`postgres`** database.

Before you continue, replace the **`DATABASE`, `USERNAME`, `PASSWORD`** with your own postgres credentials.

Now let's add the following to **`events.models.js`**:

```javascript
const sequelize = require(".");
const { DataTypes } = require("sequelize");
const { STRING, BOOLEAN, INTEGER } = DataTypes;

const Events = sequelize.define("Events", {
  name: STRING,
  adultsOnly: BOOLEAN,
  attendees: INTEGER,
  description: STRING,
});

Events.sync();

module.exports = Events;
```

### So what did we just do?

We've just created a model named **`Events`** and defined the following schemas:

1. **`name`** - this will be a string representing the name of the event.
2. **`adultsOnly`** - this will be a boolean field.
3. **`attendees`** - this will be a number representing the number of attendees
4. **`description`** - this will also be a string field.

## Updating the controllers

We should now change the import in our **`events.controllers.js`** file to:

```javascript
const Event = require("../models/events.models");
```

### Post Request

Let's update the **`postEvent`** controller in our **`events.controllers.js`**:

```javascript
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
```

The post request takes the request body and creates an object in our postgres database.

- A successful request returns **`'Event Created!'`**.
- An unsuccessful request returns a status **`"500 error"`**.

Try posting the following code this endpoint: [**`http://127.0.0.1:8000/post_event`**](http://127.0.0.1:8000/post_event)

```json
{
  "name": "test event",
  "adultsOnly": false,
  "attendees": 100,
  "description": "test description"
}
```

### Get Request

In our **`events.controllers.js`** file, let's now update the **`getEvents`** controller:

```javascript
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
```

We've now made our function async and it will return all the event items stored in our SQL postgres database.

Let's try a get request to the following endpoint: [**`http://127.0.0.1:8000/events_list`**](http://127.0.0.1:8000/events_list).

If this works correctly you should get the following:

```json
[
  {
    "id": 1,
    "name": "test event",
    "adultsOnly": false,
    "attendees": 100,
    "description": "test description",
    "createdAt": "TIME OF CREATION",
    "updatedAt": "TIME OF CREATION"
  }
]
```

And that is all! Thanks for reading!
