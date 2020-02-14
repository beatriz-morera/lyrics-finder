import React, { useState, useEffect } from 'react';

import { findLyrics } from '../services/lyrics';
import { useSavedLyrics } from '../hooks/localStorage';

import {
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonLoading,
  IonToast
} from '@ionic/react';
import { useParams } from 'react-router-dom';

import { add, checkmark } from 'ionicons/icons';

import classes from '../theme/lyrics.module.css';

const Lyrics: React.FC = () => {
  const { artist, song } = useParams();
  const [lyrics, setLyrics] = useState<string>('');
  const [savedLyrics, addLyrics, removeLyrics] = useSavedLyrics();

  useEffect(() => {
    const saved = savedLyrics.find(x => x.artist === artist && x.song === song);
    if (saved) {
      setLyrics(saved.lyrics);
    } else {
      findLyrics(artist, song).then(setLyrics);
    }
  }, [artist, song, savedLyrics]);

  const saved = savedLyrics.some(item => item.song === song);

  const [showNotFound, setShowNotFound] = useState(false);

  setTimeout(() => {
    setShowNotFound(true);
  }, 2000);

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className={classes.lyrics_page}>
          <div className={classes.lyrics_page_toolbar}>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text="" style={{ color: 'white' }} mode="ios" />
            </IonButtons>
            {lyrics ? (
              <IonButtons slot="end">
                <IonIcon
                  style={{ fontSize: '30px' }}
                  icon={saved ? checkmark : add}
                  onClick={() =>
                    saved
                      ? removeLyrics({ artist, song, lyrics })
                      : addLyrics({ artist, song, lyrics })
                  }
                  mode="md"
                />
              </IonButtons>
            ) : null}
          </div>
          <IonLoading isOpen={!lyrics && !showNotFound} message="Loading..." />
          {lyrics ? (
            <div className={classes.lyrics_page_lyrics_container}>
              <h4 className={classes.lyrics_page_song}>{song}</h4>
              <h5 className={classes.lyrics_page_artist}>...Song by {artist}...</h5>
              <p className={classes.lyrics_page_lyrics}>{lyrics}</p>
            </div>
          ) : (
            showNotFound && (
              <div className={classes.lyrics_page_not_found_container}>
                <p className={classes.lyrics_page_not_found_title}>Oops!</p>
                <p className={classes.lyrics_page_not_found_subtitle}>No results found</p>
                <p>Please check you have the right spelling, or try different keywords.</p>
              </div>
            )
          )}
          <IonToast isOpen={saved} message="Added to My List." duration={500} />
          <IonToast isOpen={!saved} message="Removed from My List." duration={500} />
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Lyrics;
