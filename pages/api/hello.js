// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {MongoClient} from "mongodb"


export default async function handler(req, res) {
  if(req.method === 'POST'){
    try {
      const client = await MongoClient.connect(process.env.MONGO_URI);
      const db = client.db();
      const myCollection = db.collection('products');
      const result = await myCollection.insertOne(req.body)
      res.status(200).json({result})
      client.close();
      
    } catch (error) {
      console.log(error)
    }
  } else if(req.method === 'GET'){
    try {
      const client = await MongoClient.connect(process.env.MONGO_URI);
      const db = client.db();
      let myCollection = db.collection('products');
      const products = await myCollection.find({}).toArray()
      res.status(200).json({products})
      console.log(products)
      client.close();
      
    } catch (error) {
      console.log(error)
    }
  }
}
