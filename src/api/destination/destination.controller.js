const Destination = require('./destination.model');
const { setError } = require('../../helpers/utils/utils');
//----------------------------------------------------------------------------------------------
const getAll = async (req, res, next) => {
  try {
    const destination = await Destinationfind().populate("artist visitor comment");
    return res.json({
      status: 200,
      message: 'Recovered all destination',
      data: { destination}
    });
  } catch (error) {
    return next(setError(500, 'Failed all destination'));
  }
}
//----------------------------------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findById(id).populate("artist visitor comment");
    if (!destination) return next(setError(404, 'destination not found'))
    return res.json({
      status: 200,
      message: 'Recovered destination by id',
      data: { destination }
    });
  } catch (error) {
    return next(setError(500, 'Failed destination by id'))
  }
}
//----------------------------------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const destination = await Destination.find({ name: name });
    if (!destination) return next(setError(404, 'Destination not found'));
    return res.json({
      status: 200,
      message: 'Recovered destination by name',
      data: { destination }
    });
  } catch (error) {
    return next(setError(500, 'Failed destination by name'))
  }
}
//----------------------------------------------------------------------------------------------
const create = async (req, res, next) => {
  try {
      const newDestination = new Destination(req.body)
      const destinationInBd = await newDestination.save()
      return res.json({
          status: 201,
          message: 'Created new destination',
          data: { destinationInBd }
      });
  } catch (error) {
      return next(setError(500, 'Failed created destination'))
  }
}

//----------------------------------------------------------------------------------------------
const update = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const patchdestinationDB = new Destination(req.body);
  
      patchdestinationDB._id = id;
  
      const destinationDB = await Destination.findByIdAndUpdate(id, destinationDB);
  
      if (!destinationDB) {
        return next("destination no encontrado");
      }
      return res.status(200).json({ new: destinationDB, old: destinationDB });
    } catch (error) {
      return next("Error al modificar un destination", error);
    }
  };
//----------------------------------------------------------------------------------------------
const remove = async (req, res, next) => {
    try {
      const { id } = req.params;
      const destinationDB = await Destination.findByIdAndDelete(id);
  
      if (!destinationDB) {
        return next("destination no encontrado");
      }
  
      if (destinationDB) {
        deleteFile(destinationDB.ticket);
      }

      return res.status(200).json(destinationDB);
    } catch (error) {
      return next("El destination no se puede eliminar", error);
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