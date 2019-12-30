const pg = require('pg');
const client = new pg.Client("postgres://pokedex:pokedex@localhost/pokedex")
client.connect();

client.query("SELECT * FROM pokemon", (err, data) => {
  client.end();
if (err) {
  console.log(err);
  return;
} else {
  console.log(data);
}
} );



