import React, { Component} from "react";
import { nanoid } from 'nanoid'
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import "../index.css"
// import { ContactItem } from "./ContactItem/ContactItem";

export class App extends Component{
  state = {
    contacts: [],
    filter: ''
  }
  addContact = (event) => {
    event.preventDefault()
    const idNew = nanoid()
    const name = event.target.elements.name.value;
    const phone = event.target.elements.number.value;
    const contacts = this.state.contacts;
    const existingContact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (existingContact) {
      alert('This name already exists in the phonebook!');
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        {
          name,
          phone,
          id: idNew
        }
      ]
    }))
    event.target.reset();
  }
  handleFilterChange = (event) => {
    const filter = event.target.value.toLowerCase();
    this.setState({ 
      filter });
  }
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  componentDidMount (){
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts)
    if(parsedContacts){
      this.setState({contacts: parsedContacts})
    }
  }
  componentDidUpdate (prevProps, prevState){
    const {contacts} = this.state
    if(contacts !== prevState.contacts){
      localStorage.setItem("contacts", JSON.stringify(contacts))
    }

  }
  render() {
    const { contacts, filter } = this.state;
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} handleFilterChange={this.handleFilterChange} />
        <ContactList contacts={contacts} filter={filter} deleteContact={this.deleteContact} />   
      </div>
    );
  }
}