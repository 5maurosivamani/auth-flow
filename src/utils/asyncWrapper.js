function asyncWrapper(callback) {
  return async function (req, res, next) {
    try {
      await callback(req, res, next);
    } catch (err) {
      console.log("Error:", err);
      next(err);
    }
  };
}

module.exports = asyncWrapper;
