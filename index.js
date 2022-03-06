const express = require('express')
const app = express()
const RSA = require('./rsa');
app.use(express.json())
app.use(express.urlencoded())


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/RSA',(req,res)=>{
   
    const message = req.body.message;
    
    // Generate RSA keys
    const keys = RSA.generate(250);
    
    console.log('Keys');
    console.log('n:', keys.n.toString());
    console.log('d:', keys.d.toString());
    console.log('e:', keys.e.toString());
    
    const encoded_message = RSA.encode(message);
    const encrypted_message = RSA.encrypt(encoded_message, keys.n, keys.e);
    const decrypted_message = RSA.decrypt(encrypted_message, keys.d, keys.n);
    const decoded_message = RSA.decode(decrypted_message);
    
    const response = {
        message,
        encoded_message,
        encrypted_message,
        decrypted_message,
        decoded_message
    }
    
    res.send(response)
})

app.listen(3000)