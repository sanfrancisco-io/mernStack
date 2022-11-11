const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    //verify authenticaion

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    //токен приходит в виде Bearer token
    //и мы разделяем его с помощью метода сплит и берем от туда только токен
    const token = authorization.split(' ')[1];
    try {
        const { _id } = jwt.verify(token, process.env.SECRET_KEY);

        req.user = await User.findOne({ _id }).select('_id');
        //возвращаем только id через свойсвто селект
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;
