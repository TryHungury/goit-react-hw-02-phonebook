import { Box } from "components/box/Box"
import styled from "styled-components"

const ContactsItem = styled.li`
    
`

export const Contacts = ({contacts}) => {
    return <Box as={"ul"}>
        {contacts.map((contact)=>{
            return <ContactsItem key={contact}>{contact}</ContactsItem>
        })}
    </Box>
} 