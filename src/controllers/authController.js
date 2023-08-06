const authModel = require('../models/authModel');

const validateData = async (req, res) => {
    const {user, email, password, confirmPassword} = req.body

    if(!user || !email || !password || !confirmPassword ){
        return res.status(422).json({msg : "Something is missing!"})
    };
    if(password !== confirmPassword){
        return res.status(422).json({msg: "The Passwords doesn't match"})
    };
    const userFinder = await authModel.findByUser(req.body.user);
    if(userFinder.length > 0){
        return res.status(422).json({msg: "This user already exists"})
    }
    const emailFinder = await authModel.findByEmail(req.body.email);
    if(emailFinder.length > 0){
        return res.status(422).json({msg:"This Email is already been used"})
    }
    res.status(200).json({msg: "cadastrou"});
};


module.exports = {
    validateData
};