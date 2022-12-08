const signupTemplateCopy = require('../models/signupmodels')
const b = require('bcrypt');



const jwt = require('jsonwebtoken');
const privateKey = "tempKey";

const generateJWT = async (data) => {
    let token = await jwt.sign(data, privateKey, { expiresIn: 10 });
    return token;
}

exports.verifyJWT = async (req, res, next) => {
    let { token } = req.headers;
    try {
        let status = jwt.verify(token, privateKey);
        if (status) {
            let decoded = jwt.decode(token);
            res.username = decoded.username;
            next();
            
        }
        else {
            res.send("Invalid Token");
        }
    }
    catch {
        res.send("Invalid Token");
    }
}




exports.signup = async (req, res) => {
    const p = await b.hash(req.body.password, 10)
    console.log(p)
    const signupUser = new signupTemplateCopy({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: p
    })
    signupUser.save()
        .then(data => {
            res.send(data)
          
        })
        .catch(err => {
           
            res.json(err)
        })

}

exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const data = await signupTemplateCopy.findOne({ email: req.body.email })
        const check = await b.compare(req.body.password, data.password)
        console.log(data, check)
        if (check) {
            res.send({ t: true });
            let token = await generateJWT({ username: username });
            console.log(token)
        }
        else {
            res.send({ t: false })
        }
    } catch (err) {
        res.send({ error: "User Not Found Please Login" })
    }
}


exports.home = async (req, res) => {
    try {
        console.log(req.body)
        const data = await signupTemplateCopy.findOne({ email: req.body.email })
        
        console.log(data)
       
    } catch (err) {
        res.send({ error: "User Not Found Please Login" })
    }
}





