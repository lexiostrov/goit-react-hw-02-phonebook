import React, { Component } from 'react';
import { AddContact } from './AddContact/AddContact';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import contacts from './Data/contacts.json';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts,
    filter: '',
  };

  DataHandleSubmit = data => this.AddContactMarckup(data);

  AddContactMarckup = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.state.contacts.find(
      ({ name }) => name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert('This contact already exists')
      : this.setState(prevState => ({
          contacts: [newContact, ...prevState.contacts],
        }));
  };

  onFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  visibleContacts = () => {
    const lowCaseFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowCaseFilter)
    );
  };

  onClickDelBtn = currentID => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== currentID),
    }));
  };

  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <AddContact onSubmit={this.DataHandleSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onFilter={this.onFilterChange} />
        <ContactsList
          onClickDelBtn={this.onClickDelBtn}
          contacts={this.visibleContacts()}
        />
      </Container>
    );
  }
}
