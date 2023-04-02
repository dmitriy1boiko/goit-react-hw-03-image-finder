
import { Component } from "react";
import { AppSection } from "./App.styled";
import ImageGallery from "./ImageGallery/ImageGallery";
import Searchbar from "./Searchbar/Searchbar"

export class App extends Component {
  state = {
    query:'',
  };

  changeQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <AppSection >
        <Searchbar onSubmit={this.changeQuery}/>
        <ImageGallery query={this.state.query}/>
      </AppSection>
    );
  }
};
