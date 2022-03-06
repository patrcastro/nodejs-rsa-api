const express = require('express')
const swaggerUi = require('swagger-ui-express')
const app = express()
const RSA = require('./rsa');
const swaggerJson = require('./swagger.json')
app.use(express.json())
app.use(express.urlencoded())
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.post('/RSA',(req,res)=>{
   
    try{
        const message = req.body.message;      
        const keys = RSA.generate(1024);
        
        const encoded_message = RSA.encode(message);
        const encrypted_message = RSA.encrypt(encoded_message, keys.n, keys.e);
        const decrypted_message = RSA.decrypt(encrypted_message, keys.d, keys.n);
        const decoded_message = RSA.decode(decrypted_message);
        
        const response = {
            message,
            encrypted_message,
            decoded_message
        }

        res.send(response)
    }
    catch(error){
        throw new Error(error)
    }
})

app.listen(3000)