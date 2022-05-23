const router = require('express').Router();

const { Category, Post } = require('../db/models');

const checkAuth = require('../middleware/checkAuth');

router.post('/add', checkAuth, async (req, res) => {

  const { postName, categoryName, img, description } = req.body; // получили данные из body

  console.log('=====>', req.body);

  try {
    console.log('START BD' , {

      title: postName,

      description,
      
      user_id: req.session.userId,
      
      category_id: categoryName,

      img,

    });

    // const categoryAdd = await Category.create({ name: categoryName });

    const [category, created] = await Category.findOrCreate({where: { name: categoryName}, defaults: {name: categoryName}, raw:true})
    console.log('category==========', category);

    const newPost = await Post.create(

      {

        title: postName,

      description,
      
      user_id: req.session.userId,
      
      category_id: category.id,

      img,

      },

    );
    console.log('BD answer ==========', newPost);

    res.json({ category: newPost.category_id, name: req.session.name, id: newPost.id, newPost, category});
    // res.json(newPost.dataValues)

  } catch (error) {

    res.send('Упппссс, не вышло!');

  }

});

// ручка для удаления поста

router.delete('/delete/:id', async (req, res) => {

  const { id } = req.params;

  console.log(id);

  await Post.destroy({

    where: {

      id,

    },

  });

  // const a = await Post.findByPk(id);

  // console.log('=====>', a);

  res.json({ isUpdatedSuccessful: true });

});


module.exports = router;
