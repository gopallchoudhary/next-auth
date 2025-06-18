"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios"

export default function verifyEmailPage() {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)


    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
        } catch (error: any) {
            throw new Error(error.response)
            console.log(error.message);
        }
    }

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="bg-orange-500 text-black p-2 rounded-md mt-2">{token ? `${token}` : "No Token"}</h2>
            ()
        </div>
    )
}