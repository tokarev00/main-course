import { ObjectId } from 'mongodb';
import {productsCollection} from "./db.js";

export type ProductType = {
    _id: ObjectId;
    title: string;
};


export const productsRepository = {
     findProducts: async (searchTerm: string | null): Promise<Array<ProductType>> => {
        const filter = searchTerm && searchTerm.length > 0
                ? { title: { $regex: searchTerm, $options: 'i' } }
                : {};
        return await productsCollection.find(filter).toArray();
    },
    createProduct: async (title: string): Promise<ProductType> => {
        const newProduct: ProductType = { _id: new ObjectId(), title };
        await productsCollection.insertOne(newProduct);
        return newProduct;
    },
    getProductById: async (productId: ObjectId): Promise<ProductType | null> => {
        return await productsCollection.findOne({ _id: productId });
    },
    updateProduct: async (id: ObjectId, title: string): Promise<ProductType | null> => {
        const result = await productsCollection.findOneAndUpdate(
            { _id: id },
            { $set: { title } },
            { returnDocument: 'after' }
        );
        if(!result) {
            return null;
        }
        return result;
    },
    deleteProduct: async (id: ObjectId): Promise<boolean> => {
        const result = await productsCollection.deleteOne({ _id: id });
        return result.deletedCount === 1;
    }
};
