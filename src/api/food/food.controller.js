const Food = require('./food.model');
const { setError } = require('../../helpers/utils/utils');
//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
  try {
    const food = await Foodfind().populate("artist visitor comment");
    return res.json({
      status: 200,
      message: 'Recovered all Food',
      data: { food}
    });
  } catch (error) {
    return next(setError(500, 'Failed all Food'));
  }
}
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id).populate("artist visitor comment");
    if (!food) return next(setError(404, 'food not found'))
    return res.json({
      status: 200,
      message: 'Recovered food by id',
      data: { food }
    });
  } catch (error) {
    return next(setError(500, 'Failed food by id'))
  }
}
//----------------------------------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const food = await Food.find({ name: name });
    if (!food) return next(setError(404, 'Food not found'));
    return res.json({
      status: 200,
      message: 'Recovered food by name',
      data: { food }
    });
  } catch (error) {
    return next(setError(500, 'Failed food by name'))
  }
}
//----------------------------------------------------------------------------------------------

const create = async (req, res, next) => {
  try {
      const newFood = new Food(req.body)
      const foodInBd = await newFood.save()
      return res.json({
          status: 201,
          message: 'Created new food',
          data: { foodInBd }
      });
  } catch (error) {
      return next(setError(500, 'Failed created food'))
  }
}
//----------------------------------------------------------------------------------------------
const update = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchFoodDB = new Food(req.body);
  
      patchFoodDB._id = id;
  
      const foodDB = await Food.findByIdAndUpdate(id, patchFoodDB);
  
      if (!foodDB) {
        return next("food no encontrado");
      }
      return res.status(200).json({ new: patchFoodDB, old: foodDB });
    } catch (error) {
      return next("Error al modificar un food", error);
    }
  };
//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const foodDB = await Food.findByIdAndDelete(id);
  
      if (!foodDB) {
        return next("Food no encontrado");
      }
  
      if (foodDB) {
        deleteFile(foodDB.ticket);
      }

      return res.status(200).json(foodDB);
    } catch (error) {
      return next("El food no se puede eliminar", error);
    }
  };
//----------------------------------------------------------------------------------------------
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  getByName
}