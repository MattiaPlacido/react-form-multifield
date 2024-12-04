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
  const [articleFormData, setArticleFormData] = useState({
    id: -1,
    title: "",
    content: "",
    image: "",
    category: "None",
    published: false,
  });

  //HANDLERS
  function handleArticleFormData(e) {
    e.preventDefault();
    setArticleFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  }

  const handleFormSubmit = (e) => {
    const { title, content, image } = articleFormData;

    if (!title || !content) {
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
      content: content,
      image: image,
      published: true,
    });

    setItems(newList);

    setArticleFormData({
      title: "",
      content: "",
      image: "",
      category: "None",
      published: true,
    });
  };

  const handleListItemClick = (id) => {
    //setto la lista ad una nuova lista che filtra per tutto tranne l'oggetto da eliminare
    const cleanList = items.filter((item) => item.id !== id);
    setItems(cleanList);
  };

  //DOM
  return (
    <div className="container">
      <div className="form-container">
        <p>Nuovo articolo</p>
        <form onSubmit={handleFormSubmit} className="form-container">
          <br />
          <input
            type="text"
            id="article-title"
            name="title"
            value={articleFormData.title}
            onChange={handleArticleFormData}
            placeholder="Titolo"
          />
          <br />
          <input
            type="text"
            id="article-content"
            name="content"
            value={articleFormData.content}
            onChange={handleArticleFormData}
            placeholder="Content"
          />
          <br />
          <input
            type="text"
            id="article-image"
            name="image"
            value={articleFormData.image}
            onChange={handleArticleFormData}
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
            <p className="item-title">{item.title}</p>
            <img
              src={!item.image ? "https://placehold.co/600x400" : item.image}
            />

            <p>{item.content}</p>
            <p>Id : {item.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
