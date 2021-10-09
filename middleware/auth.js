//Model & Services
const userModel = require("../DB/models/user");
const {validateToken} = require("../utils/token")


//Create account
const authMiddleware = async (req, res, next) => {
    console.log('auth middleware')

    try {
        let authorization = req.headers.authorization;
        
        if(!authorization)
            return res.status(403).json({'errorMessage': 'Missing token'})
        
        let [type, data] = authorization.split(" ");
        
        if(type!='Bearer')
            return res.status(403).json('Bad formulated')

        validateToken(data).then(async result => {

            console.log(result)
            const user = await userModel.findById(result.data);
            console.log(user)

            let user_  = {_id, name, createdAt} = user;

            req.user = user_;
            next();
        }).catch(err => {
            //Validation error catch
            console.log('error')
            console.log(err)
            return res.status(401).json({'errorMessage': 'unauthorized'})
        })
        
    } catch (error) {
        //Server error catch
        console.log(error);
        return res.status(503).json({ 'errorMessage': error });
    }

}

module.exports = {
    authMiddleware
}
