import { Component } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts))
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');

    if (contacts) {
      this.setState({contacts: JSON.parse(contacts)})
    }
  }

  addContact = (data) => {
    const newContact = {
      id: nanoid(),
      ...data,
    }

    if (this.findSameName(newContact.name)) {
      return alert(`${newContact.name} is already in contacts.`)
    }

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact]
    }))
  }

  findSameName = (contactName) =>
    this.state.contacts.find(contact => contact.name === contactName);

  handleFilter = ({target: {name, value}}) => {
    this.setState({
      [name]: value,
    })
  }

  deleteContact = (id) => {
    this.setState(prevState => 
      ({contacts: prevState.contacts.filter(contact => contact.id !== id)}),
    )
  }

  render() {
    const {contacts, filter} = this.state;

    const filterContactsList = contacts.filter(contact => 
      contact.name.toLowerCase().includes(filter.toLowerCase()))

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
          <Filter startFilter={filter} handleFilter={this.handleFilter} />
          <ContactList contacts={filterContactsList} deleteContact={this.deleteContact} />
      </div>
    )
  }
}