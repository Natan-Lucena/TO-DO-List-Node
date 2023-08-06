const authModel = require('../models/authModel');

const validateData = async (req, res) => {
    try{
        const {user, email, password, confirmPassword} = req.body
    
        if(!user || !email || !password || !confirmPassword ){
            return res.status(422).json({msg : "Something is missing!"})
        };
        if(password !== confirmPassword){
            return res.status(422).json({msg: "The Passwords doesn't match"})
        };
        const userFinder = await authModel.findByUser(user);
        if(userFinder.length > 0){
            return res.status(422).json({msg: "This user already exists"})
        }
        const emailFinder = await authModel.findByEmail(email);
        if(emailFinder.length > 0){
            return res.status(422).json({msg:"This Email is already been used"})
        }
        await authModel.registerUser(user, password.toString(), email)
        return res.status(200).json({msg: "Congratulations, You can use To do List Now"});
    }catch(error){
        console.error("Erro ao registrar:",error)
        return res.status(500).send("Ocorreu um erro ao registrar")
    }
};


module.exports = {
    validateData
};