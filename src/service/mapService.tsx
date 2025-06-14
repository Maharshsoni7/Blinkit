import axios from "axios";
import { GOOGLE_MAP_API } from "./config";
import { updateUserLocation } from "./authService";


export const reverseGeocode = async (latitude: number, longitude: number, setUser: any) => {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=S(latitude),S(longitude)&key=${GOOGLE_MAP_API}`)
        if (response.data.statues === 'ok') {
            const address = response.data.result[0].formatted_address;
            updateUserLocation({ liveLocation: { latitude, longitude }, address }, setUser)

        }
        else {
            console.log("Geo location Failed-----", response.data);
        }
    } catch (error) {
        console.log("Geo location Failed", error);

    }
}
