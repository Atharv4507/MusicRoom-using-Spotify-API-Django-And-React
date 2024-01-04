import React, { Component } from "react";
import { Grid, Button, Typography, Box } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import CreateRoomPage from "./CreateRoomPage";
import { styled, useTheme } from '@material-ui/styles';
import MusicPlayer from "./MusicPlayer";
import RecentPlayer from "./RecentPlayer";

const TinyText3 = styled(Typography)({
  fontSize: '36px',
  display: 'inline',
  opacity: 0.78,
  letterSpacing: 0.6,
  color: 'rgba(256,256,256)',
  alignItems: 'center',
  marginLeft: '220px',
});

const Widget = styled('div')({
  padding: 0,
  borderRadius: 0,
  fontSize: 10,
  maxWidth: '100%',
  margin: 'auto',
  marginLeft: 40,
  marginRight: 50,
  marginBottom: 10,
  borderBottomLeftRadius:50,
  borderBottomRightRadius:50,
  position: 'relative',
  zIndex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(20px)',
});

const WallPaper = styled('div')({
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
})

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
      showSettings: false,
      spotifyAuthenticated: false,
      song: {},
    };
    this.roomCode = this.props.match.params.roomCode;
    this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
    this.updateShowSettings = this.updateShowSettings.bind(this);
    this.renderSettingsButton = this.renderSettingsButton.bind(this);
    this.renderSettings = this.renderSettings.bind(this);
    this.getRoomDetails = this.getRoomDetails.bind(this);
    this.authenticateSpotify = this.authenticateSpotify.bind(this);
    this.getCurrentSong = this.getCurrentSong.bind(this);
    this.getRecentSong = this.getRecentSong.bind(this);
    this.getRoomDetails();
  }

  componentDidMount() {
    this.interval = setInterval(this.getCurrentSong, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getRoomDetails() {
    return fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => {
        if (!response.ok) {
          this.props.leaveRoomCallback();
          this.props.history.push("/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
        if (this.state.isHost) {
          this.authenticateSpotify();
        }
      });
  }

  authenticateSpotify() {
    fetch("/api/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ spotifyAuthenticated: data.status });
        console.log(data.status);
        if (!data.status) {
          fetch("/api/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  getCurrentSong() {
    fetch("/api/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({ song: data });
        console.log(data);
      });
  }

  getRecentSong() {
    fetch("/api/recent")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        this.setState({ song: data });
        console.log(data);
      });
  }

  leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((_response) => {
      this.props.leaveRoomCallback();
      this.props.history.push("/");
    });
  }

  updateShowSettings(value) {
    this.setState({
      showSettings: value,
    });
  }

  renderSettings() {
    return (
      <Box container spacing={3}>
        <Box>
          <CreateRoomPage
            update={true}
            votesToSkip={this.state.votesToSkip}
            guestCanPause={this.state.guestCanPause}
            roomCode={this.roomCode}
            updateCallback={this.getRoomDetails}
          />
        </Box>
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.updateShowSettings(false)}
          >
            Close
          </Button>
        </Grid>
      </Box>
    );
  }

  renderSettingsButton() {
    return (
      <Grid item xs={12} align="center">
        <Button
          style={{
            background: "#808080",
            color: "#FFFFFF",

          }}
          variant="contained"

          onClick={() => this.updateShowSettings(true)}
        >
          Settings
        </Button>
      </Grid>
    );
  }


  SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
      const newSearchTerm = event.target.value;
      setSearchTerm(newSearchTerm);
      // You can perform additional actions on search, like calling an API or updating a state.
      onSearch(newSearchTerm);
    };
  };



  render() {
    if (this.state.showSettings) {
      return this.renderSettings();
    }
    return (
      <Box className="center" style={{height:"500px"}}>
        <Widget>
          <Typography >
            <TinyText3>Code:{this.roomCode}</TinyText3>
          </Typography>
          <WallPaper />
        </Widget>
        <Box sx={{ display: 'flex', alignItems: 'center'}}>
          <MusicPlayer {...this.state.song} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', height:"10%" }}>
          {this.state.isHost ? this.renderSettingsButton() : null}  
        </Box>

        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={this.leaveButtonPressed}
          >
            Leave Room
          </Button>
        </Grid>

      </Box>
    );
  }
}
