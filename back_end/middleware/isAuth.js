const jwt = require('jsonwebtoken');

const isAuth = async (req, res, next) => {
    // Check if the authorization header is present
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'You can\'t access this feature without logging in!' });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];

    try {
        // Retrieve the secret key from the environment variable
        const secretKey = process.env.SECRET_KEY;

        // Verify the token asynchronously using a promise-based approach
        const payload = await jwt.verify(token, secretKey, { algorithms: ['HS256'] });

        // Attach the decoded user ID to the request object
        req.userId = payload.id;

        next();
    } catch (error) {
        // Handling different error cases separately
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired, please log in again.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token, please log in again.' });
        }

        console.error('Authentication Error:', error.message);
        return res.status(401).json({ message: 'Authentication failed. Please try again.' });
    }
};

module.exports = isAuth;
