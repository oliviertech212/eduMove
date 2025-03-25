
'use client';
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const Header = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [activeTab, setActiveTab] = useState("Home");
    const pathname = usePathname()
    const router = useRouter();

    useEffect(() => {
        const activeTab = localStorage.getItem("activeTab");
        if (activeTab) {
            setActiveTab(activeTab);
            if (activeTab === "Login") {
                router.push("/signin");
            } else if (activeTab === "Travel Plans"){
                router.push("/plans");
            } else {
                router.push("/");
            }
        }
        const handleScroll = () => {
            setIsFixed(window.scrollY > 24);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleItmClick = (item: string) => {
        setActiveTab(item);
        localStorage.setItem("activeTab", item);
        if (item === "Login") {
            router.push("/signin");
        } else if (item === "Travel Plans"){
            router.push("/plans");


        }else{
            router.push("/");
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            let activeTab = localStorage.getItem("activeTab");
            console.log("activeTab", activeTab);
            
            if (activeTab) {
                
                if (activeTab.includes("myaccount")) {
                    router.push(activeTab)
                }
                setActiveTab(activeTab);  
            }
           
        }
    }, []);

    
      

    return (
        <header className={`
            ${pathname.includes("myaccount")? "hidden" : ""}
            fixed top-0 left-0 right-0 mx-auto w-full md:px-10 z-50 transition-all duration-300 px-4 py-5 
            ${isFixed ? "bg-black shadow-md" : "bg-primary"}`}>
            <div className="flex flex-row items-center justify-between text-white">
                <div className="text-4xl font-clash">eduMove</div>
                <nav className="p-4">
                    <ul className="flex gap-10 font-bold">
                    {["Home","Travel Plans", "About", "Contact", "Login"].map((item) => (
                            <motion.li
                                key={item}
                                onClick={() => handleItmClick(item)}
                                whileHover={{ scale: 1.1, color: "#f8f8f8", transition: { duration: 0.3 } }}
                                className={`cursor-pointer transition-all duration-300 ${activeTab === item ? "underline text-white" : ""}`}
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
        <div className="pt-20 mx-30">
            <Header />
        </div>
    );
};
