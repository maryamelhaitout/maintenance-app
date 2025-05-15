import { useState } from "react";
import { Card, CardContent } from "../../src/components/ui/card";
import { Button } from "../../src/components/ui/button";
function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Message envoyé!\nNom: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="d-flex justify-content-center" >
      
       
          <form onSubmit={handleSubmit}>
            <h2 style={{textAlign:"center"}}>Contactez-nous</h2>
            <div>
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Votre message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Envoyer</Button>
          </form>
       
      
    </div>
  );
}
export default ContactPage;