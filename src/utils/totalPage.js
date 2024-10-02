const totalPage = (total, limit) => {
    if (total % limit) {
        return parseInt(total / limit) + 1;
    }
    return parseInt(total / limit)
};

module.exports = totalPage; 
