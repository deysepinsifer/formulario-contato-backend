
const nodemailer = require('nodemailer')
require('dotenv').config()

const EnviadorDeEmail = (contato) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
       
    });
    
    const mailOptions = {
        from: 'Gleidson <gleidson.ferreirasantos@gmail.com>',
        to: 'gleidson.ferreirasantos@gmail.com',
        subject: "Contato pelo formulário do site",
        html: `<p><b>Nome:</b> ${contato.nome}</p><p><b> Telefone:</b> <p><b>${contato.telefone}</b> Email: ${contato.email}\n Mensagem: ${contato.mensagem}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    });
}

module.exports =  EnviadorDeEmail
 
