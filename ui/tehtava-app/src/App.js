import './App.css';
import Listaus from'./Listaus.js';
import ListausTal from'./ListausTal.js';
import React, {Component} from 'react';

//App
class App extends Component {

  constructor(props) {
    super(props);
    this.changeToOmat = this.changeToOmat.bind(this);
    this.changeToKaikki = this.changeToKaikki.bind(this);
    this.state = {nakyma: true};
  }

  state = {
    sivu: "kaikki",
    ei  : true
  };

//Näkymä tallennettuihin
changeToOmat() {
    this.setState({
      nakyma : false
    });
  }

//Näkymä listaukseen
changeToKaikki() {
  this.setState({
    nakyma : true
  });
}

set = () => {
  this.setState({
    sivu : this.state.sivu = ""
  });
}

render() {
  const nakyma = this.state.nakyma;
  let button;

    return (
    <div id = "divvi">
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark" id ="navi">
        <ul className="navbar-nav mx-auto" id = "palikat">
          <li className="nav-item active" id="kaikki" onClick = {this.changeToKaikki}>
            <a className="nav-link h4"  href="#kaikki" >Kaikki asiakkaat<span className="sr-only"></span></a>
          </li>
          <li className="nav-item " id="tallennetut" onClick = {this.changeToOmat}>
            <a className="nav-link h4" href="#tallennetut">Omat asiakkaat</a>
          </li>
        </ul>
      </nav>
      <GetView nakyma={nakyma}/>
  </div>);
  }
}


/**
 * Palautetaan haluttu komponentti
 * @param {*} props 
 * @returns näkymän kaikista asiakkaista tai tallennetuista
 */
function GetView(props) {
  const nakyma = props.nakyma;
  if (nakyma) {
    return <Listaus />;
  }
  else return <ListausTal />;
}

export default App;






