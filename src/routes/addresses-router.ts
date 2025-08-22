import {Router} from "express";

const addresses = [{id: 1, value: 'Test street'}, {id: 2, value: 'Test city'}];


export const addressesRouter = Router({});

addressesRouter.get('/', (req, res) => {
    res.send(addresses);
});
addressesRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const address = addresses.find(address => address.id === +id);
    if (address) {
        res.send(addresses);
    } else {
        res.send(404);
    }
})
