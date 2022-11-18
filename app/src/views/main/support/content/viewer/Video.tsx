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
import { findDOMNode } from 'react-dom'

// import { Slider, Direction } from 'react-player-controls'

// import img from "/Users/junyoungkim/Desktop/a.png";
/**
 * cols 열수
 * @constructor
 */
 
 export default class Video extends React.Component<any> {
  state = {
    url: '',
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
  }
  player:any
  proxyPath : any
  constructor(props:{content_id : string}){
    super(props);
    const test = `https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4`;
    // const test = 'http://localhost:11101/play/proxy/PxCFnA8ZAwbybOMg';
    this.state.url = test;
    const contentId = props.content_id;
    // const contentId = metadata._id;
    const proxyPath = `http://localhost:11101/play/proxy/${contentId}?w=248&fit=crop&auto=format`;
    this.proxyPath = proxyPath;
    console.log('props',props)
  }
  load = (url:any) => {
    console.log('load',url);
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  handlePlayPause = () => {
    console.log('handlePlayPause');
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    console.log('handleStop');
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    console.log('handleToggleControls');
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleToggleLight = () => {
    this.setState({ light: !this.state.light })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = (e:any) => {
    console.log('handleVolumeChange')
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleSetPlaybackRate = (e:any) => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleOnPlaybackRateChange = (speed:any) => {
    this.setState({ playbackRate: parseFloat(speed) })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handleEnablePIP = () => {
    console.log('onEnablePIP')
    
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = (e:any) => {
    this.setState({ seeking: true })
  }

  handleSeekChange = (e:any) => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = (e:any) => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = (state:any) => {
    // console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    // if (!this.state.seeking) {
    //   this.setState(state)
    // }
  }

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration:any) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  handleClickFullscreen = () => {
    // screenfull.request(findDOMNode(this.player))
  }

  renderLoadButton = (url:any, label:any) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  ref = (player:any) => {
    this.player = player
    const reactPlayerDom : any = findDOMNode(this.player);
    console.log('this.proxyPath',this.proxyPath);
    if(reactPlayerDom){
      if(reactPlayerDom.children){
        if(reactPlayerDom.children.length >= 1){
          reactPlayerDom.children[0].setAttribute("src",this.proxyPath)
        }
        
      }
    }
    
    // findDOMNode(this.player).children[0].setAttribute("src","http://localhost:11101/play/proxy/PxCFnA8ZAwbybOMg");
    console.log('this.player',this.player);
    console.log('player',player);
  }

  render () {
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
    const SEPARATOR = ' · '

    return (
      <Box style={{height: '100%', width: '100%', backgroundColor:'gray'}}>
        <ReactPlayer
          ref={this.ref}
          className='react-player'
          width='100%'
          height='100%'
          url={url}
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
          onPlay={this.handlePlay}
          onEnablePIP={this.handleEnablePIP}
          onDisablePIP={this.handleDisablePIP}
          onPause={this.handlePause}
          onBuffer={() => console.log('onBuffer')}
          onPlaybackRateChange={this.handleOnPlaybackRateChange}
          onSeek={(e:any) => console.log('onSeek', e)}
          onEnded={this.handleEnded}
          onError={(e:any) => console.log('onError', e)}
          onProgress={this.handleProgress}
          onDuration={this.handleDuration}
        />
      </Box>
    )
  }
}



