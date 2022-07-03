# Prerequisite

Before you start this part, make sure you have read [**part 1**](https://github.com/tutorial-point/koa-server-tutorial) of this tutorial series

# KOA SQL Server

Now that our server is up and running the next step is to connect it to a database. In this part we will be using a **SQL** (postgres) database.

Before we start let's make sure we have [**postgres**](https://postgresapp.com/downloads.html) installed:

```
psql --version
```

# Setup

In this tutorial we will be using **`postgres`** with **`sequelize`**. So let's start by installing them both:

```
npm i pg sequelize
```

# Models

Once postgres is installed lets create our **`models`** folder.

Then let's create two files, an **`index.js`** file and our first model and called it **event.models.js**.

Let's run the following commands in the terminal:

```
mkdir models
touch models/index.js models/event.models.js
```

Let's first add following code to our **`index.js`** file:

```
const { Sequelize } = require('sequelize');

const settings = {
  host: 'localhost',
  dialect: 'postgres',
}

const sequelize = new Sequelize('DATABASE', 'USERNAME', 'PASSWORD', settings);

module.exports = sequelize;
```

This file will connect us to our postgres database.

Replace the **`DATABASE`, `USERNAME`, `PASSWORD`** with your own postgres credentials.

Now let's add the following to **`event.models.js`**:

```
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

We've just created a model named Events and defined the following schemas:

1. **`name`** - this will be a string representing the name of the event.
2. **`adultsOnly`** - this will be a boolean field.
3. **`attendees`** - this will be a number representing the number of attendees
4. **`description`** - this will also be a string field.

## Update the controllers

We should now change the import in our **`event.controllers.js`** file to:

```
const events = require('../models/events.models');
```

### Post Request

Let's update the **`postEvent`** controller in our **`event.controllers.js`**

The post request takes the request body and creates an object in our postgres database.

- A successful request returns **`'Event Created!'`**,
- An unsuccessful request returns a status **500 error**.

```
const postEvent = async ctx => {
    try {
        await Event.create({ ...ctx.request.body });
        ctx.body = 'Event Created!'
        ctx.status = 201;
    } catch (err) {
        ctx.status = 500;
        throw (err)
    }
};
```

Try posting the following code this endpoint: [**`http://127.0.0.1:8000/post_event`**](http://127.0.0.1:8000/post_event)

```json
[
  {
    "name": "test event",
    "adultsOnly": false,
    "attendees": 100,
    "description": "test description"
  }
]
```

### Get Request

In our **`event.controllers.js`** file, let's now update the **`getEvents`** controller.

We need to update our function to make it an async function and return all the event items stored in our postgres. Post the following code:

```
const getEvents = async ctx => {
    try {
        const foundEvents = await Event.findAll();
        ctx.body = foundEvents;
        ctx.status = 200;
    } catch (err) {
        ctx.body = err;
        ctx.status = 500;
    }
};
```

Let's try a get request to the following endpoint: [**`http://127.0.0.1:8000/events_list`**](http://127.0.0.1:8000/events_list).

If this works correctly you should get the following:

```
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
