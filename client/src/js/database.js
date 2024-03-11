import { openDB } from 'idb';

const initdb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        const store = db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate database created');
        return store;
      } else {
        console.log('jate database already exists');
      }
    },
  });
  return db;
};

export const putDb = async (id, value) => {
  console.log('Updating jateDB');
  const jateDB = await initdb();
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const result = await store.put({ id, value });
  console.log('Data updated in jateDB', result);
};

export const getDb = async () => {
  console.log('Fetching from jateDB');
  const jateDB = await initdb();
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const result = await store.getAll();
  console.log('Fetch all data from jateDB complete', result);
  return result;
};

initdb(); // Initialize the database when the module is loaded
