Meteor.startup(function () {


  log('== flushing DB ==');
  Orders.remove({});
  Goods.remove({});
  Categories.remove({});
  log('== DB flushed ==');



  log('== seed start ==');


  let categories = ['books', 'games', 'cars', 'PC'];
  let tags = ['tag1', 'tag2', 'tag3', 'tag4'];

  _.each(categories, (value) => {
    Categories.insert({
      name: value,
      description: faker.lorem.sentence(5, 30)
    });
  });

  var categoriesBySlug = {};
  _.each(Categories.find().fetch(), function(value) {
    categoriesBySlug[value.slug] = value._id;
  });
  categories = Categories.find().fetch();

  for (var i = 0; i < 40; i++) {
    Goods.insert({
      name: faker.commerce.productName(),
      category_id: _.sample(categories)._id,
      price: faker.commerce.price(),
      tags: _.sample(tags, _.random(1,4))
    });
  }

  let goods = Goods.find().fetch();

  for (var i = 0; i < 40; i++) {
    Orders.insert({
      "address": {
        "street": faker.address.streetName(true),
        "suite": faker.address.secondaryAddress(),
        "city": faker.address.city(),
        "zipcode": faker.address.zipCode(),
        "geo": {
          "lat": faker.address.latitude(),
          "lng": faker.address.longitude()
        }
      },
      goods: _.sample(goods, _.random(1,9))
    })
  }

  log('== seed end ==');

});
