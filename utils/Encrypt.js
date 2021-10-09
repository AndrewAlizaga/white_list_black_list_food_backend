const bcrypt = require("bcrypt")
const saltRounds = 10;


//1 way encription
const encrypt = async (plainText) => {
    return await bcrypt.hashSync(plainText, saltRounds)
}

const compare = async (unCrypted, crypted) => {
    return await bcrypt.compare(unCrypted, crypted);
}


module.exports = {
    encrypt,
    compare
}
