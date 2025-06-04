
import { MMKV } from 'react-native-mmkv';



export const tokenstorage = new MMKV({
    id: 'token_storage',
    encryptionKey: 'some_secret_key', // Optional: Use an encryption key for added security
});
export const storage = new MMKV({
    id: 'my-app_storage',
    encryptionKey: 'some_secret_key',
})
export const mmkvStorage = {
    setItem: (key: string, value: string) => {
        storage.set(key, value);
    },
    getItem: (key: string) => {
        const value = storage.getString(key);
        return value ?? null; // Return null if the key does not exist
    },
    removeItem: (key: string) => {
        storage.delete(key);
    },
}        