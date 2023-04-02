import { Component } from "react";
import { BtnForm, BtnFormText, Form, Header, Input } from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    input:'',
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input)
  };
  
  render() {
    return (
      <Header>
        <Form onSubmit = {this.handleSubmit}>
          <BtnForm type="submit">
            <BtnFormText>Search</BtnFormText>
          </BtnForm>

          <Input
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={e => this.setState({ input: e.target.value })}
          />
        </Form>
      </Header>
    );
  }
}
export default Searchbar;