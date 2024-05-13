const Follow = require("../../models/Follow");
const User = require("../../models/User");

const mongoosePaginate = require("mongoose-pagination");

const followServices = require("../../services/followServices");

exports.following = (req, res) => {
    let userId = req.user;
    
    if (req.params.id) userId = req.params.id;

    let page = 1;

    if (req.params.page) page = req.params.page;
    
    const itemsPerPage = 5;

    Follow.find({ user: userId })
        .populate("user followed", "-password -role -__v")
        .paginate(page, itemsPerPage, async(err, follows, total) => {
            if (err) return res.status(500).send({ message: "Error en el servidor" });
            if (!follows) return res.status(404).send({ message: "No estas siguiendo a ningún usuario" });

           let followUserIds = await followServices(req.user.userid)

            return res.status(200).send({
                total: total,
                pages: Math.ceil(total / itemsPerPage),
                follows,
                users_following: followUserIds.following,
            });
        });
}
        
