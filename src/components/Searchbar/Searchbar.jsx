import PropTypes from 'prop-types';

import { Component } from 'react';
import { BtnForm, BtnFormText, Form, Header, Input } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
class Searchbar extends Component {
  state = {
    input: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <BtnForm type="submit">
            <FcSearch
              style={{
                width: '25px',
                height: '25px',
              }}
            />
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

Searchbar.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
