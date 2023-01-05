const { Command } = require("commander");

const {
  addContact,
  removeContact,
  listContacts,
  getContactById,
} = require("./db/contact");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeActions({ action, id, name, email, phone }) {
  switch (action) {
    case "add":
      try {
        console.log("contact add");
        await addContact(name, email, phone);
      } catch (error) {
        console.log(error);
      }

      break;
    case "remove":
      try {
        console.log("contact remove");
        await removeContact(id);
      } catch (error) {
        console.log(error);
      }

      break;
    case "list":
      try {
        console.log("contacts list");
        const contacts = await listContacts();
        console.table(contacts);
      } catch (error) {
        console.log(error);
      }

      break;

    case "get":
      try {
        const contactById = await getContactById(id);
        console.log(contactById);
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      break;
  }
}
invokeActions(argv);
