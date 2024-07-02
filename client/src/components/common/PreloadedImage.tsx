import React, {FC, useEffect} from 'react';
import useLoadImage from "../../hooks/useLoadImage";
import {CloseIcon, LoadingIcon} from "./icons";
import {AuthService} from "../../services/AuthService";

interface IPreloadedImageProps {
    src: string
    trigger?: number | null
    noCache?: boolean
    hash?: string
}

const PreloadedImage: FC<IPreloadedImageProps> = ({src, hash = '', trigger = null}) => {
    src = src + '?token=' + AuthService.getToken()
    if (hash) src += '&' + hash

    const {isLoading, isError, isLoaded, reload} = useLoadImage(src)

    if (isLoading) return <LoadingIcon />;
    if (!isLoaded || isError) return <CloseIcon />;

    return (
        <img src={src} alt="" />
    );
};

export default PreloadedImage;