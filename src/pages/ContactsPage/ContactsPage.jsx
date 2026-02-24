import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact } from '../../redux/contacts/operations';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

import ContactForm from '../../components/ContactForm/ContactForm';
import ContactList from '../../components/ContactList/ContactList';
import Filter from '../../components/Filter/Filter';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  // 🔽 додай функцію для додавання контакту
  const handleAddContact = (contact) => {
    dispatch(addContact(contact));
  };

  return (
    <div>
      <h1>Контакти</h1>
      {/* 🔽 передай проп onAdd */}
      <ContactForm onAdd={handleAddContact} />
      <Filter />
      <ContactList />
    </div>
  );
}
