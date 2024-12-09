'use client'

import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation";

export default function LogOutButton() {
    const supabase = createClient();

    const logOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log(error.message);
            redirect("/error");
            return   
        }

        redirect('/login')
    }

    return (
        <button onClick={logOut} className="p-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Log Out
        </button>
    )
}