"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("Nothing");
    const logout = async () => {
        try {
            const response = await axios.get("/api/users/logout");
            console.log(response.data);

            toast.success(response.data.message);
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        } catch (error: any) {
            console.log("logout failed: ", error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/me");
            console.log(response.data);
            setData(response.data.data._id);
        } catch (error: any) {
            console.log(error.message);
        }
    };
    return (
        <div className="flex flex-col items-center min-h-screen py-2 justify-center">
            <ToastContainer />
            <h1 className="bg-green-400 px-4 py-1 rounded-md mb-2 font-semibold">
                {data == "Nothing" ? (
                    "Nothing"
                ) : (
                    <Link href={`profile/${data}`}>{data}</Link>
                )}
            </h1>
            <hr />
            <p>profile page</p>
            <hr />
            <button
                onClick={getUserDetails}
                className="bg-orange-500 w-44 py-1.5 rounded-lg hover:bg-blue-500 mt-3"
            >
                Get user details
            </button>
            <button
                onClick={logout}
                className="bg-blue-700 w-44 py-1.5 rounded-lg hover:bg-blue-500 mt-3"
            >
                Logout
            </button>
        </div>
    );
}
