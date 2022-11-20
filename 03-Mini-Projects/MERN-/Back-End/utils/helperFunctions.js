// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
const objDataExtractor = (obj) => {
    let results = "";
    for (const [key, value] of Object.entries(obj)) {
        results += `${key}: ${value}\t`;
    }
    return results;
};

module.exports = { objDataExtractor };
