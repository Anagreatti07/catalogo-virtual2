import { Alert, Box, Button, Container, TextField, Typography, Menu, MenuItem } from '@mui/material'
import  { useState, useEffect } from 'react'
import React,{} from 'react';



function Filmes() {
    const[titulo, setTitulo] = useState("");
    const[descricao, setDescricao] = useState("");
    const[ano, setAno]= useState(""); 
    const[duracao, setDuracao]= useState("");
    const[categoria, setCategoria]= useState("");
    const[imagem, setImagem]= useState("");
    const[erro, setErro]= useState(false);
    const[cadastro, setCadastro]= useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    

    function Filmes(evento) {
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "filmes",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    titulo: titulo,
                    descricao: descricao,
                    ano: ano,
                    duracao: duracao,
                    categoria: categoria,
                    imagem: imagem

                }
            )
        })
        .then( ( resposta ) => resposta.json() )
        .then( (json ) => {

            if( json._id ) {
                setCadastro( true );
                setErro( false );
            } else {
                setCadastro( false );
                setErro( true );
            }

        })
        .catch( (erro) => setErro( true ) );
    }


  return (
    <> <Button
    id="basic-button"
    aria-controls={open ? 'basic-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    onClick={handleClick}
  >
    <Box sx={{
       
    }}></Box>
    Dashboard
  </Button>
  <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    MenuListProps={{
      'aria-labelledby': 'basic-button',
    }}
    >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
        <Box sx={{
       
    }}></Box>
        
  </Menu>

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
        
        <Typography component="h1" variant='h5'>Filmes</Typography>
        {erro && (<Alert severity="warning" sx={{mt:2, mb:2}}>Desculpe tente novamente</Alert>)}
        {cadastro && (<Alert severity="success" sx={{mt:2, mb:2}}>Obrigada por se cadastrar</Alert>)}

        <Box component="form" onSubmit={Filmes}>
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
            type="number" 
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
             <Button type="submit" variant="contained" fullWidth sx={{mt: 2, mb:2}}>Enviar</Button>
        </Box>
    </Box>
</Container></>
    
  )
}

export default Filmes