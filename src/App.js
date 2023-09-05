import { Avatar, Button } from "@mui/material";

function App(props) {

  return (
   <>
     <h1>Home</h1>
     <Button variant="contained">Contained</Button>
     <Button variant="outlined" color="warning">vazio</Button>
     <Avatar alt="Ana" src="/static/images/avatar/1.jpg" />
   </>
  );
}

export default App;
