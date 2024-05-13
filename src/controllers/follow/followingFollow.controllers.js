const Follow = require("../../models/Follow");
const User = require("../../models/User");

const mongoosePaginate = require("mongoose-pagination");


exports.following = (req, res) => {
    let userId = req.user;
    
    if (req.params.id) userId = req.params.id;

    let page = 1;

    if (req.params.page) page = req.params.page;
    
    const itemsPerPage = 5;

    Follow.find({ user: userId }).exec((err, follows) => {


        return res.status(200).send({
            status: "success",
            message: "Listado de usuarios que sigo: ",
            follows
        });
        
    });

}