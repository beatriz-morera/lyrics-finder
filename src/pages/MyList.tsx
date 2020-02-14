import React from 'react';

import { Link } from 'react-router-dom';

import LyricsCard from '../components/LyricsCard';
import { useSavedLyrics } from '../hooks/localStorage';

import { IonContent, IonPage, IonButtons, IonBackButton, IonButton } from '@ionic/react';

import classes from '../theme/myList.module.css';

const MyList: React.FC = () => {
  const [savedLyrics] = useSavedLyrics();

  /*const removeLyricsHandler = index => {
    return savedLyrics.splice(index, 1);
  };*/

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className={classes.myList_page}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" style={{ color: 'white' }} mode="md" />
          </IonButtons>
          <h2 className={classes.myList_page_title}>My List</h2>
          <Link to="/home">
            <IonButton fill="outline" shape="round" color="light" mode="ios">
              Add Lyrics
            </IonButton>
          </Link>
          {savedLyrics.length ? (
            <div className={classes.myList_page_cards_container}>
              <p className={classes.myList_page_cards_label}>You added</p>
              {savedLyrics.map((lyricsInfo, index) => (
                <LyricsCard song={lyricsInfo.song} artist={lyricsInfo.artist} key={index} />
              ))}
            </div>
          ) : (
            <p className={classes.myList_page_empty}>
              Start adding lyrics to your list so you can easily find them later.
            </p>
          )}
        </section>
      </IonContent>
    </IonPage>
  );
};

export default MyList;
