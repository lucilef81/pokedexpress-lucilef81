const dataMapper = require('../dataMapper');

const teamController = {
    teamPage: (req, res) => {
        //console.log(req.session);
        res.render('team',{
            pokemons: req.session.team
        });
    },

    addToTeam: (req, res) => {
        const pokemonNum = req.params.numero;
        // on vérifie d'abord si le pokemon n'est pas déjà dans la team
        const filteredList = req.session.team.filter( (pkmn) => {
            return pkmn.numero == pokemonNum;
        });
        if (filteredList.length) {
            return res.render('team',{
                pokemons: req.session.team,
                error: 'Ce Pokemon est déjà dans votre équipe.'
            });
        }
        // ensuite on vérifie si la team n'a pas déjà 6 membres
        if (req.session.team.length >= 6) {
            return res.render('team',{
                pokemons: req.session.team,
                error: 'Votre équipe comporte déjà 6 pokemons.'
            });
        } 

        dataMapper.getPokemonDetails(pokemonNum, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            req.session.team.push(data.rows[0]);
            res.redirect('/team');
        });
    },
    
    deleteFromTeam: (req, res) => {
        const pokemonNum = req.params.numero;
        // on filtre la team!
        req.session.team = req.session.team.filter( (pkmn) => {
            return pkmn.numero != pokemonNum;
        });
        res.redirect('/team')
    }
};


module.exports = teamController;