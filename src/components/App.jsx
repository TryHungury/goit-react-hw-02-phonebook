import styled from "styled-components";
import { Component } from "react";
import { Box } from "./box/Box";
import { PhoneBook } from "./phonebook/PhoneBook";
import { Contacts } from "./contacts/Contacts";
import { nanoid } from "nanoid";

const Title = styled.h1`
  border-radius: ${p=>p.theme.radii.normal};
  background-color: ${p=>p.theme.colors.text};
  color: ${p=>p.theme.colors.accent};
  margin: ${p=>p.theme.space[0]}px auto;
  padding: ${p=>p.theme.space[2]}px;
  margin-top: ${p=>p.theme.space[3]}px;
  font-weight: ${p=>p.theme.fontWeights.bold};
  font-family: ${p=>p.theme.fonts.monospace};
`

const TitleH2 = styled.h2`
  text-align: center;
  border-radius: ${p=>p.theme.radii.normal};
  background-color: ${p=>p.theme.colors.accent};
  margin: ${p=>p.theme.space[0]}px auto;
  padding: ${p=>p.theme.space[2]}px;
  margin-top: ${p=>p.theme.space[5]}px; 
  font-weight: ${p=>p.theme.fontWeights.heading};
  font-family: ${p=>p.theme.fonts.heading};
`

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: ''
  }

  handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    return this.setState({[inputName] : inputValue})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const number = e.target.elements.number.value;

    const contact = {
      id: nanoid(),
      name,
      number,
    }

    this.setState((prevState)=>{
      return {
        contacts: [...prevState.contacts, contact],
        name: "", number: "",
      }
    })
  }

  handleDeleteContact = (id) => {
    this.setState(prevState=>{
      return {
        contacts: prevState.contacts.filter((contact)=>contact.id !== id)
      }
    })
  }

  handleFilterContacts = (e) => {
    const filterValue = e.target.value;
    const filterName = e.target.name;

    this.setState({[filterName]: filterValue})
  }

  render() {
    const {name, number, contacts, filter} = this.state;
    const visibleContacts = contacts.filter((contact) => contact.name.includes(filter))

    return (
      <Box height= "100%"  display= "flex" flexDirection="column" justifyContent= "space-evenly" alignItems= "center" fontSize= "40px" backgroundColor="backgroundSecondary">
        <Title>Ukraine Win❤️</Title>
        <Box display="flex" flexDirection="column" justifyContent= "space-evenly" alignItems= "center" as={"section"}>
          <TitleH2>Phonebook</TitleH2>
          <PhoneBook name={name} number={number} onChange={this.handleChange} onSubmit={this.handleSubmit}></PhoneBook>
        </Box>
        <Box display="flex" flexDirection="column" justifyContent= "space-evenly" alignItems= "center" as={"section"}>
          <TitleH2>Contacts</TitleH2>
          <Contacts contacts={visibleContacts} filter={filter} onChange={this.handleFilterContacts} onClick={this.handleDeleteContact}></Contacts>
        </Box>
      </Box>
    );
  }
};
