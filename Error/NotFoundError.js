class NotFoundError extends Error {
    status = 404;
}

module.exports = NotFoundError;