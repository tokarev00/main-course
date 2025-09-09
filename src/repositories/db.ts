import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
import type {ProductType} from "./products-repository.js";
dotenv.config();

const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017";

const client = new MongoClient(mongoUri);

const db = client.db("products");

export const productsCollection = db.collection<ProductType>("products");

export async function runDb() {
    try {

        await client.connect();

        await client.db("products").command({ping: 1});

        console.log("Database Connected");
    } catch  {
        console.log("Cannot connect to mongodb");
        await client.close();
    }
}

