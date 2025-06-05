import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// mongodb connection
connect()

export async function POST(request: NextRequest) {
    try {
        // get user details 
        const reqBody = await request.json()
        const { username, email, password } = reqBody;
        console.log(reqBody);

        // check all fields
        if ([username, email, password].some((field) => field?.toString().trim() == "")) {
            return NextResponse.json({
                message: "All fields are required",
                status: 400
            })
        }

        // existed user
        const existedUser = await User.findOne({ email })
        if (existedUser) {
            return NextResponse.json({
                message: "user already exists",
                status: 400
            })
        }

        // password hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({
            success: true,
            message: "user created successfully",
            savedUser
        })



    } catch (error: any) {
        return NextResponse.json({
            message: error.messae,
            status: 400
        })
    }
}