import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token);

        //? find user with token 
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })

        
        if (!user) {
            return NextResponse.json({
                error: "Invalid token",
                status: 400
            })
        }

        console.log(user);
        

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
        await user.save()

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 400
        })
    }
}