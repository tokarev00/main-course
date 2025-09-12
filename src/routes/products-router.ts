import { Router} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware.js";
import {validateMongoIdMiddleware} from "../middlewares/object-id-validation-middleware.js";
import {ObjectId} from "mongodb";
import {ProductsService} from "../domain/products-service.js";


export const productsRouter = Router({});

const titleValidation = body('title')
    .trim()
    .isLength({min: 3, max: 10})
    .withMessage('Title length must be greater than 2 and less than 11 symbols');

productsRouter.get(
    '/',
    async (req, res) => {

    const foundProducts = await ProductsService.findProducts(req.query.title ? String(req.query.title) : null);

    return res.send(foundProducts);
});
productsRouter.get(
    '/:id',
    ...validateMongoIdMiddleware,
    async (req, res) => {
    const id = req.params.id;

    const product = await ProductsService.getProductById(new ObjectId(id));

    if (product) {
        res.send(product);
    } else {
        res.send(404);
    }
}
);


productsRouter.post(
    '/',
    titleValidation,
    inputValidationMiddleware,
    async (req, res) => {
        const newProduct = await ProductsService.createProduct(req.body.title);
        res.status(201).send(newProduct);
    });


productsRouter.put(
    '/:id',
    ...validateMongoIdMiddleware,
    titleValidation,
    inputValidationMiddleware,
    async (req, res) => {
        const id = req.params.id;
        const title = req.body.title;


        const updatedProduct = await ProductsService.updateProduct(new ObjectId(id), title);

        if (!updatedProduct) {
            res.sendStatus(404);
            return;
        }

        res.send(updatedProduct);
    });


productsRouter.delete(
    '/:id',
    ...validateMongoIdMiddleware,
    async (req, res) => {
    const id = req.params.id;


    const isDeleted = await ProductsService.deleteProduct(new ObjectId(id));

    if (isDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

