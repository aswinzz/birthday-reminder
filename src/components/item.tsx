import { JSX, SVGProps } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { ITEM } from "@/lib/types";
import { format } from "date-fns";

function CakeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
        <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
        <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
        <path d="M2 21h20" />
        <path d="M7 8v3" />
        <path d="M12 8v3" />
        <path d="M17 8v3" />
        <path d="M7 4h0.01" />
        <path d="M12 4h0.01" />
        <path d="M17 4h0.01" />
      </svg>
    )
  }
  
  
  function CalendarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
    )
  }
  
  
  function GiftIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
      </svg>
    )
  }
  
  
  function MessageCircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </svg>
    )
  }
  
export function Item({ name, birthday }: ITEM) {
    const daysLeft = Math.ceil((new Date(birthday).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return (
        <Card className="w-full max-w-sm p-6 flex flex-col items-center gap-6">
      <div className="flex w-full items-center gap-4">
        <Avatar>
          <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
          <AvatarFallback>{name.split(' ').map((part) => part[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <h3 className="text-2xl font-bold">{name}</h3>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <CalendarIcon className="h-5 w-5" />
            <span>{format(new Date(birthday), "dd-MM-yyyy")}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
        <CakeIcon className="h-6 w-6 text-pink-500" />
        <span className="font-medium">{daysLeft > 0 ?`${daysLeft} days left for the birthday!` : `Birthday is next year!`}</span>
      </div>
      {/* <div className="flex gap-2">
        <Button variant="outline">
          <GiftIcon className="h-5 w-5 mr-2" />
          Send Gift
        </Button>
        <Button>
          <MessageCircleIcon className="h-5 w-5 mr-2" />
          Send Message
        </Button>
      </div> */}
    </Card>
    )
}