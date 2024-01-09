const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const removedContact = contacts.find(contact => contact.id === contactId);

  if (removedContact) {
    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  }

  return removedContact || null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: Date.now().toString(), name, email, phone };
  const updatedContacts = [...contacts, newContact];
  
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };