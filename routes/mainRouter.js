const router = require('express').Router();

const { Category, Post, User } = require('../db/models');

router.get('/', async (req, res) => {

  let post = await Post.findAll({

    include: [{

      model: Category,

    },

    {

      model: User,

    }],

    raw: true,

  });

  post = post.map((el) => ({

    ...el, owner: (el.user_id === req.session.userId),

  }));

  console.log(post, '====');

  res.render('main', { post }); // отрисовывает hbs main

});
module.exports = router;
