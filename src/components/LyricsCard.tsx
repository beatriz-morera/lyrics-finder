import React from 'react';

import { IonIcon, IonItem, IonCard } from '@ionic/react';
import { musicalNotes, trash } from 'ionicons/icons';

import classes from '../theme/lyricsCard.module.css';

interface LyricsCardProps {
  song: string;
  artist: string;
}

const LyricsCard: React.FC<LyricsCardProps> = ({ song, artist }) => {
  return (
    <IonCard>
      <IonItem color="dark" style={{ marginLeft: '-17px', marginBottom: '-2px' }}>
        <div className={classes.lyrics_card_music_icon_background}>
          <IonIcon
            icon={musicalNotes}
            slot="start"
            style={{ fontSize: '50px', paddingTop: '10px', fill: 'purple' }}
          />
        </div>

        <div className={classes.lyrics_card_info_container}>
          <p>{song}</p>
          <p className={classes.lyrics_card_info_artist}>{artist}</p>
        </div>
        <IonIcon icon={trash} slot="end" color="medium" />
      </IonItem>
    </IonCard>
  );
};

export default LyricsCard;
