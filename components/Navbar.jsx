import { MoveRight } from "lucide-react";
import Link from "next/link"
import React from "react";

function Navbar() {
    return (
        <div className="fixed w-full left-0 top-0 bg-cblack flex justify-between md:px-56 px-5 md:py-8 py-5">
            <Link href="/">
                <h1 className="uppercase md:text-4xl text-3xl font-semibold text-primary">Name Spark</h1>
            </Link>
            <Link href="https://github.com/AdityaGahukar" className="text-white hover:underline hover:text-primary flex gap-2 items-center">
                By Aditya
                <MoveRight/>
            </Link>
        </div>
    )
}

export default Navbar;
