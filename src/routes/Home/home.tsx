import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';
import axios from 'axios';
import constants from '../../utility/constants';
import './home.css';

export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const Home: React.FC = () => {
    const [isLoadingPhotos, setIsLoadingPhotos] = useState(false);
    const [isLoadingPageCount, setIsLoadingPageCount] = useState(false);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [photos, setPhotos] = useState<Photo[]>([]);

    const photosPerPage = 10;

    const photoThumbnails = photos.map((photo) => (
        <Link to={`/photos/${photo.id}`} key={photo.id}>
            <div className="thumbnail">
                <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
        </Link>
    ));

    const handlePaginationChange = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    const getPhotos = async (newPage: number) => {
        setIsLoadingPhotos(true);

        const response = await axios.get(
            constants.getPhotosPage.replace('{newPage}', newPage.toString())
        );
        if (response.status === 200) {
            setPhotos(response.data);
        }

        setIsLoadingPhotos(false);
    };

    const getPhotoCount = async () => {
        setIsLoadingPageCount(true);

        const response = await axios.get(constants.getPhotos);
        if (response.status === 200) {
            setPageCount(response.data.length / photosPerPage);
        }

        setIsLoadingPageCount(false);
    };

    useEffect(() => {
        getPhotos(page);
    }, [page]);

    useEffect(() => {
        getPhotoCount();
    }, []);

    return (
        <div className="home">
            {isLoadingPageCount ? (
                'Calculating page count...'
            ) : (
                <Pagination
                    count={pageCount}
                    onChange={handlePaginationChange}
                    page={page}
                />
            )}
            {isLoadingPhotos ? (
                'Loading photos...'
            ) : (
                <div className="photoGallery">{photoThumbnails}</div>
            )}
        </div>
    );
};

export default Home;
