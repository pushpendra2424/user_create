const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.post("/user",userController.userCreate)
router.get("/user",userController.userdata)
router.put("/user/:userId",userController.updateUser)

// let arr = [4, 32, 2, 5, 8];

// for (let i = 0; i < arr.length; i++) {
//   for (let j = i + 1; j < arr.length; j++) {
//     if (arr[i] > arr[j]) {
//       temp = arr[i];
//       arr[i] = arr[j];
//       arr[j] = temp;
//     }
//   }
// }
// console.log("Sorted array=>", arr);

// for(let i = 1;i<=5;i=i++){
//     console.log(i)
//     // for(let b = 1;b<=i;b++){
//     //     console.log(b+" ")
//     // }
   

// }
module.exports= router;
