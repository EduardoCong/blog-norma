import React from 'react';
import ProfileCard from './ProfileCard';
 
function Profile (){
    const userProfile ={
        photoUrl: 'https://cdn-icons-png.flaticon.com/512/6073/6073873.png',
        name: 'ScienceUTM',
        username: 'ScienceUTM',
        registrationDate: '2021-10-01',
        postsCount: 10,
    }
    ;

    return(
        <div>
            <ProfileCard profile={userProfile}/>
        </div>
    );

}

export default Profile;