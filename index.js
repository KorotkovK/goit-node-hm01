const { listContacts, getContactById, removeContact, addContact } = require('./contacts');


async function test() {
  console.log('List of contacts:', await listContacts());
  console.log('Contact by ID:', await getContactById('your_contact_id'));
  console.log('Remove contact:', await removeContact('your_contact_id'));
  console.log('Add contact:', await addContact('John Doe', 'john@example.com', '123-456-7890'));
}

test();



const yargs = require('yargs');
const contacts = require('./contacts');

const argv = yargs.argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts().then(contacts => console.table(contacts));
      break;

    case 'get':
      contacts.getContactById(id).then(contact => console.log(contact));
      break;

    case 'add':
      contacts.addContact(name, email, phone).then(newContact => console.log(newContact));
      break;

    case 'remove':
      contacts.removeContact(id).then(removedContact => console.log(removedContact));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);