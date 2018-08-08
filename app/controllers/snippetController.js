const { Snippet } = require('../models');

module.exports = {
  async store(req, res, next) {
    try {

      const {categoryId} = req.params;

      const snippet = await Snippet.create({
        ...req.body,
        CategoryId: categoryId,
      });


      req.flash('success', 'Snippet criado com sucesso');
      return res.redirect(`/app/categories/${categoryId}/snippets/${snippet.id}`);
    } catch (err) {
      return next(err);
    }
  },

  async show(req, res, next) {
    try {
      const categories = await Category.findAll({
        include: [Snippet],
        where: {
          UserId: req.session.user.id,
        },
      });

      const snippets = await Snippet.findAll({
        where: { CategoryId: req.params.id },
      });

      return res.render('snippets/show', {
        categories,
        snippets,
        activeCategory: req.params.id,
      });
    } catch (err) {
      return next(err);
    }
  },

};
