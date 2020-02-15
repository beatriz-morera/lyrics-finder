import { useState, useCallback, Dispatch } from 'react';

import { LyricsInfo } from '../models/lyricsInfo';

const SAVED_KEY = 'savedLyrics';

function setLocalLyrics(savedLyrics: LyricsInfo[]) {
  localStorage.setItem(SAVED_KEY, JSON.stringify(savedLyrics));
}

function getLocalLyrics(): LyricsInfo[] {
  const json = localStorage.getItem(SAVED_KEY);
  if (json) {
    return JSON.parse(json);
  }
  return [];
}

export function useSavedLyrics(): [LyricsInfo[], Dispatch<LyricsInfo>, Dispatch<LyricsInfo>] {
  const [savedLyrics, setSavedLyrics] = useState(getLocalLyrics());

  const addLyrics = useCallback(
    (lyricsInfo: LyricsInfo) =>
      setSavedLyrics((items: LyricsInfo[]) => {
        const newValues = [...items, lyricsInfo];
        setLocalLyrics(newValues);
        return newValues;
      }),
    [setSavedLyrics]
  );

  const removeLyrics = useCallback(
    ({ song, artist }: LyricsInfo) =>
      setSavedLyrics((items: LyricsInfo[]) => {
        const newValues = items.filter(
          lyricsInfo => lyricsInfo.artist !== artist || lyricsInfo.song !== song
        );
        setLocalLyrics(newValues);
        return newValues;
      }),
    [setSavedLyrics]
  );

  return [savedLyrics, addLyrics, removeLyrics];
}
