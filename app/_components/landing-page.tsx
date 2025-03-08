
'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


export const Header = () => {
    const [isFixed, setIsFixed] = useState(false);

const  router = useRouter();
    useEffect(() => {
        const handleScroll = () => {
            setIsFixed(window.scrollY > 24);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 cursor-pointer right-0 mx-auto w-[100%] md:px-10  z-50 transition-all duration-300 px-4 py-5 
            ${isFixed ? "bg-black shadow-md" : "bg-primary"}`}>
            <div className="flex flex-row items-center justify-between text-white">
                <div className="text-4xl font-clash">eduMove</div>
                <nav className="p-4">
                    <ul className="flex gap-10 font-bold">
                        {["Home", "About", "Contact", "Login"].map((item) => (
                            <motion.li
                                key={item}
                                onClick={() => item   === "Login" ? router.push("/signin") : router.push("/")}
                                whileHover={{ scale: 1.5 , color: "#f8f8f8" , transition: { duration: 0.3 } ,textDecoration: "underline" }}
                                className="cursor-pointer"
                            >
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export const LandingPage = () => {
    return (
        <div className="pt-20 !mx-30 ">
            <Header />
        </div>
    );
};