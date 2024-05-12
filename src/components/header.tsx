import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog"
import { Label } from "./ui/label";
import Link from "next/link"
import { Input } from "./ui/input";
import { Button } from "./ui/button"
import { DialogHeader, DialogFooter } from "./ui/dialog"
import { JSX, SVGProps, useCallback, useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

function LogInIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {

    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" x2="3" y1="12" y2="12" />
      </svg>
    )
  }
  
  
export function Header() {
    const { session, actions } = useContext(AuthContext);
    const [authType, setAuthType] = useState("login");
    const [error, setError] = useState<string | undefined>();
    const [message, setMessage] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const onSwitch = useCallback(() => {
        setAuthType(authType === "login" ? "signup" : "login");
    }, [authType]);

    const validateForm = useCallback((email: string | undefined, password: string | undefined) => {
        // console.log(email, !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))
        if (!email || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
            setError("Invalid email");
            return;
        }
        if (!password || password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }
        setError(undefined);
    }, []);

    const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("EC", e.target.value);
        setEmail(e.target.value);
        validateForm(e.target.value, password);
    }, [password, validateForm]);

    const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("PC", e.target.value);
        setPassword(e.target.value);
        validateForm(email, e.target.value);
    }, [email, validateForm]);

    const onSubmit = useCallback(async () => {
        console.log("CLICKED", email, password);
        let result;
        if (actions && email && password) {
            if (authType === "login") {
                result = await actions.login(email, password);
                console.log("result", result);
            } else {
                result = await actions.signUp(email, password);
                console.log("result", result);
            }
        }
        if (result?.error?.message) {
            setError(result.error.message);
        } else {
            if (authType === "login") {
                actions?.reloadSession();
            } else {
                setMessage("Please check your email & verify your account to continue.");
            }
        }
    }, [actions, authType, email, password]);

    return (

        <header className="z-50 flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm dark:bg-gray-950 dark:text-gray-50">
            <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Birthday Reminder</h1>
            </div>
                {session ? <LogInIcon onClick={actions?.signOut} className="h-6 w-6" /> : 
                <Dialog>
                    <DialogTrigger asChild>
                    <Button>Login</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{authType === "login" ? "Login" : "Sign Up"}</DialogTitle>
                        <DialogDescription>
                            Authenticate using email & password
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Email
                            </Label>
                            <Input value={email} onChange={onEmailChange} id="email" placeholder="aswinvb.aswin6@gmail.com" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Password
                            </Label>
                            <Input value={password} onChange={onPasswordChange} id="password" placeholder="********" type="password" className="col-span-3" />
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {message && <div className="text-black-500 text-sm">{message}</div>}
                    <Button disabled={(!!error || !password || !email)} onClick={onSubmit} type="submit">{authType === "login" ? "Login" : "Sign up"}</Button>
                    <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
                        <Link
                            className="font-medium underline underline-offset-2 hover:text-gray-900 dark:hover:text-gray-50"
                            href="#"
                            onClick={onSwitch}
                        >
                            {authType === "login" ? "Do not have an account ?" : "Already have an account ?"}
                        </Link>
                        </p>
                    </DialogContent>
                </Dialog>}
        </header>
    )
}