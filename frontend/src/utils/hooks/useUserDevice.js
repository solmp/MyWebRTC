import {useSelector} from 'react-redux';

export const useUserDevice = () => useSelector((state) => state.userDeviceState);
