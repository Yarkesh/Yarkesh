
exports.handler = (inputErrors) => {
    const outputErrors = new Object();
    inputErrors.forEach((item) => {
        if (outputErrors[item.param]) {
            outputErrors[item.param].push(item.msg);
        } else {
            outputErrors[item.param] = new Array(item.msg);
        }
    });
    return outputErrors;
}