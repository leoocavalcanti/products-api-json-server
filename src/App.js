import "./App.css";

import { useState, useEffect } from "react";

// 4 - custom hook
import { useFetch } from "./useFetch";

// 8 - errar url para mostrar erro
// "http://localhost:3001/products"
const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState([]);

  // 4 - custom hook e 5 - refactor post
  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // 1 - resgatando dados
  // useEffect(async () => {
  //   const res = await fetch("http://localhost:3000/products");

  //   const data = await res.json();

  //   setProducts(data);
  // }, []);

  // 2 - add product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    // const res = await fetch("http://localhost:3000/products", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // });

    // const addedProduct = await res.json();

    // 3 - carregamento dinâmico
    // setProducts((prevProducts) => [...prevProducts, addedProduct]);

    // 5 - refatorar post
    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  /* 9 - desafio */
  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };


  return (
    
    <div className="app">
        
      <form onSubmit={handleSubmit}>

        <label>
          Nome do produto:
          <input value={name} onChange={((e) => setName(e.target.value))} type="text" required/>
        </label>
        <label>
          Preço:
          <input value={price} onChange={((e) => setPrice(e.target.value))} type="number" required/>
        </label>

        <button >Adicionar</button>

      </form>

  
      <div className="products">
        <nav>
          <ul>

            {loading && <div>CARREGANDO...</div>}
            {!loading && items && items.map((item, index) =>(

              <li key={index}>{item.name} - R${item.price} <button className="btn" onClick={() => handleRemove(item.id)}>Deletar</button></li>
            ))}
            
          </ul>
        </nav>
      </div>

    </div>

  )
}

export default App