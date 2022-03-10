import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { MongoClient } from 'mongodb'

export default function Home({products}) {
  console.log(products)
  return (
    <div className={styles.container}>
      {products.map((product, index) => <h4 key={index}>{product.name}</h4>)}
    </div>
  )
}

export async function getStaticProps() {
  let products = []
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();
    let myCollection = db.collection('products');
    products = await myCollection.find({}).toArray()
    client.close();
    
  } catch (error) {
    console.log(error)
  }
  return{
    props: {
      products: products.map(product => ({
        name: product.name
      }))
    },
    revalidate: 1
  }
}
