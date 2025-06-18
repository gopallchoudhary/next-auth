import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

// connect mongodb
connect()

export async function POST(request: NextRequest) {
    try {
        // get user details
        const reqBody = await request.json()
        const { email, password } = reqBody
        

        // get user
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                message: "User not found",
                status: 501
            })
        }


        // password check
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({
                success: false,
                message: "Wrong Password",
                status: 5001
            })
        }

        // token data
        const tokenData = {
            _id: user._id,
            username: user.username,
            email: user.email,
        }

        // create token
        const token = jwt.sign(
            tokenData,
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" }
        )

        // response
        const response = NextResponse.json({
            success: true,
            message: "User logged in successfully"
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;




    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}
