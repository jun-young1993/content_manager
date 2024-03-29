import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {invoker, sender} from "@views/helper/helper";
import {isEmpty} from 'lodash';
import Store from "electron-store";

const store = new Store();
const WallPaper = styled('div')({
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
    background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
    transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
    '&:before': {
        content: '""',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '-40%',
        right: '-50%',
        background:
            'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
    },
    '&:after': {
        content: '""',
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: '-50%',
        left: '-30%',
        background:
            'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
        transform: 'rotate(30deg)',
    },
});

const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 343,
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
    },
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});


interface MusicPlayerInterface {
    url : string
    metadata : any
}
export default function MusicPlayer(props:MusicPlayerInterface) {
    // const [playing , playToggle] = useAudio(props.url)
    const [albumImage, setAlbumImage] = React.useState<any>((
        <CoverImage>
            {/*"http://localhost:11101/thumbnail/" + content._id + "?w=248&fit=crop&auto=format"*/}
                        <img
                            alt="앨범 이미지가 없습니다."
                            src={"http://localhost:11101/thumbnail/" + props.metadata._id}
                            onError={(event:any)=>{
                                setAlbumImage((<CoverImage
                                    sx={{
                                        '&:hover' : {
                                            cursor : "pointer"
                                        }
                                    }}
                                    onClick={()=>{
                                        console.log('click',props)
                                        invoker("$start-workflow",{
                                            content_id : props.metadata._id,
                                            workflow_id : "ingest_thumbnail_music"
                                        })
                                            .then((result) => {
                                                console.log("=>(MusicPlayer.tsx:96) result", result);
                                            })
                                            .catch((workflowException) => {
                                                console.log("=>(MusicPlayer.tsx:99) workflowException", workflowException);
                                            })
                                    }}
                                >
                                    <Stack 
                                    direction="column"
                                    sx={{width : "100%"}}
                                    >
                                    <Typography
                                        variant='caption'
                                    >
                                        No Image
                                    </Typography>
                                    <Typography
                                            variant='caption'
                                        >
                                            클릭하여 등록하기
                                    </Typography>
                                    </Stack>
                                </CoverImage>));
                            }}
                        />
    </CoverImage>));
    const [duration, setDuration] = React.useState(0);
    const [format, setFormat] = React.useState({
        duration : 0,
        type : "audio/mp3"
    });
    const theme = useTheme();
    // React.useEffect(() => {
       
    // },[]);
    const [audio] = React.useState(new Audio(props.url));

    const [position, setPosition] = React.useState(0);
    let progressInterval : NodeJS.Timeout | null = null;

    const stopProgressInterval = () => {
        if(progressInterval !== null){
            clearInterval(progressInterval);
        }
    }
    const startProgressInterval = () => {
        
        const progressInterval = setInterval(() => {
            console.log('audio.currentTime',audio.currentTime,audio.duration);
    
            setPosition(Math.floor(audio.currentTime))
          }, 1000);
        return progressInterval;
    }
    

    React.useEffect(() => {
        sender("@MediaInfo/_index",props.metadata._id)
        .then((metadata:any) => {
            console.log(metadata);
            if(!isEmpty(metadata.data)){
                setDuration(Math.floor(metadata.data[0].format.duration));
            }
            
        })
        audio.addEventListener('ended', () => setPlaying(false));
        function handleEvent(event:any) {
            console.log("=>(MusicPlayer.tsx:104) event.type", event.type);


        }
        audio.addEventListener('loadstart', handleEvent);
        audio.addEventListener('progress', handleEvent);
        audio.addEventListener('canplay', handleEvent);
        audio.addEventListener('canplaythrough', handleEvent);
        // audio.addEventListener('progress',function(event){
            
        //     console.log('progress',audio.currentTime,event);
        // })
        return () => {
            // audio.removeEventListener('playing',() => {console.log('remove playing')});
            // audio.removeEventListener('progress',() => {console.log('remove progress')});
            audio.removeEventListener('ended', () => {setPlaying(false)});
        };
    }, []);
    // const duration = 200; // seconds
    
    const [paused, setPaused] = React.useState<boolean>(true);
    const [playing, setPlaying] = React.useState<boolean>(paused);
    const toggle = () => setPlaying(!playing);
    React.useEffect(() => {
        if(playing){
            // startProgressInterval();
            audio.play()
        }else{
            // stopProgressInterval();
            audio.pause()
        }
    },
    [playing]
    );
    React.useEffect(()=>{
        // playToggle();
        toggle();
    },[paused])
    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor =
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Widget>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {albumImage}
                    <Box sx={{ ml: 1.5, minWidth: 0 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            {props.metadata[String(store.get('content_detail_music.preview_caption'))] || "-"}
                        </Typography>
                        <Typography noWrap>
                            <b>{props.metadata[String(store.get('content_detail_music.preview_title'))]  || "-"}</b>
                        </Typography>
                        <Typography noWrap letterSpacing={-0.25}>
                            {props.metadata[String(store.get('content_detail_music.preview_sub_title'))]  || "-"}
                        </Typography>
                    </Box>
                </Box>
                <audio src={props.url} controls/>
                {/*<Slider*/}
                {/*    aria-label="time-indicator"*/}
                {/*    size="small"*/}
                {/*    value={position}*/}
                {/*    min={0}*/}
                {/*    step={1}*/}
                {/*    max={duration}*/}
                {/*    onChange={(_, value) => {*/}
                {/*        console.log("value",value);*/}
                {/*        setPosition(value as number)*/}
                {/*    }}*/}
                {/*    sx={{*/}
                {/*        color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',*/}
                {/*        height: 4,*/}
                {/*        '& .MuiSlider-thumb': {*/}
                {/*            width: 8,*/}
                {/*            height: 8,*/}
                {/*            transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',*/}
                {/*            '&:before': {*/}
                {/*                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',*/}
                {/*            },*/}
                {/*            '&:hover, &.Mui-focusVisible': {*/}
                {/*                boxShadow: `0px 0px 0px 8px ${*/}
                {/*                    theme.palette.mode === 'dark'*/}
                {/*                        ? 'rgb(255 255 255 / 16%)'*/}
                {/*                        : 'rgb(0 0 0 / 16%)'*/}
                {/*                }`,*/}
                {/*            },*/}
                {/*            '&.Mui-active': {*/}
                {/*                width: 20,*/}
                {/*                height: 20,*/}
                {/*            },*/}
                {/*        },*/}
                {/*        '& .MuiSlider-rail': {*/}
                {/*            opacity: 0.28,*/}
                {/*        },*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        display: 'flex',*/}
                {/*        alignItems: 'center',*/}
                {/*        justifyContent: 'space-between',*/}
                {/*        mt: -2,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <TinyText>{formatDuration(position)}</TinyText>*/}
                {/*    <TinyText>-{formatDuration(duration - position)}</TinyText>*/}
                {/*</Box>*/}
                {/*<Box*/}
                {/*    sx={{*/}
                {/*        display: 'flex',*/}
                {/*        alignItems: 'center',*/}
                {/*        justifyContent: 'center',*/}
                {/*        mt: -1,*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <IconButton aria-label="previous song">*/}
                {/*        <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />*/}
                {/*    </IconButton>*/}
                {/*    <IconButton*/}
                {/*        aria-label={paused ? 'play' : 'pause'}*/}
                {/*        onClick={() => setPaused(!paused)}*/}
                {/*    >*/}
                {/*        {paused ? (*/}
                {/*            <PlayArrowRounded*/}
                {/*                sx={{ fontSize: '3rem' }}*/}
                {/*                htmlColor={mainIconColor}*/}
                {/*            />*/}
                {/*        ) : (*/}
                {/*            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />*/}
                {/*        )}*/}
                {/*    </IconButton>*/}
                {/*    <IconButton aria-label="next song">*/}
                {/*        <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />*/}
                {/*    </IconButton>*/}
                {/*</Box>*/}
                {/*<Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">*/}
                {/*    <VolumeDownRounded htmlColor={lightIconColor} />*/}
                {/*    <Slider*/}
                {/*        aria-label="Volume"*/}
                {/*        defaultValue={30}*/}
                {/*        sx={{*/}
                {/*            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',*/}
                {/*            '& .MuiSlider-track': {*/}
                {/*                border: 'none',*/}
                {/*            },*/}
                {/*            '& .MuiSlider-thumb': {*/}
                {/*                width: 24,*/}
                {/*                height: 24,*/}
                {/*                backgroundColor: '#fff',*/}
                {/*                '&:before': {*/}
                {/*                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',*/}
                {/*                },*/}
                {/*                '&:hover, &.Mui-focusVisible, &.Mui-active': {*/}
                {/*                    boxShadow: 'none',*/}
                {/*                },*/}
                {/*            },*/}
                {/*        }}*/}
                {/*    />*/}
                {/*    <VolumeUpRounded htmlColor={lightIconColor} />*/}
                {/*</Stack>*/}
            </Widget>
            {/*<WallPaper />*/}
        </Box>
    );
}
