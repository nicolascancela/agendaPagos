function Error(error, req, res, next) {
    const errorMessage = error.message;
    console.log('========================================')
    console.log(errorMessage)
    console.log('PATH: ' + req.path);
    console.log('========================================')
    res.status(400).json({ 'error': errorMessage });
    res.send();
};

module.exports = Error;