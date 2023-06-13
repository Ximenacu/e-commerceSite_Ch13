const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {include: [
      {model: Product, 
       attributes: ['product_name']
      }]   
    }).then((categoryData)=>{
    res.json(categoryData)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const productId = req.params.id;
  Category.findOne(
    {where: { id: productId },
      include: [
        {
          model: Product,
          attributes: ['product_name'], 
        }]} 
    ).then((productData)=>{
    res.json(productData)
  })
});

router.post('/', (req, res) => {
  // create a new category
  // let newcat=req.body;
  // console.log("-----------newcategory: ",newcat);
  Category.create(req.body)
    .then((cat)=>{
      res.status(200).json(cat)
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then((cat)=>{
    res.status(200).json(cat);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Product.update({category_id: null},
    {where: {category_id:req.params.id}})
    .then(()=>{
      Category.destroy({where: {id: req.params.id}})
      .then(()=>{
        res.status(200).json("Deleted");
      })
    }).catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
