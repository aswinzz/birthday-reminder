import useAuth, { Actions } from '@/hooks/useAuth';
import { Session } from '@supabase/supabase-js';
import React, { createContext } from 'react';

const AuthContext = createContext<{session: Session | null, actions: Actions | undefined}>({ session: null, actions: undefined});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, actions] = useAuth();
    return (
        <AuthContext.Provider value={{ session, actions }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };