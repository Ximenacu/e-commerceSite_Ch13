const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll(
    {include: [
      {model: Product, 
       attributes: ['product_name'],
       through: { attributes: [] },
      }]   
    }).then((tagData)=>{
    res.json(tagData)
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const productId = req.params.id;
  Tag.findOne(
    {where: { id: productId },
      include: [
        {
          model: Product,
          attributes: ['product_name'], 
          through: { attributes: [] },
        }]} 
    ).then((tagData)=>{
    res.json(tagData)
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then((tag)=>{
    res.status(200).json(tag)
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  let teg=req.body;
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    }
  })
  .then(()=>{
    res.status(200).json(teg);
  }).catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  // ProductTag.update({tag_id: null},
  //   {where: {tag_id:req.params.id}})
  //   .then(()=>{
      Tag.destroy({where: {id: req.params.id}})
      .then((tag)=>{
        res.status(200).json(`Deleted Tag with id: ${tag}!`);
      })
    // })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;
