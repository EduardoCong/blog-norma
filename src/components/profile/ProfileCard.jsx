import react from 'react';
import PropTypes from 'prop-types';

function ProfileCard({ profile }) {
    return (
        <div className="profile-card" style={styles.card}>
            <img src={profile.photoUrl} alt={`${profile.name}'s profile`} style={styles.photo} />
            <h2 style={styles.name}>{profile.name}</h2>
            <p style={styles.username}>@{profile.username}</p>
            <p style={styles.date}>Fecha de registro: {profile.registrationDate}</p>
            <p style={styles.posts}>Publicaciones: {profile.postsCount}</p>
        </div>
    );

}

ProfileCard.propTypes = {
    profile: PropTypes.shape({
        photoUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        registrationDate: PropTypes.string.isRequired,
        postsCount: PropTypes.number.isRequired,
      }).isRequired, 


};

const styles = {
    card: {
      width: '300px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      backgroundColor: '#fff',
      margin: '20px auto',
    },
    photo: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '15px',
    },
    name: {
      fontSize: '1.5em',
      margin: '10px 0',
    },
    username: {
      fontSize: '1em',
      color: '#555',
      margin: '5px 0',
    },
    date: {
      fontSize: '0.9em',
      color: '#777',
      margin: '5px 0',
    },
    posts: {
      fontSize: '1em',
      color: '#333',
      margin: '10px 0',
    },
  };
  
  export default ProfileCard;