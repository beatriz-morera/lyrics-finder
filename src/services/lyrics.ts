const BASE_URL = 'https://api.lyrics.ovh/v1';

export async function findLyrics(artist: string, song: string): Promise<string> {
  const url = `${BASE_URL}/${artist}/${song}`;
  const rs = await fetch(url);
  const { lyrics, error } = await rs.json();
  if (!rs.ok) {
    throw new Error(error);
  }
  return lyrics;
}
