//Libs
const {validationResult, body} = require('express-validator');

//Models
const accountModel = require("../DB/models/user");


//Create account
const createAccount = async (req, res) => {
    console.log('create account controller')
    //Validate body
    const errors = validationResult(req)
    
    //Ivalid request
    if(!errors.isEmpty())
        return res.status(403).json({'errorMessage': errors.array()})
    

    try {

        //Attempting user creationg
        const newAccount = new accountModel(req.body);

        newAccount.save().then(e => {
            return res.status(200).json({'result': 'success', 'message': e})
        });
    } catch (error) {
        //Server error catch
        console.log(error);
        return res.status(503).json({'errorMessage': error});
    }
    
}

//Update Account
const updateAccount = async (req, res) => {
    console.log('Update account controller')
    //Validate body
    const errors = validationResult(req)
    
    //Ivalid request
    if(!errors.isEmpty())
        return res.status(403).json({'errorMessage': errors.array()})

    try {

        //find user
        const account = await accountModel.findById(req.user._id);

        if(!account)
            return res.status(503).json({'errorMessage': 'Account error'});
        
        account.name = req.body.name
        account.password = req.body.password

        account.save().then(e => {
            return res.status(200).json({'result': 'success', 'message': e})
        });
    } catch (error) {
        //Server error catch
        console.log(error);
        return res.status(503).json({'errorMessage': error});
    }
    
}

//Delete Account
const deleteAccount = async (req, res) => {
    console.log('Delete account controller')
    
    try {

        //find user
        const account = await accountModel.findById(req.user._id);

        if(!account)
            return res.status(503).json({'errorMessage': 'Account error'});

        account.remove().then(e => {
            return res.status(200).json({'result': 'success, your account has been deleted', 'message': e})
        });

    } catch (error) {
        //Server error catch
        console.log(error);
        return res.status(503).json({'errorMessage': error});
    }
    
}

//Check accounts
const getAccounts = async (req, res) => {

    try {
        console.log('get posts controller')

        //Get accounts, and remove sensitive info
        const accounts = await accountModel.find().select('-password')
        res.status(200).json(accounts);

    } catch (error) {
        return res.status(503).json({ 'errorMessage': error.toArray() })

    }

}

module.exports = {
    createAccount,
    updateAccount,
    deleteAccount,
    getAccounts
}
