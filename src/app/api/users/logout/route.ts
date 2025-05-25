import { NextRequest, NextResponse } from "next/server";

export async function GET(requset: NextRequest) {
    try {
        const response =  NextResponse.json({
            success: true,
            message: "user logged out"
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}