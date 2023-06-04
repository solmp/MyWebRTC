import {useCallback, useState} from 'react';

export const useSelectVideo = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const deselectVideo = () => setSelectedVideo(null);
    const selectVideo = useCallback(
        (videoInfo) => () => {
            setSelectedVideo((selectedVideo) => {
                if (selectedVideo?.stream?.id === videoInfo?.stream?.id) return null;
                else return {...videoInfo};
            });
        }, []);

    return {selectVideo, deselectVideo, selectedVideo, setSelectedVideo};
};
