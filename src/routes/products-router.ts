import { Router} from "express";
import {productsRepository} from "./products-repository.js";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware.js";


export const productsRouter = Router({});

const titleValidation = body('title')
    .trim()
    .isLength({min: 3, max: 10})
    .withMessage('Title length must be greater than 2 and less than 11 symbols');

productsRouter.get('/', (req, res) => {

    const foundProducts = productsRepository.findProducts(req.query.title ? String(req.query.title) : null);

    return res.send(foundProducts);
});
productsRouter.get('/:id', (req, res) => {
    const id = +req.params.id;
    if (!id || Number.isNaN(id)) {
        return res.status(400).send('Id must be number');
    }
    const product = productsRepository.getProductById(id);

    if (product) {
        res.send(product);
    } else {
        res.send(404);
    }
});
productsRouter.post('/',
    titleValidation,
    inputValidationMiddleware,
    (req, res) => {
        const newProduct = productsRepository.createProduct(req.body.title);
        res.status(201).send(newProduct);
    });
productsRouter.put('/:id',
    titleValidation,
    inputValidationMiddleware,
    (req, res) => {
        const id = Number(req.params.id);
        const title = req.body.title;


        const updatedProduct = productsRepository.updateProduct(id, title);

        if (!updatedProduct) {
            res.sendStatus(404);
            return;
        }

        res.send(updatedProduct);
    });
productsRouter.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    // Проверка: является ли id числом и не NaN
    if (isNaN(id)) {
        res.sendStatus(400); // Bad Request
        return;
    }

    const isDeleted = productsRepository.deleteProduct(id);

    if (isDeleted) {
        res.sendStatus(204); // No Content
    } else {
        res.sendStatus(404); // Not Found
    }
});

