import { Component } from "react";
import PropTypes from 'prop-types';
import { Form, Label, Input, Button } from "./ContactForm.styled";

export class ContactForm extends Component {
    static propTypes = {
        addContact: PropTypes.func.isRequired,
    }

    state = {
        name: '',
        number: '',
    }

    handleInput = ({target: {name, value}}) => {
        this.setState({
        [name]: value,
        })
  }

  onSubmit = (e) => {
      e.preventDefault();

    this.props.addContact(this.state);
    this.formReset();
  }

  formReset = () => {
    this.setState({
      name: '',
      number: '',
    })
  }

    render() {
        const { name, number } = this.state;

        return (
        <Form onSubmit={this.onSubmit}>
                <Label>
                    Name
                    <Input
                        type="text"
                        name="name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        value={name}
                        onChange={this.handleInput}
                    />
                </Label>

                <Label>
                    Number
                    <Input
                        type="tel"
                        name="number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        value={number}
                        onChange={this.handleInput}
                    />
                </Label>

                <Button type="submit">Add contact</Button>
            </Form>
        )
  }
}