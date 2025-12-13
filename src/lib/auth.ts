export const AUTH_KEY = 'autom8_user';

export interface User {
    name: string;
    email: string;
}

export const auth = {
    login: (user: User) => {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    },
    logout: () => {
        localStorage.removeItem(AUTH_KEY);
    },
    getUser: (): User | null => {
        const user = localStorage.getItem(AUTH_KEY);
        if (!user) return null;
        try {
            return JSON.parse(user);
        } catch (e) {
            return null;
        }
    },
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem(AUTH_KEY);
    }
};
