import axios from 'axios';
import { BASE_URL } from './config';
import { tokenstorage } from '@state/storage';
import { userAuthStore } from '@state/authStore';


export const customerLogin = async (phone: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/customer/login`, { phone });
        const { accessToken, refreshToken, customer } = response.data;
        tokenstorage.set('accessToken', accessToken);
        tokenstorage.set('refreshToken', refreshToken);
        const { setUser } = userAuthStore.getState();
        setUser(customer);
    } catch (error) {
        console.error('Customer login error:', error);

    }
}

export const deliveryLogin = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/delivery/login`, { email, password });
        const { accessToken, refreshToken, deliveryPartner } = response.data;
        tokenstorage.set('accessToken', accessToken);
        tokenstorage.set('refreshToken', refreshToken);
        const { setUser } = userAuthStore.getState();
        setUser(deliveryPartner);
    } catch (error) {
        console.error('Customer login error:', error);

    }
}