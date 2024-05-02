// action test

const testUSer = (req, res) => {
    return res.status(200).json({
        message: "Hello world user"
    });
}

module.exports = {
    testUSer
}