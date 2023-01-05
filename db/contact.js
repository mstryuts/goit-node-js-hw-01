const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const dbPath = path.resolve(__dirname, "contacts.json");

async function writeDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
}

async function readDB() {
  const dbRaw = await fs.readFile(dbPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };
  const db = await readDB();
  db.push(contact);

  await writeDb(db);
}

async function removeContact(id) {
  const db = await readDB();
  const updateDb = db.filter((contact) => contact.id !== id);
  await writeDb(updateDb);
}

async function listContacts() {
  const db = await readDB();
  return db;
}

async function getContactById(id) {
  const db = await readDB();
  const contactById = db.filter((contact) => contact.id === id);
  return contactById;
}

module.exports = {
  addContact,
  removeContact,
  listContacts,
  getContactById,
};
