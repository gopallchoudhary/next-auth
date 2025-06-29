import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getDataFromToken = (request: NextRequest) => {
    try {
        //token 
        const token = request.cookies.get("token")?.value || ""

        //decoded token
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decodedToken._id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}