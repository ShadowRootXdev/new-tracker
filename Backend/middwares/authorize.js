const authorize = (roles = []) => {
    // Ensure roles is an array
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden: You do not have access to this resource.' });
        }
        next();
    };
};

export default authorize;
