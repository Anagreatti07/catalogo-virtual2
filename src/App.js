import { Avatar, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import Tenisnovo from "./components/Tenisnovo";
import Tenis from "./Tenis"
import MenuResponsivo from "./components/MenuResponsivo";
import "./global.css";

//650ae0792a26e4e19b77613c

function App() {

  const[tenis, setTenis] = useState();
  const[erro, setErro] = useState();
  

  useEffect(()=>{

    const usuario = localStorage.getItem("usuario");

    fetch( process.env.REACT_APP_BACKEND + "produtos/" + usuario , {
      headers:{
          'Content-Type': 'application/json'
      }
  })
  .then((resposta)=> resposta.json())
  .then((json) => {setTenis(json)})
  .catch((erro) => {setErro(true) } )
  
  },[])

    function Excluir(evento, id){
      evento.preventDefault();
      fetch( process.env.REACT_APP_BACKEND + "produtos",{
        method:"DELETE",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
               id:id,
               usuario: localStorage.getItem("usuario")
            }
        )
    })
    .then((resposta)=> resposta.json())
    .then((json) => {
       const novaLista = tenis.filter((tenis)=> tenis._id !==id);
       setTenis(novaLista);
    })
    .catch((erro) => {setErro(true) } )
    }

  return (
   <>
    <MenuResponsivo/>
     <h1>Tênis</h1>
     <Container
      sx={{
        display:"flex",
        flexFlow:"row",
        flexWrap:"wrap",
        gap:"2rem",
      }}
     >
     {tenis && (
      tenis.map((tenis, index)=>(
        <Tenisnovo
          imagem={tenis.imagem} 
          titulo={tenis.titulo}
          descricao={tenis.descricao}
          categoria={tenis.categoria}
          ano={tenis.ano}
          duracao={tenis.duracao}
          excluir={(e)=> Excluir(e, tenis._id)}
          id={tenis._id}
        />
      ))
     )}
     </Container>
   </>
  );
}

export default App;
