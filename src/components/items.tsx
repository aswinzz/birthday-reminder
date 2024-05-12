import { AuthContext } from "@/context/AuthContext";
import { createSupabaseClient } from "@/utils/supabase";
import { useContext, useEffect, useState } from "react";
import { Item } from "./item";
import { ITEM } from "@/lib/types";

export function Items() {
    const {session} = useContext(AuthContext);
    const supabase = createSupabaseClient();
    const [items, setItems] = useState<ITEM[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const user = await supabase.auth.getUser();
            let user_id;
            if (user?.data?.user?.id) {
                user_id = user?.data?.user?.id;
                const { data } = await supabase.from('birthdays').select().eq('user_id', user_id);
                setItems(data as ITEM[]);
            }
        }
        fetchData();
    }, []);

    if (!session) {
        return <div className="text-center justify-center text-lg">
            <b>Welcome to Birthday Reminder</b>
            <div>Login to continue!</div>
        </div>
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {(items || []).map((item, idx) => <Item {...item} key={idx}/>)}
        </div>
    )
}