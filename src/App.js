import './App.css';
import React, { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { ContactForm } from './components/Form/ContactForm';
import { Filter } from './components/Filter/Filter';
import { Contacts } from './components/Contacts/Contacts';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localContacts) {
      setContacts(localContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = contact => {
    const existingContact = contacts.some(item =>
      item.name.includes(contact.name),
    );
    if (existingContact) {
      return alert(`${contact.name} is already in contacts`);
    }
    setContacts(prevState => [contact, ...prevState]);
  };
  const deleteContact = id => {
    const neededContacts = contacts.filter(contact => contact.id !== id);
    setContacts(neededContacts);
  };
  const filterChange = e => {
    setFilter(e.currentTarget.value);
  };
  const filteredContacts = () => {
    const normalFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalFilter),
    );
  };

  return (
    <div className="App">
      <h1 className="title">Phonebook</h1>
      <ContactForm addNewContact={addNewContact}></ContactForm>
      <h2 className="title">Contacts</h2>
      <Filter onChange={filterChange} value={filter}></Filter>
      <Contacts
        contacts={filteredContacts()}
        onDelete={deleteContact}
      ></Contacts>
    </div>
  );
}

export default App;
