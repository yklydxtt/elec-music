const Store = require('electron-store');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
class DataStore extends Store {
    constructor(settings) {
        super(settings);
        this.tracks = this.getTracks() || [];
    }
    saveTracks() {
        this.set('tracks', this.tracks)
    }
    getTracks() {
        return this.get('tracks') || []
    }
    addTracks(tracks) {
        const trackWithProps = tracks.map(track => ({
            id: uuidv4(),
            path: track,
            fileName: path.basename(track)
        })).filter(value => {
            const currentPath = this.getTracks().map(item => item.path)
            return currentPath.indexOf(value.path) < 0;
        })
        this.tracks = [...this.tracks, ...trackWithProps];
        return this.set('tracks', this.tracks);
    }
    deleteTracks(id) {
        const tracks = this.tracks.filter(item => {
            return item.id !== id;
        })
        console.log(tracks, 'delete')
        return this.set('tracks', tracks)
    }
}
module.exports = DataStore;