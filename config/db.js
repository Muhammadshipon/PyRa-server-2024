const dotenv = require('dotenv');
dotenv.config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.tkh65wh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;
const connectDB = async()=> {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    db = client.db(process.env.db_name)
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
// run().catch(console.dir);

const getDB =()=>db ;
module.exports={connectDB, getDB};


