import React, { useState, useMemo } from 'react';
import { IonContent, IonPage, IonIcon, IonButton } from '@ionic/react';
import { musicalNote, checkmark } from 'ionicons/icons';

import { Link, useHistory } from 'react-router-dom';

import classes from '../theme/home.module.css';

const Home: React.FC = () => {
  const [artist, setArtist] = useState('');
  const [song, setSong] = useState('');
  const history = useHistory();

  const formCompleted = useMemo(() => {
    return artist && song;
  }, [artist, song]);

  const artistHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(ev.target.value);
  };

  const songHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSong(ev.target.value);
  };

  const findHandler = () => {
    history.push(`/lyrics/${artist.toLowerCase()}/${song.toLowerCase()}`);
  };

  return (
    <IonPage>
      <IonContent>
        <section className={classes.page}>
          <div className={classes.title}>
            <IonIcon icon={musicalNote} style={{ fill: 'white', fontSize: '60px' }} />
            <p>Lyrics</p>
            <IonIcon icon={musicalNote} style={{ fill: 'white', fontSize: '60px' }} />
          </div>
          <input
            placeholder="Artist"
            className={classes.input}
            onChange={artistHandler}
            value={artist}
          />
          <input placeholder="Song" className={classes.input} onChange={songHandler} value={song} />

          <IonButton
            mode="ios"
            fill="outline"
            size="large"
            color="light"
            expand="block"
            strong
            style={{ letterSpacing: '1px' }}
            onClick={findHandler}
            disabled={!formCompleted}
          >
            FIND THE LYRICS
          </IonButton>
          <Link to="/myList" style={{ textDecoration: 'none' }}>
            <IonIcon
              icon={checkmark}
              style={{ fill: 'white', fontSize: '40px', marginTop: '15px' }}
            />
            <p className={classes.iconLabel}>My List</p>
          </Link>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Home;
