const FoodRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const { getAll, getById, create, update, remove } = require("./food.controller");


FoodRoutes.get('/', [authorize], getAll);
FoodRoutes.get('/:id', [authorize], getById);
FoodRoutes.post('/create', [authorize], create);
FoodRoutes.patch('/:id', [authorize], update);
FoodRoutes.delete('/:id', [authorize], remove);


module.exports = FoodRoutes;