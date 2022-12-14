import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import constants from '../../utility/constants';
import { Photo } from '../Home/home';
import './photo.css';

const PhotoUI: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [photo, setPhoto] = useState<Photo>({
        albumId: 0,
        id: 0,
        thumbnailUrl: '',
        title: '',
        url: '',
    });

    const params = useParams();

    useEffect(() => {
        const getPhoto = async () => {
            const photoId = params.photoId || '';
            setIsLoading(true);

            const result = await axios.get(
                constants.getPhoto.replace('{photoId}', photoId)
            );

            if (result.status === 200) {
                setPhoto(result.data);
            }

            setIsLoading(false);
        };

        getPhoto();
    }, [params]);

    return (
        <div className="photoContainer">
            {isLoading ? (
                <p>Loading image and details...</p>
            ) : (
                <>
                    <p>{photo.title}</p>
                    <img src={photo.url} alt={photo.title} />
                </>
            )}
        </div>
    );
};

export default PhotoUI;
