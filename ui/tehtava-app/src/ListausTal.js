import axios from 'axios';
import App from './App';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {Component } from "react";
import Button from 'react-bootstrap/Button';
import $ from 'jquery';
window.$ = $;

/**
 * Haetaan tallennetut asiakkaat ja laitetaan ne listaan
 */
export default class ListausTal extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: [],
    tietoja: false,
    item :{
      id: 1466,
      name: "Allshouse Technologies",
      address: {
          streetAddress: "2082 Magna St",
          city: "Phoenix",
          state: "TX",
          zip: "92052"
      }
    }
  };

 
  /**
   * Haetaan data 
   */
  componentDidMount() {
    axios.get("https://localhost:44379/api/Asiakas").then(
      result => {
        this.setState({
          isLoaded: true,
          items: result.data
        });
      },
      error => {
        this.setState({
          isLoaded: true,
          error
        });
      }
      );
  }

  //klikattu asiakasta niin tiedot modal näkyväksi
  tiedot = (a) => {
    window.history.pushState(null, "", "#tallennetut");
    this.setState({
      tietoja : true,
      item : a
    });

  }

  //Piilotetaan tiedot modal
  sulje = (a) => {
    this.setState({
      tietoja : false
    });
  }
  
  //Pyydetään poistamaan asiakas tietokannasta j
  poistaA = (item) => {
    axios
      .delete("https://localhost:44379/api/Asiakas/" + item.id)
      .then(this.setState(this.state.items = this.state.items.filter((i) => i.id !== item.id)))
      .catch(err => console.log(err)); 
    }


  render() {
    
    const { error, isLoaded, items, tietoja } = this.state;
    //backin käyttö
    window.onhashchange = () =>{
        this.setState({
          tietoja : false
   });
  }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id = "divvi">
                <Modal show={this.state.tietoja}>
      <Modal.Header>Asiakkaan tiedot</Modal.Header>
      <Modal.Body>
      <Container>
          <Row>
            <Col>Asiakkaan nimi</Col>
            <Col>{this.state.item.name}</Col>
          </Row>
          <Row>
            <Col>Katuosoite</Col>
            <Col>{this.state.item.streetaddress}</Col>
          </Row>
          <Row>
            <Col>Kaupunki</Col>
            <Col>{this.state.item.city}</Col>
          </Row>
          <Row>
            <Col>Osavaltio</Col>
            <Col>{this.state.item.state}</Col>
          </Row>
          <Row>
            <Col>Postinumero</Col>
            <Col>{this.state.item.zip}</Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
      <Button onClick={this.sulje}>Close</Button>
      </Modal.Footer>
    </Modal>     <div id = "tallennetutLista" href='#myModal'>
                    <h3> Tallennetut asiakkaat </h3> 
                        {items.map(item => (
                          <div id = "lista">
                            <button className="list-group-item list-group-item" key={item.id} onClick={() => this.tiedot(item)}>
                            {item.name}
                          </button>
                          <button className="btn btn-outline-danger" id = "poisto" key={item.id + "but"} onClick = {()=>{this.poistaA(item)}}>Poista </button> </div>       
                        ))}                      
            </div>
     </div>
     )
    }
  }
}


