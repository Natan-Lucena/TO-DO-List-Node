const authModel = require('../models/authModel');

const registerUser = async (req, res) => {
    try{
        const {user, email, password, confirmPassword} = req.body
    
        if(!user || !email || !password || !confirmPassword ){
            return res.status(422).json({msg : "Something is missing!"})
        };
        if(password !== confirmPassword){
            return res.status(422).json({msg: "The Passwords doesn't match"})
        };
        const userFinder = await authModel.findByUser(user);
        if(userFinder){
            return res.status(422).json({msg: "This user already exists"})
        }
        const emailFinder = await authModel.findByEmail(email);
        if(emailFinder){
            return res.status(422).json({msg:"This Email is already been used"})
        }
        await authModel.registerUser(user, password.toString(), email)
        return res.status(200).json({msg: "Congratulations, You can use To do List Now"});
    }catch(error){
        console.error("Erro ao registrar:",error)
        return res.status(500).send("Ocorreu um erro ao registrar")
    }
};
const loginUser = async (req,res) =>{
    try{
        const {email , password} = req.body;
        const user = await authModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({ msg: 'Email ou senha incorretos.' });
        }
        const passwordMatch = await authModel.verifyPassword(password,user.Password)
        if(passwordMatch){
            return res.status(200).json(user.JWT)
        }else{
            return res.status(401).json({ msg: 'Email ou senha incorretos.' });
        }
    }catch(error){
        console.error("Erro ao efetuar login:",error)
        return res.status(500).send("Ocorreu um erro")
    }
};


module.exports = {
    registerUser,
    loginUser
};