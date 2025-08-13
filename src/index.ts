import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}];
const addresses = [{id: 1, value: 'Test street'}, {id: 2, value: 'Test city'}];
type ProductType = typeof products[0];

app.get('/', (req, res) => {
   let helloMessage = 'Hello Incubator!';
    res.send(helloMessage);
});

app.get('/products', (req, res) => {
    let filteredProducts : ProductType[] = [...products];
    const title = req.query.title;
    if (title && typeof title === 'string' && title.length > 0) {
        filteredProducts = filteredProducts.filter((item: ProductType) => item.title.includes(title));
    }

    res.send(filteredProducts);
});
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(product => product.id === +id);

    if (product) {
        res.send(product);
    } else {
        res.send(404);
    }
});
app.post('/products', (req, res) => {
    if (!req.body.title) {
        res.send(400);
    }
    const newProduct = {id: +(new Date()), title: req.body.title};
    products.push(newProduct);
    res.status(201).send(newProduct);
});
app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const product: ProductType| undefined = products.find(product => product.id === +id);
    if (!product) {
        res.send(404);
        return;
    }
    if (!title || typeof title !== 'string' && title.length === 0) {
        res.send(400);
        return;
    }
    product.title  = title;
    res.send(product);



})
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(product => product.id === +id);
    if (product) {
        products.splice(products.indexOf(product), 1);
        res.send(204);
    } else {
        res.send(404);
    }
});

app.get('/addresses', (req, res) => {
    res.send(addresses);
});
app.get('/addresses/:id', (req, res) => {
    const id = req.params.id;
    const address = addresses.find(address => address.id === +id);
    if (address) {
        res.send(addresses);
    } else {
        res.send(404);
    }
})



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
