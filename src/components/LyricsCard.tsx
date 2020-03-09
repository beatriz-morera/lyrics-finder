import React, { Dispatch, useCallback } from 'react';

import { IonIcon, IonItem, IonCard } from '@ionic/react';
import { musicalNotes, trash } from 'ionicons/icons';

import classes from '../theme/lyricsCard.module.css';
import { Link } from 'react-router-dom';
import { LyricsInfo } from '../models/lyricsInfo';
import { titleCase } from '../services/titleCase';

interface LyricsCardProps {
  lyricsInfo: LyricsInfo;
  onRemove?: Dispatch<LyricsInfo>;
}

const LyricsCard: React.FC<LyricsCardProps> = ({ lyricsInfo, onRemove }) => {
  const { artist, song } = lyricsInfo;
  const removeHandler = useCallback(
    ev => {
      ev.preventDefault();
      onRemove && onRemove(lyricsInfo);
    },
    [lyricsInfo, onRemove]
  );
  return (
    <Link to={`/lyrics/${artist}/${song}`} style={{ textDecoration: 'none' }}>
      <IonCard>
        <IonItem style={{ marginLeft: '-17px', marginBottom: '-2px' }}>
          <div className={classes.musicIconBackground}>
            <IonIcon
              icon={musicalNotes}
              slot="start"
              style={{ fontSize: '50px', paddingTop: '10px', fill: 'rgb(168, 23, 132)' }}
            />
          </div>

          <div className={classes.container}>
            <p className={classes.song}>{titleCase(song)}</p>
            <p className={classes.artist}>{titleCase(artist)}</p>
          </div>
          <IonIcon icon={trash} slot="end" color="dark" onClick={removeHandler} />
        </IonItem>
      </IonCard>
    </Link>
  );
};

export default LyricsCard;
