
const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}];

export type ProductType = typeof products[0];

export const productsRepository = {
    findProducts: (searchTerm: string | null): Array<ProductType> => {
        if (searchTerm  && searchTerm.length > 0) {
            return products.filter((item: ProductType) => item.title.includes(searchTerm));
        } else {
            return products;
        }
    },
    createProduct: (title: string): ProductType=> {
        const newProduct: ProductType = {id: +(new Date()), title};
        products.push(newProduct);
        return newProduct;
    },
    getProductById: (productId: number): ProductType | null => {
        const product = products.find((product: ProductType) => product.id === productId);
        if (!product) {
            return null;
        }
        return product;
    },
    updateProduct: (id: number, title: string): ProductType | null => {
        const product = products.find((product) => product.id === id);
        if (!product) {
            return null;
        }
        product.title = title;
        return product;
    },
    deleteProduct: (id: number): boolean => {
        const product = products.find(p => p.id === id);
        if (!product) {
            return false;
        }
        const index = products.indexOf(product);
        products.splice(index, 1);
        return true;
    }
};
