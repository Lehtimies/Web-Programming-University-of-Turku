const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("dist"));

let persons = require("./data.json");

// Used to indicate the server is running
// Not used when hosting the frontend on the initial page at "/"
app.get("/", (request, response) => {
  response.send("<h2>Server is running!</h2>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.send(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  return String(Math.floor(Math.random() * 10000000));
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  // Check if name or number is missing
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  // Check if name is already in use
  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

app.get("/info", (request, response) => {
  const date = new Date();
  const numberOfPeople = persons.length;
  response.send(
    `<p>Phonebook has info for ${numberOfPeople} people</p><p>${date}</p>`
  );
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
