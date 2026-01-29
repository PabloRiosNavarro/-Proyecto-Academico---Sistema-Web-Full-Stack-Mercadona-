// hola_mundo.js
// Un simple "Hola mundo" y conexión a MongoDB
import {MongoClient} from 'mongodb'

console.log('Hola mundo')

const USER_DB= 'root'
const PASS='example'

const uri = `mongodb://${USER_DB}:${PASS}@localhost:27017`;


async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Conectado a MongoDB");

    const database = client.db('DAI');
    const test = database.collection('test');

    const datos = await test.find().toArray();
    console.log(datos);

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
