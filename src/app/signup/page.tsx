"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter()
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    // check fields
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const onSignUp = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log(response.data);
            router.push("/login")
            setUser({
                email: "",
                password: "",
                username: "",
            })
            
        } catch (error: any) {
            console.log("Error while signing up ", error.message);
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen py-2 justify-center">
            <h1 className="text-2xl my-2 text-orange-400">{loading ? "Processing..." : "Sign Up"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="p-2 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:border-gray-600 text-black"
                type="text"
                id="username"
                placeholder="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />

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

            <button onClick={onSignUp} className="bg-blue-700 w-52 py-1.5 rounded-lg hover:bg-blue-500 mb-3">
                {buttonDisabled ? "no sign up" : "signup"}
            </button>

            <Link href="/login">visit login page</Link>


        </div>
    );
}
