const { Category } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const categories = await Category.findAll({ where: {
        UserId: req.sesseion.user.id,
      }});

      return res.render('dashboard/index');
    } catch (err) {
      return next(err);
    }    
  },
};
