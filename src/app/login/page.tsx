"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"

export default function LoginPage() {
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    //? on login
    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            if (response.data.success) {
                console.log("Login success ", response.data);
                toast.success("User Logged In")
                setTimeout(() => {
                    router.push("/profile")
                }, 1500);

                setUser({
                    email: "",
                    password: ""
                })
            } else {
                console.log(response.data);
                toast.error(response.data.message)
            }
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };
    return (
        <div className="flex flex-col items-center min-h-screen py-2 justify-center">
            <ToastContainer />
            <h1 className="text-2xl my-2 text-orange-400">{loading ? "Processing..." : "Login"}</h1>
            <hr />

            <label htmlFor="email">Email</label>
            <input
                className="p-2 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="email"
                id="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label htmlFor="password">Password</label>
            <input
                className="p-2 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="password"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button onClick={onLogin} className="bg-blue-700 w-52 py-1.5 rounded-lg hover:bg-blue-500 mb-3">
                {buttonDisabled ? "No login" : "Login"}
            </button>
            <Link href="/signup">visit signup page</Link>


        </div>
    );
}
