db = db.getSiblingDB('catalog');

db.createUser({
  user: 'catalog',
  pwd: 'topsecret',
  roles: [{ role: 'readWrite', db: 'catalog' }],
});

db.createCollection('products');
db.createCollection('merchants');
db.createCollection('sections');

db = db.getSiblingDB('cart');
db.createUser({
  user: 'cart',
  pwd: 'topsecret',
  roles: [{ role: 'readWrite', db: 'cart' }],
});

db.createCollection('products');
db.createCollection('merchants');
db.createCollection('sections');
