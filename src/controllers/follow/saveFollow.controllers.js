const Follow = require('../../models/Follow');
const User = require('../../models/User');


exports.saveFollow = (req, res) => {

    const idUser = req.user.id;




    res.status(200).send({ message: 'saveFollow controller works' });

}