const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_SAUCE;

function createToken(payload){

    const token = jwt.sign({data: payload}, secret, {expiresIn: '20h'});
    return token;
}

const validateToken = data => new Promise(async function(resolve, reject){

    try {
        let result = await jwt.verify(data, secret);
    
        if(result){
            console.log(result)
            resolve(result)
        }else(
            reject('error')
        )    
    } catch (error) {
        reject(error)   
    } 
    
})

module.exports = {createToken, validateToken};
