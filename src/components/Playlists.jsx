import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { useMusic } from "../contexts/MusicContext";

export const Playlists = () => {

    const [newPlaylistName, setNewPlaylistName] = useState("");
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
    const containerRefs = useRef({});

    const {allSongs, playlists, createPlaylist, addSongToPlaylist} = useMusic();

    const filteredSongs = allSongs.filter((song) => {
        const matches = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase());

        const isAlreadyInPlaylist = selectedPlaylist?.songs.some((playlistSongs) => playlistSongs.id === song.id);

        return matches && !isAlreadyInPlaylist;
    });

    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim()) {
            createPlaylist(newPlaylistName.trim());
            setNewPlaylistName("");
        };
    };

    const updateDropdownPos = (playlistId) => {
        const el = containerRefs.current[playlistId];
        if (el) {
            const rect = el.getBoundingClientRect();
            setDropdownPos({ top: rect.bottom, left: rect.left, width: rect.width });
        }
    };

    const handleAddSong = (song) => {
        if (selectedPlaylist) {
            addSongToPlaylist(selectedPlaylist.id, song);
            setSearchQuery("");
            setShowDropdown(false);
        }
    };

    return (
        <div className="playlists">
            <h2>Playlists</h2>

            {/*Create New Playlist*/}
            <div className="create-playlist">
                <h3>Create New Playlist</h3>
                <div className="playlist-form">
                    <input
                        type="text"
                        placeholder="Playlist name..."
                        className="playlist-input"
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        value={newPlaylistName}
                    />

                    <button className="create-btn" onClick={handleCreatePlaylist}>Create</button>
                </div>
            </div>

            {/*Playlists List*/}
            <div className="playlists-list">
                {playlists.length === 0 ?
                    (<p className="empty-message">No playlists created yet</p>)
                    : (playlists.map((playlist, key) => (<div className="playlist-item" key={key}>
                        <div className="playlist-header">
                            <h3>{playlist.name}</h3>
                            <div className = "playlist-actions">
                                <button className="delete-playlist-btn">Delete</button>
                            </div>
                        </div>

                        {/* Add Song Search */}
                        <div className="add-song-section">
                            <div
                                className="search-container"
                                ref={(el) => containerRefs.current[playlist.id] = el}
                            >
                                <input
                                    type="text"
                                    placeholder="Search songs to add..."
                                    value = {selectedPlaylist?.id === playlist.id ? searchQuery : ""}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setSelectedPlaylist(playlist);
                                        setShowDropdown(e.target.value.length > 0);
                                        updateDropdownPos(playlist.id);
                                    }}
                                    onFocus={() => {
                                        setSelectedPlaylist(playlist);
                                        if (searchQuery.length > 0) {
                                            setShowDropdown(true);
                                            updateDropdownPos(playlist.id);
                                        }
                                    }}
                                    className="song-search-input"
                                />

                                {selectedPlaylist?.id === playlist.id && showDropdown && createPortal(
                                    <div
                                        className="song-dropdown"
                                        style={{
                                            top: dropdownPos.top,
                                            left: dropdownPos.left,
                                            width: dropdownPos.width,
                                        }}
                                    >
                                        {filteredSongs.length === 0 ? (<div className="dropdown-item no-results">No songs found</div>):
                                        (filteredSongs.slice(0,5).map((song, key) =>
                                            <div key={key} className="dropdown-item" onClick={() => handleAddSong(song)}>
                                                <span>{song.title}</span>
                                                <span>{song.artist}</span>
                                            </div>))}
                                    </div>,
                                    document.body
                                )}
                            </div>
                        </div>
                        
                        <div className="playlist-songs"> 
                            {playlist.songs.length === 0 ? (
                                <p className = "empty-playlist">No songs in this playlist</p>
                            ) : (
                                playlist.songs.map((song,key) => (
                                    <div key={key} className={`playlist-song`}> 
                                        <div className="song-info">
                                            <span className="song-title">{song.title}</span>
                                            <span className="song-artist">{song.artist}</span>
                                        </div>
                                        <span className="song-duration">{song.duration}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        
                    </div>)))}
            </div>

        </div>
    );
};
