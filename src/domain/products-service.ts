import {productsRepository, type ProductType} from '../repositories/products-repository.js'

import {ObjectId} from "mongodb";
export const ProductsService = {
    findProducts: async (searchTerm: string | null): Promise<Array<ProductType>> => {
        return await productsRepository.findProducts(searchTerm);
    },
    createProduct: async (title: string): Promise<ProductType> => {
        const newProduct: ProductType = { _id: new ObjectId(), title };
        return await productsRepository.createProduct(newProduct);
    },
    getProductById: async (productId: ObjectId): Promise<ProductType | null> => {
        return await productsRepository.getProductById(productId);
    },
    updateProduct: async (id: ObjectId, title: string): Promise<ProductType | null> => {
        return await productsRepository.updateProduct(id, title);
    },
    deleteProduct: async (id: ObjectId): Promise<boolean> => {
        return await productsRepository.deleteProduct(id);
    }
};