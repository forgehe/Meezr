import React, { Component } from "react";
import axios from "axios";
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Click the button to load data!",
      message2: "Default2",
    };
  }

  fetchData = () => {
    const data = {
      ingredients: ["carrot", "banana"],
      servings: 1,
    };
    axios
      .post("/api/ingredients/parse", data) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data); // The entire response from the Rails API

        // console.log(response.data.message); // Just the message
        // this.setState({
        //   message: response.data.message,
        // });
      });
  };
  fetchData2 = () => {
    const postData = {
      email: "test@test.com",
      password: "password",
    };
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("/api/meals", postData, axiosConfig) // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data); // The entire response from the Rails API
        this.state.message2 = response.data;
        // console.log(response.data.message); // Just the message
        // this.setState({
        //   message: response.data.message,
        // });
      });
  };

  fetchData3 = () => {
    axios
      .get("/api/meals") // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data); // The entire response from the Rails API
        this.state.message2 = response.data;
        // console.log(response.data.message); // Just the message
        // this.setState({
        //   message: response.data.message,
        // });
      });
  };

  //Test favorite function
  fetchData4 = () => {
    axios
    .post("/api/favorites/:id")
    .then((response) => {
      console.log(response.data);
    });
  };

  fetchDataGetFav = () => {
    axios
    .get("/api/favorites")
    .then((response) => {
      console.log(response.data);
    });
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <button onClick={this.fetchData}>Fetch Data</button>
        <button onClick={this.fetchData2}>Fetch Data2</button>
        <button onClick={this.fetchData3}>Fetch Data3</button>
        <button onClick={this.fetchData4}>Fetch Data4</button>
        <button onClick={this.fetchDataGetFav}>fetchDataGetFav</button>
        <h1>{this.state.message2}</h1>
      </div>
    );
  }
}

export default App;
