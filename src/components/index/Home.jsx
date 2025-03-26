import React from 'react';
import Header from '../principals/Header';
import NewsList from './NewsList';
import Footer from '../principals/Footer';
import Modal from 'react-modal';
import Navbar from '../principals/Navbar';
import NewBigList from './NewBigList';
import NewCard from '../principals/NewCard';
import LargeNewsCard from '../principals/LargeNewsCard';

function Home(){
    return(
        <div>
      
            <NewsList />
            <NewBigList />
         
        </div>
    );
}

export default Home;