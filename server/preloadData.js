

const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://jujubecadet5:@cluster0.lhvbuj6.mongodb.net';
const dbName = 'fridgewizard';

async function preloadShelfLifeData() {
  try {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('shelfLife');

    const data = fs.readFileSync('shelflife.json');
    const shelfLifeData = JSON.parse(data);

    for (const item of shelfLifeData) {
      const query = { name: item.name };
      const update = { $set: { shelfLife: item.shelfLife } };

      await collection.updateOne(query, update, { upsert: true });
    }

    console.log('Shelf life data has been preloaded or updated.');

  } catch (error) {
    console.error('Error occurred while preloading or updating shelf life data:', error);
  } finally {
    await client.close();
  }
}

preloadShelfLifeData(); 

// const fs = require('fs');
// const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb+srv://jujubecadet5:@cluster0.lhvbuj6.mongodb.net';
// const dbName = 'fridgewizard';

// async function preloadShelfLifeData() {
//   try {
//     const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
//     await client.connect();

//     const db = client.db(dbName);
//     const collection = db.collection('shelfLife');

//     const data = fs.readFileSync('shelflife.json');
//     const shelfLifeData = JSON.parse(data);

//     const result = await collection.insertMany(shelfLifeData);
//     console.log(`${result.insertedCount} documents inserted.`);

//   } catch (error) {
//     console.error('Error occurred while preloading shelf life data:', error);
//   } finally {
//     await client.close();
//   }
// }

// preloadShelfLifeData();