import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';
import './home.css';
import axios from 'axios';

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
    const [page, setPage] = useState<number>(1);
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
            `http://jsonplaceholder.typicode.com/photos?_page=${newPage}`
        );
        if (response.status === 200) {
            setPhotos(response.data);
        }

        setIsLoadingPhotos(false);
    };

    const getPhotoCount = async () => {
        setIsLoadingPageCount(true);

        const response = await axios.get(
            `http://jsonplaceholder.typicode.com/photos`
        );
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
