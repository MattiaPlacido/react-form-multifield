//MODULI
import { useState } from "react";
import "./assets/css/App.css";
import { list as dataList } from "./assets/data/data.js";

//FUNZIONI
const getNextId = (list) => {
  //id di default
  let lastId = 1;

  const idList = list.map((item) => item.id);

  while (idList.includes(lastId)) {
    lastId++;
  }

  console.log(lastId);

  return lastId;
};

function App() {
  //variabili reattive
  const [items, setItems] = useState(dataList);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  //HANDLERS
  const handleListItemClick = (id) => {
    //setto la lista ad una nuova lista che filtra per tutto tranne l'oggetto da eliminare
    const cleanList = items.filter((item) => item.id !== id);
    setItems(cleanList);
  };

  const handleFormSubmit = (e) => {
    if (!title || !author) {
      alert("Sono presenti dei campi non compilati");
      return;
    }
    //impedisce che venga ricaricata la pagina ogni volta avvenga l'evento
    e.preventDefault();
    //creo una nuova lista che conterrà quella vecchia + l'oggetto nuovo
    const newList = [...items];
    newList.push({
      id: getNextId(items),
      title: title,
      author: author,
      published: true,
    });
    setItems(newList);
  };

  const handleTitleInputChange = (event) => setTitle(event.target.value);

  const handleAuthorInputChange = (event) => setAuthor(event.target.value);

  //DOM
  return (
    <div className="container">
      <div className="form-container">
        <p>Nuovo articolo</p>
        <form onSubmit={handleFormSubmit}>
          <br />
          <input
            type="text"
            id="article-title"
            value={title}
            onChange={handleTitleInputChange}
            placeholder="Titolo"
          />
          <br />
          <input
            type="text"
            id="article-author"
            value={author}
            onChange={handleAuthorInputChange}
            placeholder="Autore"
          />
          <br />
          <input
            type="text"
            id="article-image"
            value={author}
            onChange={handleAuthorInputChange}
            placeholder="Immagine"
          />
          <br />
          <input type="checkbox" value="article-state" />
          <label for="article-state">Pubblica</label>
          <br /> <br />
          <button type="submit">Invia</button>
        </form>
      </div>

      <br></br>
      <hr></hr>
      <p className="opaque">Clicca gli articoli per eliminarli</p>
      <div className="article-container">
        {items.map((item) => (
          <div
            //controllo se l'oggetto è pubblicato altrimenti gli assegno display none
            className={`list-item-container${
              item.published === false ? " inactive" : ""
            }`}
            key={item.id}
            onClick={() => handleListItemClick(item.id)}
          >
            <p>
              Titolo articolo : <b>{item.title}</b>
            </p>
            <p>
              Autore : <b>{item.author}</b>
            </p>
            <p>Id : {item.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
