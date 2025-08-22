import express from 'express';
import {productsRouter} from "./routes/products-router.js";
import {addressesRouter} from "./routes/addresses-router.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());


app.get('/', (req, res) => {
   let helloMessage = 'Hello Incubator!';
    res.send(helloMessage);
});

app.use('/products', productsRouter);
app.use('/addresses', addressesRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
