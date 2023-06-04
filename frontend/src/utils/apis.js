import axios from "axios";

// const serverApi = "https://api.xxx/api";
const serverApi = "http://localhost:3333/api";

export const getRoomExists = async (roomId, setErrorMessage) => {
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`).catch((err) => {
        setErrorMessage(err.toString());
    });
    return response.data;
}