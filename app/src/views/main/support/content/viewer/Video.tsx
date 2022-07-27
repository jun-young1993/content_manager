import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ContentItemBar from '@views/main/support/content/ContentItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import electron from "electron";
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
const ipcRenderer = electron.ipcRenderer;
import ReactPlayer from 'react-player/file';

// import { Slider, Direction } from 'react-player-controls'

// import img from "/Users/junyoungkim/Desktop/a.png";
/**
 * cols 열수
 * @constructor
 */
 const reducer = (prevState:any, newState:any) => (Object.assign(prevState,newState));
export default function VideoViewer() {

    const [state, setState] = React.useReducer(reducer, {
        url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
        pip: false,
        playing: true,
        controls: true,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
      });
    
    
    
      const load = (url:null|string) => {
        setState({
          url,
          played: 0,
          loaded: 0,
          pip: false
        })
      }
    
      const handlePlayPause = () => {
        setState({ playing: !state.playing })
      }
    
      const handleStop = () => {
        setState({ url: null, playing: false })
      }
    
      const handleToggleControls = () => {
        const url = state.url
        // setState({
        //   controls: !state.controls,
        //   url: null
        // }, () => load(url))
      }
    
      const handleToggleLight = () => {
        setState({ light: !state.light })
      }
    
      const handleToggleLoop = () => {
        setState({ loop: !state.loop })
      }
    
      const handleVolumeChange = (e:any) => {
        setState({ volume: parseFloat(e.target.value) })
      }
    
      const handleToggleMuted = () => {
        setState({ muted: !state.muted })
      }
    
      const handleSetPlaybackRate =(e:any)=> {
        setState({ playbackRate: parseFloat(e.target.value) })
      }
    
      const handleOnPlaybackRateChange = (speed:any) => {
        setState({ playbackRate: parseFloat(speed) })
      }
    
      const handleTogglePIP = () => {
        setState({ pip: !state.pip })
      }
    
      const handlePlay = () => {
        console.log('onPlay')
        setState({ playing: true })
      }
    
      const handleEnablePIP = () => {
        console.log('onEnablePIP')
        setState({ pip: true })
      }
    
      const handleDisablePIP = () => {
        console.log('onDisablePIP')
        setState({ pip: false })
      }
    
      const handlePause = () => {
        console.log('onPause')
        setState({ playing: false })
      }
    
      const handleSeekMouseDown =(e:any)=> {
        setState({ seeking: true })
      }
    
      const handleSeekChange =(e:any)=> {
        setState({ played: parseFloat(e.target.value) })
      }
    
      const handleSeekMouseUp =(e:any)=> {
        setState({ seeking: false })
        // player.seekTo(parseFloat(e.target.value))
      }
    
      const handleProgress = (state:any) => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!state.seeking) {
          setState(state)
        }
      }
    
      const handleEnded = () => {
        console.log('onEnded')
        setState({ playing: state.loop })
      }
    
      const handleDuration = (duration:any) => {
        console.log('onDuration', duration)
        setState({ duration })
      }
    
      const handleClickFullscreen = () => {
        // screenfull.request(findDOMNode(player))
      }
    
      const renderLoadButton = (url:any, label:any) => {
        return (
          <button onClick={() => load(url)}>
            {label}
          </button>
        )
      }
      const player = null;
      const ref = (player:any) => {
        player = player
      }
      const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = state;
    const SEPARATOR = ' · '
    return (
        <Box style={{height: '100%', width: '100%'}}>
        <ReactPlayer 
            ref={ref}
            url={url}
            width='100%'
            height='100%'
            pip={pip}
            playing={playing}
            controls={controls}
            light={light}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={() => console.log('onReady')}
            onStart={() => console.log('onStart')}
            onPlay={handlePlay}
            onEnablePIP={handleEnablePIP}
            onDisablePIP={handleDisablePIP}
            onPause={handlePause}
            onBuffer={() => console.log('onBuffer')}
            onPlaybackRateChange={handleOnPlaybackRateChange}
            onSeek={(e:any) => console.log('onSeek', e)}
            onEnded={handleEnded}
            onError={(e:any) => console.log('onError', e)}
            onProgress={handleProgress}
            onDuration={handleDuration}
        />
        </Box>
    )
}


