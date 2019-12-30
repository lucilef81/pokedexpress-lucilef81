const dataMapper = require('../dataMapper');

const typeController = {
    typesPage: (req, res) => {
        dataMapper.getAllTypes( (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            res.render('types', {
                types: data.rows
            });
        });
    },

    pokemonsByType: (req, res) => {
        const typeId = req.params.typeId;
        dataMapper.getPokemonsByType(typeId, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            //console.log(data.rows);
            res.render('home', {
                pokemons: data.rows
            });
        });
    }
};

module.exports = typeController;