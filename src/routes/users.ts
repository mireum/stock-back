// const express = require('express');
// const userDBC = require('./usersDBC');
// const router = express.Router();

// router.get('/getUsers', async (req, res)=>
// {
//     let res_get_users = 
//     {
//         status_code : 500,
//         users : [] 
//     };

//     try
//     {
//         const rows = await userDBC.getUsers();
//         res_get_users.status_code = 200;
//         if(rows.length > 0)
//         {
//             rows.forEach((user)=>
//             {
//                 res_get_users.users.push
//                 ({
//                     userId : user.userId,
//                     userPassword : user.userPassword,
//                     userName : user.userName,
//                     userSignUpDate : user.userSignUpDate
//                 });
//             });
//         }
//         else
//         {
//             console.log('사용자 없음');
//         }
//     }
//     catch(error)
//     {
//         console.log(error.message);
//     }
//     finally
//     {

//         //응답 
//         //res.json(res_get_users);
//         var result = '';

//         for(var i=0; i < res_get_users.users.length; i++)
//         {
//         result += res_get_users.users[i].userId;
//         result += res_get_users.users[i].userPassword;
//         result += res_get_users.users[i].userName;
//         result += res_get_users.users[i].userSignUpDate;
        
//         result += "<br>";
//         }

//         res.send(result);
//     }
// });


// module.exports = router;
import express, { Request, Response } from 'express';
import { getUsers } from '../database/usersDBC.ts';
// import {userDBC as userDBC} from '../database/usersDBC.ts';
const router = express.Router();

interface User {
    userId: number;
    userPassword: string;
    userName: string;
    userSignUpDate: string;
}

// interface ResGetUsers {
//     status_code: number;
//     users: User[];
// }

router.get('/getUsers', async (req: Request, res: Response) => {
    let res_get_users = {
        status_code: 500,
        users: [] as User[],
    };

    try {
        const rows = await getUsers();
        res_get_users.status_code = 200;

        if (rows.length > 0) {
          rows.forEach((user) => {
            res_get_users.users.push({
              userId: user.userId,
              userPassword: user.userPassword,
              userName: user.userName,
              userSignUpDate: user.userSignUpDate,
            });
          });
        } else {
            console.log('사용자 없음');
        }
    } catch (error) {
        console.log(error.message);
    } finally {
        // 응답
        // res.json(resGetUsers);
        let result = '';

        res_get_users.users.forEach((user) => {
          result += `${user.userId} ${user.userPassword} ${user.userName} ${user.userSignUpDate}<br>`;
        });

        res.send(result);
    }
});

export default router;