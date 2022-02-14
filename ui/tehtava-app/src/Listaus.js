import React, { Component } from "react";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

/**
 * Listaus kaikista asiakkaista. 
 * Haetaan data osoitteesta  http://www.filltext.com/?rows=100&pretty=true&id={index}&name={business}&address={addressObject}
 * ja laitetaan se palautettavaan listaan.
 * Tallennus.
 */
export default class Listaus extends Component {
  state = {
    error: null,
    isLoaded: false,
    items: []
  };

 
  /**
   * Haetaan data ja jos onnistuu niin itemsit setStateen
   */
  componentDidMount() {
    axios.get("http://www.filltext.com/?rows=100&pretty=true&id=%7Bindex%7D&name=%7Bbusiness%7D&address=%7BaddressObject%7D").then(
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

 
  render() {
    const { error, isLoaded, items } = this.state;
    var tallenna;
    if (error) {
      return (<div>Error: {error.message}</div>);
    } else if (!isLoaded) {
      return (<div>Loading...</div>);
    } else {
        /**<button onClick={shoot}>Lisää tietokantaan</button> */
     
      return (
        <ListGroup as="ul" id="kaikkiLista">
            <h3>Asiakaslistaus</h3>
          {items.map(item => (
             <ListGroup.Item as="li" key={item.id}>
              {item.name}
              {tallenna = () => {
                Tallenna(item);}}
              <button type="button" id = "tallennus" className="btn btn-outline-success" key ={item.id} onClick={tallenna}>Tallenna asiakas</button>
              </ListGroup.Item>    
          ))}
          </ListGroup>   
      );
    }
  }
}
 

/**
 * Jos ollaan klikattu listauksess poista-nappia niin tullaan tänne ja POSTataan tallennettava tieto
 * @param {*} item 
 */
function Tallenna(item) {
    //e.preventDefault();

    const object = {
      "id": item.id,
      "name": item.name,
      "streetAddress": item.address.streetAddress,
      "city": item.address.city,
      "state": item.address.state,
      "zip": item.address.zip 
    };

    axios
      .post("https://localhost:44379/api/Asiakas", object)
      .then(res => alert("Lisäsit asiakkaan " + item.name + " omiin asiakkaisiin"))
      .catch(err => alert("Asiakas " + item.name + " on jo tallennettu"));
}
