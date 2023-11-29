
const User = require('../mongo/User');
const Code = require('../mongo/Code');
const bcrypt = require('bcrypt');
const GenerarDiagnostico = require('./gpt');
const session = require('express-session');

exports.cerrarSession = async function (req, res) {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      res.status(500).send('Error al cerrar sesión');
    } else {
      res.status(200).send('Sesión cerrada exitosamente');
    }
  });
}

exports.vistaLogin = async (req, res) => {
  res.render('login');
};

exports.vistaRegistrar = async (req, res) => {
  res.render('registrar');
};

exports.vistaDash = async (req, res) => {

  console.log('USUARIO ACTIVO EN SESSION: --> ', req.session.username);
  console.log('USUARIO ACTIVO EN SESSION: --> ', req.session.userrol);

  if (req.session.userrol == 0) {
    res.render('dash', {
      username: req.session.username,
      userrol: 'Usuario General'
    });
  } else if (req.session.userrol == 1) {
    res.render('dash', {
      username: req.session.username,
      userrol: 'Médico'
    });
  } else if (req.session.userrol == 2) {
    res.render('dash', {
      username: req.session.username,
      userrol: 'Superadministrador'
    });
  } else if (!(req.session?.userrol)) {
    res.redirect('/home');
  }


};

exports.generar = async (req, res) => {
  let User = req.body;

  console.log('Daniel Dash');

  // Enviar el mensaje a ChatGPT
  const response = await GenerarDiagnostico(User);
  console.log('POST CHAT ::::: ', response);

  // Retornar la respuesta de ChatGPT
  res.json({ response });
};

exports.registrarUsuario = async (req, res) => {
  const user = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email: user.email }, { id: user.id }] });

    if (existingUser) {
      return res.status(409).json({ message: 'Ya existe un usuario con el mismo correo electrónico o identificación.', status: false, });
    }

    const hashedPassword = await bcrypt.hash(user.contrasenia, 10);

    //creamos usuario para almacenar en db
    const newUser = new User({
      name: user.name.trim(),
      nickname: user.nickname.trim(),
      tipoId: user.tipoId,
      id: user.id || 0,
      email: user.email,
      celular: user.celular || 0,
      isMedic: user.isMedic || 0,
      code: user.code.trim(),
      sexo: user.sexo,
      contrasenia: hashedPassword,
    });

    //guardamos usuario
    await newUser.save();
    console.log('Usuario agregado correctamente.');

    res.json({ status: true, message: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error('Ocurrió un error al agregar el usuario:', error);
    res.status(500).send('CATCH: Ocurrió un error al agregar el usuario.');
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);

  } catch (error) {
    console.error('Ocurrió un error al obtener los usuarios:', error);
    res.status(500).send('Ocurrió un error al obtener los usuarios.');
  }
};

exports.obtenerCodigos = async (req, res) => {
  try {
    const codes = await Code.find({});
    res.send(codes);

  } catch (error) {
    console.error('Ocurrió un error al obtener los usuarios:', error);
    res.status(500).send('Ocurrió un error al obtener los usuarios.');
  }
};

exports.borrarUsuario = async (req, res) => {
  const { userId } = req.params;
  console.log(req.params);

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log('Usuario eliminado correctamente:', deletedUser);
    res.send('Usuario eliminado correctamente.');
  } catch (error) {
    console.error('Ocurrió un error al eliminar el usuario:', error);
    res.status(500).send('Ocurrió un error al eliminar el usuario.');
  }

};

exports.buscarUsuario = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send('Usuario no encontrado.');
      return;
    }

    console.log('Usuario encontrado.');
    res.send(user);

  } catch (error) {
    console.error('Ocurrió un error al buscar el usuario:', error);
    res.status(500).send('Ocurrió un error al buscar el usuario.');
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const updatedUser = req.body; // Objeto user enviado en el cuerpo de la solicitud
    console.log('RUTA ACT ::: ', updatedUser.id);

    // Si hay una nueva contraseña, generamos el hash de la misma
    if (updatedUser.contrasenia) {
      const hashedPassword = await bcrypt.hash(updatedUser.contrasenia, 10);
      updatedUser.contrasenia = hashedPassword;
    }

    // Actualización del usuario en la base de datos
    const user = await User.findOneAndUpdate({ id: updatedUser.id }, updatedUser, { new: true });

    if (user) {
      console.log('Usuario actualizado correctamente');
      res.status(200).send('Usuario actualizado correctamente');
    } else {
      console.log('No se encontró el usuario en la base de datos');
      res.status(404).send('No se encontró el usuario en la base de datos');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el usuario en la base de datos');
  }
};

exports.login = async (req, res) => {
  const { usuario, contrasenia } = req.body;
  let iduser = parseInt(usuario);

  // Validación de datos de entrada
  if (!usuario || !contrasenia) {
    return res.status(400).json({ success: false, error: 'Debe proporcionar un nombre de usuario y una contraseña' });
  }

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findOne({ id: usuario });

    if (!user) {
      return res.status(401).json({ success: false, error: 'Nombre de usuario incorrecto.' });
    }

    console.log('USUARIODB::', user.name);
    // Comparar la contraseña ingresada con la almacenada en la base de datos
    console.log('USER.contrasenia ->', user.contrasenia);
    console.log('FORM_PASS::: ', contrasenia);
    const match = await bcrypt.compare(contrasenia, user.contrasenia);
    console.log('USER MATCH::: ', match);
    console.log('USER FOUND::: ', user);

    if (!match) {
      return res.status(401).json({ success: false, error: 'Contraseña incorrecta.' });
    }

    // Generar y enviar un token de sesión
    //const token = jwt.sign({ username: user.username }, 'secret-key');
    req.session.username = user.name;
    req.session.userrol = user.isMedic;
    return res.status(200).json({ success: true, message: 'Ok', sessionid: user?._id });
  } catch (error) {
    // Manejar errores específicos
    console.error(error);
    return res.status(500).json({ success: false, error: 'Upps... Algo salió mal.' });
  }
};

exports.contactos = async (req, res) => {
  res.render('contactos');
};

exports.getCode = async (req, res) => {
  res.render('solicitar-codigo');
};

exports.inactivarCodigos = async (req, res) => {
  try {
    await Code.updateMany({ status: 'Active' }, { $set: { status: 'Inactive' } });
    res.send('Actualización exitosa');
  } catch (error) {
    res.status(500).send('Hubo un error al actualizar el estado');
  }
};

exports.guardarCodigo = async (req, res) => {
  try {
    let newCode = new Code(req.body);
    await newCode.save();
    res.send('Se ha añadido un nuevo codigo.');
  } catch (error) {
    res.status(500).send('Hubo un error al añadir el código');
  }
};

exports.usarCodigo = async (req, res) => {
  try {
    let code = req.body.code;
    console.log(req.body);
    console.log('CODIGO RECIBIDO::-->:: ', code);
    let codeInDb = await Code.findOne({ code: code});

    if (codeInDb) {
      let codeAndStatusInDb = await Code.findOne({ code: code, status: 'Active' });
      if(codeAndStatusInDb){
        // Cambiar el estado a 'Inactive'
        codeAndStatusInDb.status = 'Inactive';
        await codeAndStatusInDb.save();
        res.json({ message: 'El codigo es valido.', status: true });
      }else {
        res.json({ message: 'El codigo proporcionado ya ha sido utilizado.', status: false });
      }
    } else {
      res.json({ message: 'El código proporcionado no es válido.', status: false });
    }
  } catch (error) {
    res.status(500).send('Hubo un error al registrar al usuario');
  }
};



