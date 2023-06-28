const dotenv = require('dotenv');
const express = require('express');
const cookieparser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
  
// Configuring dotenv
dotenv.config();
  
const app = express();
  
// Setting up middlewares to parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
  
const userCredentials = {
    username: 'admin',
    password: 'test',
    email: 'dg@celestialsys.com'
}

const Url = 'http://34.236.87.39:8080';
  
app.post('/login', async (req, res) => {
    // Destructuring username & password from body
    const { email, password } = req.body;
  
    // Checking if credentials match
    if (email === userCredentials.email && 
        password === userCredentials.password) {
        return res.status(200).json({ message: 'Login Successful', data: userCredentials});
        //  try{
        //     let _data = {
        //         "userName": email,
        //         "password": password,
        //         "clientOrgRef": "Data Governance"
        //        }
        //       let ts = new Date().getTime();    
        //       const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        //             method: "POST",
        //             body: JSON.stringify(_data),
        //             headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": `YELLOWFIN ts=${ts}, nonce=123`,
        //             "Accept" : "application/vnd.yellowfin.api-v2+json"  
        //            }
        //           })
                 
        //         const data = await response.json();

        //         //   .then(response => response.json()) 
        //         //   .then(json => console.log(json));
        //         //   .catch(err => console.log(err)); 
        //  } catch(error) {
        //     console.log("error in fetching refresh token", error);
        //  }   
           
        //creating a access token
        // const accessToken = jwt.sign({
        //     username: userCredentials.username,
        //     email: userCredentials.email
        // }, process.env.ACCESS_TOKEN_SECRET, {
        //     expiresIn: '10m'
        // });
        // Creating refresh token not that expiry of refresh 
        //token is greater than the access token
          
        // const refreshToken = jwt.sign({
        //     username: userCredentials.username,
        // }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
  
        // Assigning refresh token in http-only cookie 
        // res.cookie('jwt', refreshToken, { httpOnly: true, 
        //     sameSite: 'None', secure: true, 
        //     maxAge: 24 * 60 * 60 * 1000 });
        // return res.json({ accessToken });
    }
    else {
        return res.status(404).json({ message: 'Invalid Credentials' });
        // Return unauthorized error if credentials don't match
        // return res.status(406).json({ 
        //     message: 'Invalid credentials' });
    }
});
  
// app.post('/refresh', (req, res) => {
//     if (req.cookies?.jwt) {
  
//         // Destructuring refreshToken from cookie
//         const refreshToken = req.cookies.jwt;
  
//         // Verifying refresh token
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
//         (err, decoded) => {
//             if (err) {
  
//                 // Wrong Refesh Token
//                 return res.status(406).json({ message: 'Unauthorized' });
//             }
//             else {
//                 // Correct token we send a new access token
//                 const accessToken = jwt.sign({
//                     username: userCredentials.username,
//                     email: userCredentials.email
//                 }, process.env.ACCESS_TOKEN_SECRET, {
//                     expiresIn: '10m'
//                 });
//                 return res.json({ accessToken });
//             }
//         })
//     } else {
//         return res.status(406).json({ message: 'Unauthorized' });
//     }
// })
  
app.listen(process.env.PORT, () => {
    console.log(`Server active on http://34.236.87.39:${process.env.PORT}!`);
})