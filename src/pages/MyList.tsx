import React, { useState, useCallback, useEffect } from 'react';

import { Link } from 'react-router-dom';

import LyricsCard from '../components/LyricsCard';
import { useSavedLyrics } from '../hooks/localStorage';

import {
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonButton,
  IonSearchbar
} from '@ionic/react';

import classes from '../theme/myList.module.css';

const MyList: React.FC = () => {
  const [savedLyrics, , removeLyrics] = useSavedLyrics();
  const [text, setText] = useState('');

  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    setFiltered(
      savedLyrics.filter(
        item => item.artist.toLowerCase().includes(text) || item.song.toLowerCase().includes(text)
      )
    );
  }, [savedLyrics, text]);

  const filterLyrics = useCallback(ev => {
    const text = ev.target.value.trim().toLowerCase();
    setText(text);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className={classes.myList_page}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" text="" style={{ color: 'white' }} mode="md" />
          </IonButtons>
          <div className={classes.myList_page_searbar_container}>
            <IonSearchbar
              color="dark"
              mode="ios"
              autocomplete="on"
              animated
              placeholder="Find in my list"
              onIonChange={filterLyrics}
            />
          </div>
          <h2 className={classes.myList_page_title}>My List</h2>
          <Link to="/home">
            <IonButton fill="outline" shape="round" color="light" mode="ios">
              Add Lyrics
            </IonButton>
          </Link>
          {filtered.length ? (
            <div className={classes.myList_page_cards_container}>
              <p className={classes.myList_page_cards_label}>You added</p>
              {filtered.map((lyricsInfo, index) => (
                <LyricsCard lyricsInfo={lyricsInfo} key={index} onRemove={removeLyrics} />
              ))}
            </div>
          ) : (
            <p className={classes.myList_page_empty}>
              Add lyrics to your list so you can easily find them later.
            </p>
          )}
        </section>
      </IonContent>
    </IonPage>
  );
};

export default MyList;
