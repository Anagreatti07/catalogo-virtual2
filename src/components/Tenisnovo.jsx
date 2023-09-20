import { Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography } from '@mui/material'
import React from 'react'

function Tenisnovo(props) {
  return (
    <Card sx={{maxWidth:345, border:"4px solid",borderColor:"#66bcc7", width:"30%"}}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={props.imagem}
                alt={props.titulo}
                sx={{border: "solid 2px" }}
            />

            <CardContent>
                <Typography variant="h5" component="div">
                    {props.titulo}
                </Typography>
                <Typography variant="body2" color="text.secondary"  component="h4" >
                    {props.descricao}
                </Typography>
                <Grid container sx={{mt:"2%", alignItems: "center"}}>
                    <Grid item xs={4} component="h4" variant="h4">
                        <span>{props.categoria}</span>
                    </Grid>
                    <Grid item xs={4}  component="h4" variant="h4">
                        <span>{props.ano}</span>
                    </Grid>
                    <Grid item xs  component="h4" variant="h4">
                        <span>{props.duracao}</span>
                    </Grid>
                </Grid>
            </CardContent>
        </CardActionArea>
        <Grid container>

        <Grid item xs={6} marginLeft="20px" >
            <button onClick={props.excluir}>🗑️</button>
        </Grid>

        <Grid item xs={6} marginLeft="305px" marginTop="-20px">
            <Link href={"produtos/" + props.id} >✏️</Link>
        </Grid>

        </Grid>
    </Card>
  )
}

export default Tenisnovo;