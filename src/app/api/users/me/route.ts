import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect()

export async function GET(request: NextRequest) {
    try {
        // get userid (getDataFromToken returns id)
        const userId = await getDataFromToken(request)
        
        // get user
        const user = await User.findOne({_id: userId})
        return NextResponse.json({
            success: true,
            data: user
        })


    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "error in fetching user details"
        })
    }
}