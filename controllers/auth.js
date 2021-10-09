//Libs
const { validationResult, body } = require('express-validator');

//Model & Services
const userModel = require("../DB/models/user");
const {createToken} = require("../utils/token")


//Create account
const authenticate = async (req, res) => {
    console.log('authenticate controller')

    try {
        //Check basic auth

        //check for basic auth header
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            return res.status(401).json({ 'errorMessage': 'Missing Authorization Header' });
        }

        // verify auth credentials
        const base64Credentials = req.headers.authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        const [username, password] = credentials.split(':');

        //Find user
        console.log('uname '+username)
        const user = await userModel.findOne({"name": username})

        if (!user) {
            console.log('user not found')
            return res.status(401).json({ errorMessage: 'Invalid Authentication Credentials'});
        }

        //Check password match
        console.log('user found...')
        const match = await user.passwordMatch(password)

        if(!match)
            return res.status(401).json({ errorMessage: 'Invalid Authentication Credentials'});
        
        console.log('pass result: '+match);

        //Create token
        const token = createToken(user._id)

        return res.status(200).json({'message': 'welcome', token})

        
    } catch (error) {
        //Server error catch
        console.log(error);
        return res.status(503).json({ 'errorMessage': error });
    }

}

module.exports = {
    authenticate
}
