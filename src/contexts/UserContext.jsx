// contexts/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData } from '../firebase/database';

const UserContext = createContext();

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: 'default',
        name: 'Anonymous',
        points: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            const userData = await getUserData('default');
            setUser({
                id: 'default',
                name: userData.name || 'Anonymous',
                points: userData.points || 0
            });
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUserPoints = (newPoints) => {
        setUser(prev => ({
            ...prev,
            points: newPoints
        }));
    };

    const updateUserName = (newName) => {
        setUser(prev => ({
            ...prev,
            name: newName
        }));
    };

    const value = {
        user,
        isLoading,
        updateUserPoints,
        updateUserName,
        refreshUser: loadUserData
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};