import dotenv from 'dotenv';
import express from 'express';
import cookieparser from 'cookie-parser';
import fetch from 'node-fetch';
import cors from "cors";  
// Configuring dotenv
dotenv.config();
  
const app = express();
  
// Setting up middlewares to parse request body and cookies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );
const refresh_url="http://14.97.142.161:8080/api/refresh-tokens";
const access_url="http://14.97.142.161:8080/api/access-tokens";
const login_url="http://14.97.142.161:8080/api/login-tokens";

async function getRefreshToken(){        
    let ts = new Date().getTime();
    let data = {
      userName: "dg@celestialsys.com",
      password: "test",
      clientOrgRef: "Data Governance"
     }
   const refreshResponse = await fetch(refresh_url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `YELLOWFIN ts=${ts}, nonce=123`,
        'Accept': 'application/vnd.yellowfin.api-v2+json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      },
    });
  const refreshData = await refreshResponse.json();
  const refreshToken = refreshData.securityToken;
  return refreshToken 
}

async function getAccessToken(){        
    let ts = new Date().getTime();
    let data = {
      userName: "dg@celestialsys.com",
      password: "test",
      clientOrgRef: "Data Governance"
     }
   let refreshToken = await getRefreshToken();
   const accessResponse = await fetch(access_url, {
   method: "POST",
   body: JSON.stringify(data),
   headers: {
    'Content-Type': 'application/json',
    'Authorization': `YELLOWFIN ts=${ts}, nonce=123, token=${refreshToken}`,
    'Accept': 'application/vnd.yellowfin.api-v2+json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    },
    });
    const accessData = await accessResponse.json();
    const accessToken = accessData.securityToken;
    return accessToken; 
    }   

    async function getLoginToken(){        
        let ts = new Date().getTime();
        let data = {
          userName: "dg@celestialsys.com",
          password: "test",
          clientOrgRef: "Data Governance"
         }
       let accessToken = await getAccessToken();
       const loginResponse = await fetch(login_url, {
       method: "POST",
       body: JSON.stringify(data),
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `YELLOWFIN ts=${ts}, nonce=123, token=${accessToken}`,
        'Accept': 'application/vnd.yellowfin.api-v2+json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
        });
        const loginData = await loginResponse.json();
        const loginToken = loginData.securityToken;
        return loginToken; 
        }  
      
const userCredentials = {
    username: 'admin',
    password: 'test',
    email: 'dg@celestialsys.com'
}
const Url = 'http://34.236.87.39:8080'; 

app.get('/loginToken', async (req,res)=>{
    try{
        const loginToken = await getLoginToken();
        return  res.status(200).send({loginToken: loginToken});
    }
    catch(error){
        return res.status(404).send({message:+ error });
    }
})


app.post('/login', async (req, res) => {
    // Destructuring username & password from body
    const { email, password } = req.body;
  
    // Checking if credentials match
    if (email === userCredentials.email && 
        password === userCredentials.password) {
        return res.status(200).json({ message: 'Login Successful', data: userCredentials});
    }
    else {
        return res.status(404).json({ message: 'Invalid Credentials' });
    }
});
  
app.listen(process.env.PORT, () => {
    console.log(`Server active on http://34.236.87.39:${process.env.PORT}!`);
})