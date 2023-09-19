import { Alert, Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuResponsivo from "./components/MenuResponsivo";


function Cadastro() {
    const[email, setEmail] = useState("");
    const[senha, setSenha] = useState("");
    const[nome, setNome]= useState(""); 
    const[telefone, setTelefone]= useState("");
    const[cpf, setCpf]= useState("");
    const[lembrar, setLembrar]= useState(false);
    const[cadastro, setCadastro]= useState(false);
    const[erro, setErro]= useState(false);

    function Cadastrar(evento) {
        evento.preventDefault();
        fetch(process.env.REACT_APP_BACKEND + "users",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    senha: senha,
                    nome: nome,
                    cpf: cpf,
                    telefone: telefone
                }
            )
        })
        .then((resposta)=> resposta.json())
        .then((json) => {

            if(json.cpf) {
                setCadastro(true);
            } else{
                setCadastro(false);
                setErro(true);
            }
        })
        .catch((erro) => {setErro(true) } )
    }

    useEffect(()=>{
        setNome("");
        setEmail("");
        setCpf("");
        setTelefone("");
        setSenha("");
        //setCadastro(false);

    }, [cadastro]);

  return (
    <>
   
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
            <Typography component="h1" variant='h5'>Cadastrar</Typography>
            {erro && (<Alert severity="warning" sx={{mt: 2, mb:2}}>Desculpe tente novamente</Alert>)}
            {cadastro &&(<Alert severity="success" sx={{mt: 2, mb:2}}>Obrigado por se cadastrar</Alert>)}
            <Box component="form" onSubmit={Cadastrar}>
                <TextField
                type="text" 
                label="Nome" 
                variant="filled" 
                margin="normal"
                value={nome}
                onChange={ (e) => setNome( e.target.value ) } 
                fullWidth
                />
                <TextField 
                type="email" 
                label="Email" 
                variant="filled" 
                margin="normal"
                value={email}
                onChange={ (e) => setEmail( e.target.value ) } 
                fullWidth
                />
                 <TextField 
                type="password" 
                label="Senha" 
                variant="filled" 
                margin="normal" 
                value={senha}
                onChange={ (e) => setSenha( e.target.value ) } 
                fullWidth
                />
                <TextField
                type="tel" 
                label="Telefone" 
                variant="filled" 
                margin="normal"
                value={telefone}
                onChange={ (e) => setTelefone( e.target.value ) } 
                fullWidth
                />
                 <TextField
                type="number" 
                label="Cpf" 
                variant="filled" 
                margin="normal"
                value={cpf}
                onChange={ (e) => setCpf( e.target.value ) } 
                fullWidth
                />
                <FormControlLabel
                    control={<Checkbox value={lembrar} name="lembrar" onChange={(e) => setLembrar(!lembrar) } />}
                    label="Eu li e concordo com os termos."
                />
                <Button type="submit" variant="contained" fullWidth sx={{mt: 2, mb:2}}>Cadastrar</Button>
            </Box>
        </Box>
    </Container>
    </>
  )
}

export default Cadastro