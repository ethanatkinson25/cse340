
const ErrorPage = (req, res, next) => {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
};


export { ErrorPage };