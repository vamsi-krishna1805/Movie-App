import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

//Onsubmit handler starts here 
  const onSubmitHandler = e => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`).then(res => res.json()).then(
      data => setData(data.Search)
     
    )
    
    setSearch("");
  }

//download function starts here
  const download = url=>{
    fetch(url).then(response=>{
      response.arrayBuffer().then(function(buffer){
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link= document.createElement('a');
        link.href=url;
        link.setAttribute("download","image.png");
        document.body.appendChild(link);
        link.click();
      });
     })
      .catch(err=>{
        console.log(err);
      })
  };

  

  return (
    <center>
      <h1 className='m-3'>Find your favourite movie here</h1>
      <form className='mb-5' onSubmit={onSubmitHandler}>
        <input type="text" value={search} placeholder="Type here..." onChange={e => setSearch(e.target.value)}></input>{' '}
        <input type="submit" variant='primary' value="search"></input>
        {/* <Button variant='primary' type='submit'>Submit</Button> */}
      </form>
      <Container>
        <Row >
          {data.map(movie =>
            <Col className='mt-3 mb-3' sm={6} md={3} >
              <Card style={{ "width": "18rem","height":"100%"}}>
                <Card.Img style={{ "width": "100%","height":"250px"}} variant="top" src={movie.Poster} alt={movie.Title} />{' '}
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Button variant='primary' onClick={()=>download(movie.Poster)}>Download now</Button>
                </Card.Body>
              </Card>
            </Col>

          )}
        </Row>
      </Container>


    </center>
  );
}

export default App;
