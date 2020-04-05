import React, { Component } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//bootstrap 
import { Container, Row, Col } from 'react-bootstrap'; 

class App extends Component {

    constructor(props){
        super(props);
        this.getCountryData = this.getCountryData.bind(this);
    }

    state = {
              confirmed: 0,
              recovered: 0,
              deaths: 0,
              countries: []
            }

            componentDidMount(){
                      this.getData();
                    }

                    async getData(){
                    const resApi = await Axios.get("https://covid19.mathdro.id/api");
                    const resCountries = await Axios.get("https://covid19.mathdro.id/api/countries");
                    const countries = [];
                        for (var i=0; i < resCountries.data.countries.length; i++) {
                            countries.push(resCountries.data.countries[i].name);
                        }
                    this.setState({
                                confirmed: resApi.data.confirmed.value,
                                recovered: resApi.data.recovered.value,
                                deaths: resApi.data.deaths.value,
                                countries
                              });
                            }

            async getCountryData(event){
                if(event.target.value === "Worldwide"){
                    return this.getData();
                }
                try {
                const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${event.target.value}`);
                this.setState({
                    confirmed: res.data.confirmed.value,
                    recovered: res.data.recovered.value,
                    deaths: res.data.deaths.value
                })}
                catch (err) {
                    if(err.response.status === 404)
                    this.setState({
                        confirmed: "No data available",
                        recovered: "No data available",
                        deaths: "No data available"
                    })
                }
            }

    renderCountryOptions() {
        return this.state.countries.map((name, i) => {
            return <option key={name}>{name}</option> 
        });
    }

    
    render() {
        return (
            <div className="App">
                <div className="container">
                <Container fluid>

                    <h1 className="text">Corona Update</h1> <br/>
                    <select className="dropDown" onChange={this.getCountryData}>
                        <option>Worldwide</option> <br/> <br/>
                        {this.renderCountryOptions()}
                    </select>

                    <br/> <br/>
                    <Row>
                        
                        <Col md={4}>
                        <div className="box confirmed">
                        <h2>Confirmed Cases</h2>
                        <h3> {this.state.confirmed} </h3>
                        </div>
                        </Col>
                        <br/>
                        <Col md={4}>
                        <div className="box recovered">
                        <h2>Recovered Cases</h2>
                        <h3> {this.state.recovered} </h3>
                        </div>
                        </Col>
                        <br/>
                        <Col md={4}>
                        <div className="box deaths">
                        <h2>Deaths Cases</h2>
                        <h3> {this.state.deaths} </h3>
                        </div>
                        </Col>
                        
                    </Row> <br/> <br/> <br/> <br/>
                    <div className="developer">
                        <img src="https://media-exp1.licdn.com/dms/image/C5103AQECDyiKyqIF5Q/profile-displayphoto-shrink_200_200/0?e=1591228800&v=beta&t=gYWPPCCCBfVioXLNfbQcCYoSacKM_y9Dum-BBBF7Qq4" alt=""/> <br/> <br/>
                    <h5>Develop by Arif islam </h5>
                    <p>inspired by Devistry</p>
                    </div>
                
                </Container>
           
                </div>
            </div>
        );
    }
}

export default App;