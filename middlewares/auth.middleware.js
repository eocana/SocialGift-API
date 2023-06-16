const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, 'clave_secreta');
    //console.log(decoded);
    req.user = {
      userId : decoded.userId
    }

    console.log("Estoy en authMiddleware mi ID es: " + req.user.userId);
    
    next();
  } catch (err) {
    console.log("Estoy en authMiddleware catch: " + err);
    return res.status(403).json({ message: 'Token inválido' });
  }
}

module.exports = authMiddleware;
