const User = require("../../models/User");
const bcrypt = require("bcrypt");


exports.update = async (req, res) => {
    try {
      // Obtener información del usuario a actualizar
      let userToUpdate = req.body;
      let userIdentity = req.user;
  
      // Eliminar datos sensibles
      delete userToUpdate.iat;
      delete userToUpdate.exp;
      delete userToUpdate.role;
      delete userToUpdate.image;
  
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({
        $or: [
          { email: userToUpdate.email.toLowerCase() },
          { nick: userToUpdate.nick.toLowerCase() },
        ],
      });
  
      if (existingUser && existingUser._id != userIdentity.id) {
        return res.status(409).json({
          status: "error",
          message: "User already exists",
        });
      }
  
      // Si se proporciona una nueva contraseña, encriptarla
      if (userToUpdate.password) {
        const hashedPassword = await bcrypt.hash(userToUpdate.password, 10);
        userToUpdate.password = hashedPassword;
      }
      try {
        let userUpdate =  await User.findByIdAndUpdate(
          userIdentity.id,
          userToUpdate,
          { new: true })
            
        if (err || !userUpdated) {
          return res.status(500).json({
            status: "error",
            message: "Error updating user",
          });
        }
          // delete data is sensitive
          userUpdated.password = undefined;
  
          return res.status(200).json({
            status: "success",
            message: "User updated successfully",
            user: userUpdated,
          });
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: "Error updating user",
        });
      }
     
  
        
        
     
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  };
  