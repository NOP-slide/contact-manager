import React, {useContext, useEffect, Fragment} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';


const Contacts = () => {
    const contactContext = useContext(ContactContext);
    
    const {contacts, filtered, getContacts, loading} = contactContext;

    useEffect(() => {
        getContacts();
        // eslint-disable-next-line
    }, [])

    if (contacts !== null && contacts.length === 0 && !loading) {
        return (
        <Fragment>
            <TransitionGroup>
                <CSSTransition timeout={700} classNames='item'><h4>Please add a contact to begin</h4></CSSTransition>
            </TransitionGroup>
        </Fragment>);
    }

    return (
        <Fragment> 
            {contacts !== null && !loading ? (            
            <TransitionGroup>  
                {/* If the user has filtered some contacts, then display them, otherwise display all contacts */}
                {filtered !== null ? filtered.map(contact => 
                    <CSSTransition key={contact._id} timeout={700} classNames='item'><ContactItem contact={contact}/></CSSTransition>) : 
                contacts.map(contact => 
                    <CSSTransition key={contact._id} timeout={700} classNames='item'><ContactItem contact={contact}/></CSSTransition>)}
            </TransitionGroup>  ) 

            : <Spinner />}

        </Fragment>
    )
}

export default Contacts
