// action test

const testUser = (req, res) => {
    return res.status(200).json({
        message: "Hello world user"
    });
}

module.exports = { testUser };  // Cambia aquí para usar module.exports correctamente
