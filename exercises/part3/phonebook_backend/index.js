require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("dist"));

// Used to indicate the server is running
// Not used when hosting the frontend on the initial page at "/"
app.get("/", (request, response) => {
  response.send("<h2>Server is running!</h2>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
  .then((person) => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
    })
    .catch((error) => {
      next(error);
    });
  });
  
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndDelete(id)
  .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  
  // Check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
  };
  
  Person.create(person)
  .then((savedPerson) => {
    response.status(201).json(savedPerson);
  })
  .catch((error) => {
    console.error(error);
    response.status(500).json({ error: "Failed to save person" });
    });
  });

  app.get("/info", async (request, response) => {
    const date = new Date();
  const numberOfPeople = await Person.find({}).then((persons) => {
    return persons.length;
  });
  response.send(
    `<p>Phonebook has info for ${numberOfPeople} people</p><p>${date}</p>`
  );
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.log("Error name", error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else {
    console.log("YOU HAVE REACHED THE ELSE STATEMENT IN ERROR HANDLER");
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
