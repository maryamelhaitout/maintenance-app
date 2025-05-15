import  {useState,useEffect} from "react";
import { FaTrash } from "react-icons/fa";
import { Card, CardContent } from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
function InterventionsPage() {
  const [interventions, setInterventions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [technicianName, setTechnicianName] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const categories = [
    "Maintenance électrique",
    "Maintenance mécanique",
    "Entretien préventif",
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/interventions")
      .then((response) => response.json())
      .then((data) => {
        setInterventions(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const addIntervention = () => {
    if (inputValue.trim() === "" || selectedCategory === "" || date === "") {
      setMessage("⚠️ Veuillez remplir tous les champs obligatoires!");
      return;
    }
    setInterventions([
      ...interventions,
      { name: inputValue, category: selectedCategory, technicianName, date },
    ]);
    setInputValue("");
    setSelectedCategory("");
    setTechnicianName("");
    setDate("");
    setMessage("✅ Intervention ajoutée avec succès!");
    setTimeout(() => setMessage(""), 2000);
  };

  const deleteIntervention = (index) => {
    setInterventions(interventions.filter((_, i) => i !== index));
  };

  const categoryStats = categories.map((category) => ({
    name: category,
    count: interventions.filter((i) => i.category === category).length,
  }));

  return (
    <div>
      <h2>Liste des Interventions</h2>
      <Card>
        <CardContent>
          <input
            type="text"
            placeholder="Ajouter une intervention..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nom du technicien"
            value={technicianName}
            onChange={(e) => setTechnicianName(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button onClick={addIntervention}>Ajouter</Button>
          {message && (
            <p style={{ color: message.includes("⚠️") ? "red" : "green" }}>
              {message}
            </p>
          )}
        </CardContent>
      </Card>
      <ul>
        {interventions.map((intervention, index) => (
          <li key={index}>
            <Card>
              <CardContent>
                <strong>{intervention.name}</strong>
                <p>Catégorie: {intervention.category}</p>
                <p>Date: {intervention.date}</p>
                <p>Technicien: {intervention.technicianName}</p>
                <FaTrash
                  onClick={() => deleteIntervention(index)}
                  style={{ cursor: "pointer", color: "red" }}
                />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <h3>Statistiques des Interventions</h3>
      <BarChart width={500} height={300} data={categoryStats}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
}
export default InterventionsPage;