import express, {type Express} from 'express';
import {productsRouter} from "./routes/products-router.js";
import {addressesRouter} from "./routes/addresses-router.js";
import {runDb} from "./repositories/db.js";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());



app.get('/', (req, res) => {
   let helloMessage = 'Hello Incubator!';
    res.send(helloMessage);
});

app.use('/products', productsRouter);
app.use('/addresses', addressesRouter);



const startApp = async (app: Express) => {
    await runDb();
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

startApp(app);