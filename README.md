# Music Player

A music player web app built with React and Vite. Browse tracks, manage playlists, and control playback with a clean, custom-built UI.

## live demo

[Play it here](https://music-player-drab-sigma.vercel.app/)

## tech stack

- React 19
- React Router 7
- Vite
- JavaScript (ES6+)
- CSS

## features

- Play, pause, and skip tracks
- Track progress bar
- Playlist creation, navigation, and persistence
- Filter songs when adding to a playlist
- React Router for page routing

## project structure

```
src/
├── components/
│   ├── AllSongs.jsx       # Song list with playback controls
│   ├── MusicPlayer.jsx    # Player bar with progress and controls
│   ├── NavBar.jsx         # Navigation between pages
│   └── Playlists.jsx      # Playlist view and management
├── contexts/
│   └── MusicContext.jsx   # Global playback and playlist state
├── App.jsx                # Root component and routing setup
└── index.css
```

## what I learned

- React Router for client-side navigation
- Audio playback with the HTML5 Audio API
- Managing playback state across components with Context API
- Persisting data to localStorage
- Structuring a multi-page React app

## credits

Built following [Pedro Tech](https://youtu.be/r47C9c4qCqE?si=ike2vUe4-NKQNz0y) tutorial on YouTube.

## notes

Audio files are not included in this repo due to file size.
