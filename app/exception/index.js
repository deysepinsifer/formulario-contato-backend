class EntityAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = EntityAlreadyExistsError;