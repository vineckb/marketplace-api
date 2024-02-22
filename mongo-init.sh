set -e

mongo <<EOF
db = db.getSiblingDB('catalog')

db.createUser({
  user: 'catalog',
  pwd: 'topsecret',
  roles: [{ role: 'readWrite', db: 'catalog' }],
});

db.createCollection('products')
db.createCollection('merchants')
db.createCollection('sections')

EOF
