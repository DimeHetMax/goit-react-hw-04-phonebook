import {useState, useEffect} from "react";
import { nanoid } from 'nanoid'
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import "../index.css"

export function App (){
  const [contacts,setContacts]= useState(() => {
    const parsedContacts = JSON.parse(localStorage.getItem("contacts"));
    return parsedContacts ?? [];
  });
  const [filter,setFilter]= useState('')

  const addContact = (event) => {
    event.preventDefault()
    const idNew = nanoid()
    const name = event.target.elements.name.value;
    const phone = event.target.elements.number.value;
    const existingContact = contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (existingContact) {
      alert('This name already exists in the phonebook!');
      return;
    }
    setContacts(prevState =>[...prevState,{ name, phone, id: idNew}])
    event.target.reset();
  }
  const handleFilterChange = (event) => {
    const handleFilter = event.target.value.toLowerCase();
    setFilter(handleFilter)
  }
  const deleteContact = id => {
    setContacts(prevState => 
      prevState.filter(contact => contact.id !== id),
      )
    };

  useEffect(()=>{
      localStorage.setItem("contacts", JSON.stringify(contacts))
  },[contacts])

return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList contacts={contacts} filter={filter} deleteContact={deleteContact} />   
    </div>
  );
}