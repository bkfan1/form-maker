import { verifyToken } from "../../../../middlewares/authentication/jwt";
import { changeAccountPassword } from "../../../../middlewares/account/password";

export default async function handler(req, res){
    switch (req.method) {
        case "PUT":
            return await verifyToken(req, res, changeAccountPassword);
            
            break;
    
        default:
            return await res.status(405).json({message: ""})
            break;
    }
    
}