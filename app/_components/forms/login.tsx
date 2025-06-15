// "use client";
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { FiEyeOff } from "react-icons/fi";
// import { FiEye } from "react-icons/fi";
// import Link from "next/link";
// import { 
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { toast } from "sonner";
// import { Label } from "@/components/ui/label";

// const loginSchema =  z.object({
//   email : z.string().email(),
//   password: z.string().min(6, "Password must be at least 6 characters"),

// });
// type LoginFormValues = z.infer<typeof loginSchema>;


// export default function Login() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };


//   const FormSchema = z.object({
//     email : z.string().email(),
//     password: z.string().min(6, {
//       message: "Password must be at least 6 characters.",
//     }),
//   });

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });


  
//   const handleLogin = async (data: LoginFormValues) => {
//     setLoading(true);
  
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}auth/signin`,
//         data
//       );
  
//       if (response.status === 200) {
//         // Save user data to localStorage
//         if (typeof window !== "undefined") {
//           localStorage.setItem(
//             "user",  JSON.stringify(response.data.data.user)
            
               
            
//           );

//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("userRole", response.data.data.user?.role);
//         }
  
//         toast.success("Login successful");
//         console.log("response", response.data.data);
  
//         // Redirect to dashboard or another page
//         router.push("/myaccount");
//       } else {
//         toast.error("Unexpected response from the server.");
//       }
//     } catch (err: any) {

//       if (err.response?.status === 401) {
//         toast.error( err.response.data.message || "Email or password is incorrect");
//       } else {
//         toast.error(err.response?.data?.message || "An error occurred during login.");
//       }
//       console.error("Login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         method="post"
       
//         onSubmit={form.handleSubmit (handleLogin)}
//         className="space-y-4 w-full max-w-md p-6 shadow-2xl rounded-lg bg-white"
//       >
//         <h1 className="text-xl font-semibold text-center">Login</h1>

//         <Label>Email</Label>
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Input placeholder="email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

// <Label>PassWord</Label>
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl >
// <div className="relative" >
// <Input type={
//                   showPassword ? "text" : "password"
// } placeholder="Password" {...field} />
//                 <span
//                   className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {showPassword ? (
//                     <FiEyeOff size={20} />
//                   ) : (
//                     <FiEye size={20} />
//                   )}
//                 </span>


//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button
//           variant="secondary"
//           type="submit"
//           className="w-full bg-primary text-white  hover:bg-blue-400"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </Button>

// {/* 
//         <p className=" w-[100%]   ">Dont have Account? <Link className="hover:text-blue-500 underline"
//       href="/register"
//       >Register</Link> </p> */}


//       </form>

    
//     </Form>

    
//   );
// }


"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setLoading(true);
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/signin`,
        data
      );
  
      if (response.status === 200) {
        // Save user data to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "user", JSON.stringify(response.data.data.user)
          );
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userRole", response.data.data.user?.role);
        }
  
        toast.success("Login successful");
        console.log("response", response.data.data);
  
        // Redirect to dashboard or another page
        router.push("/myaccount");
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error(err.response.data.message || "Email or password is incorrect");
      } else {
        toast.error(err.response?.data?.message || "An error occurred during login.");
      }
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <motion.form
        method="post"
        onSubmit={form.handleSubmit(handleLogin)}
        className="space-y-4 w-full max-w-md p-6 shadow-2xl rounded-lg bg-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-xl font-semibold text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Login
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Label>Email</Label>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Label>PassWord</Label>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder="Password" 
                      {...field} 
                    />
                    <span
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Button
            variant="secondary"
            type="submit"
            className="w-full bg-primary text-white hover:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </motion.div>

        {/* 
        <motion.p 
          className="w-[100%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          Dont have Account? 
          <Link 
            className="hover:text-blue-500 underline"
            href="/register"
          >
            Register
          </Link> 
        </motion.p> 
        */}
      </motion.form>
    </Form>
  );
}