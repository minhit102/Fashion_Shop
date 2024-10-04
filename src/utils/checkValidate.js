function isValidDate(stringDate) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(stringDate);
}

function compareDates(startTime, endTime) {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    if (startDate > endDate) {
        return 0
    }

    return 1;
}

module.exports = { isValidDate, compareDates } 
