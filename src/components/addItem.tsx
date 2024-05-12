"use client"
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "./ui/drawer";
import { ChangeEvent, FormEvent, JSX, SVGProps, useCallback, useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns"
import { createSupabaseClient } from "@/utils/supabase";

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

export function AddItem() {
    const [name, setName] = useState<string | undefined>();
    const [birthday, setBirthday] = useState<string | undefined>();
    const {session} = useContext(AuthContext);
    const supabase = createSupabaseClient();
    
    const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, birthday);
        const user = await supabase.auth.getUser();
        let user_id;
        if (user?.data?.user?.id) {
            user_id = user?.data?.user?.id;
        }
        const updatedBirthday = birthday ? birthday.split('-').reverse().join('-') : undefined;
        if (user_id && birthday) {
            await supabase.from("birthdays").insert([{ name, birthday: updatedBirthday, user_id }]);
        }
    }, [birthday, name, supabase]);

    const onNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }, []);

    if (!session) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                <Button
                    className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-gray-950 text-white shadow-md transition-all hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-950 dark:hover:bg-gray-900 dark:focus:ring-gray-950"
                    // variant="fab"
                >
                    <PlusIcon className="h-6 w-6" />
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogHeader>
                        Login to Continue
                    </DialogHeader>
                </DialogHeader>
                </DialogContent>
            </Dialog>
            
        );
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
            <Button
                className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-gray-950 text-white shadow-md transition-all hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-950 dark:hover:bg-gray-900 dark:focus:ring-gray-950"
                // variant="fab"
            >
                <PlusIcon className="h-6 w-6" />
                <span className="sr-only">Add Birthday</span>
            </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
            <DrawerHeader>
                <DrawerTitle>Add Birthday</DrawerTitle>
            </DrawerHeader>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input onChange={onNameChange} value={name} id="name" placeholder="Enter name" />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="birthday">Birthday</Label>
                    <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className="w-full justify-start text-left font-normal"
                                >
                                {birthday ? birthday : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={birthday ? new Date(birthday) : undefined}
                                    onSelect={(selectedDate) => {
                                        if (selectedDate) {
                                            setBirthday(format(selectedDate, "dd-MM-yyyy"));
                                        }
                                    }}
                                    initialFocus
                            />
                            </PopoverContent>
                        </Popover>
                </div>
                <DrawerFooter>
                <Button className="w-full" type="submit">
                    Save
                </Button>
                </DrawerFooter>
            </form>
            </DrawerContent>
        </Drawer>
    )
}