const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

let interventions = [
  {
    id: 1,
    name: "Maintenance électrique",
    category: "Maintenance électrique",
    technicianName: "maryam el haitout ",
    date: "2023-03-25",
  },
  {
    id: 2,
    name: "Entretien préventif",
    category: "Entretien préventif",
    technicianName: "hajar el haitout",
    date: "2023-03-26",
  },
];
app.get("/api/interventions", (req, res) => {
  res.json(interventions);
});
app.post("/api/interventions", (req, res) => {
  const { name, category, technicianName, date } = req.body;
  const newIntervention = {
    id: interventions.length + 1,
    name,
    category,
    technicianName,
    date,
  };
  interventions.push(newIntervention);
  res.status(201).json(newIntervention);
});

app.delete("/api/interventions/:id", (req, res) => {
  const { id } = req.params;
  interventions = interventions.filter(
    (intervention) => intervention.id !== parseInt(id)
  );
  res.status(200).json({ message: "Intervention deleted" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
