import React from 'react';
import Navbar from '../principals/Navbar';
import Footer from '../principals/Footer';
import GalleryComponent from './GalleryComponent';
import NewsComponent from './NewsComponent';
function Noticia(){

    return (
        <div>
           <NewsComponent />
           <GalleryComponent />
        
        </div>
    )
}


export default Noticia;