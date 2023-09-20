import { Alert, Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MenuResponsivo from './components/MenuResponsivo';

function EditaTenis() {
   

    const{id}=useParams();

    

    const[descricao, setDescricao] = useState("");
    const[ano, setAno] = useState("");
    const[titulo, setTitulo]= useState(""); 
    const[duracao, setDuracao]= useState("");
    const[categoria, setCategoria]= useState("");
    const[imagem, setImagem]= useState("");
    const[editar, setEditar]= useState(false);
    const[erro, setErro]= useState(false);
    

    useEffect(()=>{
        const usuario = localStorage.getItem("usuario");
        fetch(process.env.REACT_APP_BACKEND + "produtos/" + usuario + "/" + id,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            },
        })
        .then( ( resposta ) => resposta.json() )
        .then( (json ) => {
            if(!json.status){
           setTitulo(json.titulo);
           setDescricao(json.descricao);
           setAno(json.ano);
           setDuracao(json.duracao);
           setCategoria(json.categoria);
           setImagem(json.imagem);
            } else{
                setErro("Tênis não encontrado");
            }     

        })
        .catch( (erro) => setErro( true ) );
    },[]);

    function Editar(evento){
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "produtos",{
            method:"PUT",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    id:id,
                    titulo: titulo,
                    descricao: descricao,
                    ano: ano,
                    duracao: duracao,
                    categoria: categoria,
                    imagem: imagem,
                    usuario:localStorage.getItem("usuario")


                }
            )
        })
        .then( ( resposta ) => resposta.json() )
        .then( (json ) => {

            if( json._id ) {
                setEditar( true );
                setErro( false );
            } else {
                setEditar(false);
                setErro( true );
            }

        })
        .catch( (erro) => {setErro( true )} );
    }

   

  return (
    <>
    <MenuResponsivo/>
    <Container component="section" maxWidth="sm">
        <Box sx={{
            mt:10,
            backgroundColor: "#EDEDED",
            padding: "50px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Typography component="h1" variant='h5'>Editar tênis</Typography>
            {erro && (<Alert severity="warning" sx={{mt: 2, mb:2}}>{erro}</Alert>)}
            {editar &&(<Alert severity="success" sx={{mt: 2, mb:2}}>Tênis editado com sucesso</Alert>)}
           
            <Box component="form" onSubmit={Editar} >
                <TextField
                type="text" 
                label="Marca" 
                variant="filled" 
                margin="normal"
                value={titulo}
                onChange={ (e) => setTitulo( e.target.value ) } 
                fullWidth
                />
                <TextField 
                type="text" 
                label="Modelo" 
                variant="filled" 
                margin="normal"
                value={descricao}
                onChange={ (e) => setDescricao( e.target.value ) } 
                fullWidth
                />
                 <TextField 
                type="text" 
                label="Cor" 
                variant="filled" 
                margin="normal" 
                value={ano}
                onChange={ (e) => setAno( e.target.value ) } 
                fullWidth
                />
                <TextField
                type="text" 
                label="Numeração" 
                variant="filled" 
                margin="normal"
                value={duracao}
                onChange={ (e) => setDuracao( e.target.value ) } 
                fullWidth
                />
                 <TextField
                type="text" 
                label="Material" 
                variant="filled" 
                margin="normal"
                value={categoria}
                onChange={ (e) => setCategoria( e.target.value ) } 
                fullWidth
                />
                <TextField
                type="text" 
                label="Imagem" 
                variant="filled" 
                margin="normal"
                value={imagem}
                onChange={ (e) => setImagem( e.target.value ) } 
                fullWidth
                />
               
                <Button type="submit" variant="contained" fullWidth sx={{mt: 2, mb:2}}>Editar</Button>
            </Box>
        </Box>
    </Container>
    </>
  )
}

export default EditaTenis