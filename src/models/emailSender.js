const nodemailer =  require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user: "mountainstodo@gmail.com",
        pass: process.env.PASSWORD
    }
});

const sendEmail = async (email) => {
    await transporter.sendMail({
        from:"To-Do Mountains <mountainstodo@gmail.com>",
        to:email,
        subject:"Seja bem vindo ao To-Do Mountains :)",
        html:"<h1> Bem Vindo A Nossa Aplicação </h1>",
        text:"Bem vindo Ao Nosso APP"
    }).then(() => console.log("Email enviado com sucesso"))
        .catch((error) => console.log("Algo deu errado:",error));
};
module.exports = {sendEmail};