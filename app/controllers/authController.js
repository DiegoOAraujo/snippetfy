const bcrypt = require('bcryptjs');
const { User } = require('../models');

module.exports = {
  signin(req, res) {
    return res.render('auth/signin');
  },

  signup(req, res) {
    return res.render('auth/signup');
  },

  // signout(req, res) { },

  async register(req, res) {
    const { email } = req.body;
    if (await User.findOne({ where: { email } })) {
      req.flash('error', 'E-mail já cadastrado');
      return res.redirect('back');
    }

    const password = await bcrypt.hash(req.body.password, 5);

    // ...req.body, password
    // é = a { nome, email, password, password }
    // mas como só pode haver 1 password ele mata o primeiro

    await User.create({ ...req.body, password });

    req.flash('success', 'Usuário cadastrado com sucesso');
    return res.redirect('/');
  },
};
