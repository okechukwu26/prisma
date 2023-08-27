
import { validationResult } from "express-validator" 
 export const handleError  = (req, res, next) =>{
    const error = validationResult(req)
    console.log(error)
    if(!error.isEmpty()){
        res.status(400)
        res.json({errors:error.array()})
    }else {
        next()
    }


}