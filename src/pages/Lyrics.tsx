import React, { useState, useEffect } from 'react';

import { findLyrics } from '../services/lyrics';

import { IonContent, IonPage, IonButtons, IonBackButton, IonIcon } from '@ionic/react';
import { useParams } from 'react-router-dom';

import { add, checkmark } from 'ionicons/icons';

import classes from '../theme/lyrics.module.css';

const Lyrics: React.FC = () => {
  const { artist, song } = useParams<any>();

  const [lyrics, setLyrics] = useState<string>('');

  useEffect(() => {
    findLyrics(artist, song).then(setLyrics);
  }, [artist, song]);

  const [saved, setSaved] = useState(false);
  const savedHandler = () => setSaved(!saved);

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className={classes.lyrics_page}>
          <div className={classes.lyrics_page_toolbar}>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text="" style={{ color: 'white' }} />
            </IonButtons>
            {lyrics ? (
              <IonButtons slot="end">
                <IonIcon
                  style={{ fontSize: '30px' }}
                  icon={saved ? checkmark : add}
                  onClick={savedHandler}
                  mode="md"
                />
              </IonButtons>
            ) : null}
          </div>
          {lyrics ? (
            <div className={classes.lyrics_page_lyrics_container}>
              <h3>{song.toUpperCase()}</h3>
              <h5 className={classes.lyrics_page_artist}>...Song by {artist.toUpperCase()}...</h5>
              <p className={classes.lyrics_page_lyrics}>{lyrics}</p>
            </div>
          ) : (
            <div className={classes.lyrics_page_not_found_container}>
              <p className={classes.lyrics_page_not_found_title}>Oops!</p>
              <p className={classes.lyrics_page_not_found_subtitle}>No results found</p>
              <p>Please check you have the right spelling, or try different keywords.</p>
            </div>
          )}
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Lyrics;
