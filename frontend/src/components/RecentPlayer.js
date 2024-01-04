import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import { styled, useTheme } from '@material-ui/styles';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import SkiPreviousIcon from "@material-ui/icons/SkipPrevious";
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Text from '@material-ui/core/TextField';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { dark } from "@material-ui/core/styles/createPalette";
import CreateRoomPage from "./CreateRoomPage";

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
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')({
  padding: 16,
  borderRadius: 16,
  borderBlockColor:"#000000",
  width: 400,
  maxWidth: '100%',
  margin: 'auto',
  marginLeft:150,
  marginRight:150,
  position: 'relative',
  zIndex: 5,
  backgroundColor: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(20px)',
});

const CoverImage = styled('div')({
  width: 200,
  height: 200,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText1 = styled(Typography)({
  fontFamily: 'Lobster',
  fontSize:14,
  opacity: 0.90,
  letterSpacing: 0.6,
  alignItems: 'center',
  color:'rgba(256,256,256)',
})
const TinyText2 = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.78,
  letterSpacing: 0.6,
  color:'rgba(256,256,256)',
});
const TinyText3 = styled(Typography)({
  fontSize: '12px',
  opacity: 0.78,
  letterSpacing: 0.8,
  color:'rgba(256,256,256)',
});
function formatDuration(value) {
  const minute = Math.floor(value / 60000);
  const secondLeft = Math.floor((value - minute * 60000)/1000);
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : (secondLeft)}`;
}


export default class RecentPlayer extends Component {
  constructor(props) {
    super(props);
  }
  pauseSong() {
    console.log("pause")
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }; fetch("/api/pause", requestOptions);
  }

  playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }; fetch("/api/play", requestOptions);
  }

  skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/skip", requestOptions);
  }

  skipPrevSong(){
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/prev", requestOptions);
  }
  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;

    return (
      <Box x={{ width: '100%', overflow: 'hidden' }} container spacing={3}> 
        
        <Widget >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CoverImage>
              <img src={this.props.image_url} height="100%" width="100%" />
            </CoverImage>
            <Box sx={{ ml: 1.5, minWidth: 0 }}>
              <TinyText1><Typography component="h5" variant="h5" fontWeight={500} Wrap>
                {this.props.title}
              </Typography></TinyText1>
            </Box>
          </Box>
        </Widget>
        <WallPaper />
      </Box>
    );
  }
}
