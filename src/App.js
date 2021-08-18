import React from "react";
import ReactDom from "react-dom";
import HeaderBar from "./components/HeaderBar";
import Slider from "./components/Slider";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <HeaderBar />
        <Slider />
      </>
    );
  }
}

export default App;
