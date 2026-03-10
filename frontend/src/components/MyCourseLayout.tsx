import { useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Navbar from "./enrollment/Navbar";

export default function MyCourseLayout() {

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#080c14] text-white">
                <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                    <Outlet />
                </main>
            </div>
        </>
    );
}