const DestinationRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const { getAll, getById, create, update, remove } = require("./destination.controller");


DestinationRoutes.get('/', [authorize], getAll);
DestinationRoutes.get('/:id', [authorize], getById);
DestinationRoutes.post('/create', [authorize], create);
DestinationRoutes.patch('/:id', [authorize], update);
DestinationRoutes.delete('/:id', [authorize], remove);


module.exports = DestinationRoutes;