import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const newContact = {
      id: nanoid(),
      ...data,
    };

    if (findSameName(newContact.name)) {
      return alert(`${newContact.name} is already in contacts.`);
    }

    setContacts(prevState => [...prevState, newContact]);
  };

  const findSameName = contactName =>
    contacts.find(contact => contact.name === contactName);

  const handleFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id),
    );
  };

  const filterContactsList = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter startFilter={filter} handleFilter={handleFilter} />
      <ContactList
        contacts={filterContactsList}
        deleteContact={deleteContact}
      />
    </div>
  );
};
