import React, { useEffect, useState, useRef } from "react";
import styles from "./Section.module.css";
import { useSnackbar } from "notistack";
import Typography from "@mui/material/Typography";
import Button from "../Button/Button";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import SongCard from "../SongCard/SongCard";
import Carousel from "../Carousel/Carousel";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';

function Section() {
  const { enqueueSnackbar } = useSnackbar();
  const [songsData, setSongsData] = useState([]);
  const [newSongsData, setNewSongsData] = useState([]);
  const [isCollapsed, setCollapsed] = useState(true);
  const [isNewCollapsed, setNewCollapsed] = useState(true);
  const [genre, setGenre] = useState([]);
  const [songs, setSongs] = useState([]);

  const [value, setValue] = useState('all');


  async function fetchGenreAndSongs(){
    try {
      const res = await axios.get(
        "https://qtify-backend-labs.crio.do/songs"
      );
      const newRes = await axios.get(
        "https://qtify-backend-labs.crio.do/genres"
      );
      if (newRes.status === 200 && res.status === 200) {
        setSongs(res.data);
        setGenre(newRes.data.data);
      }
    } catch (error) {
      enqueueSnackbar(
        "Could not fetch songs. Check that the backend is running, reachable and returns valid JSON.",
        {
          variant: "error",
        }
      );
    }
  }

  async function fetchSongs() {
    try {
      const res = await axios.get(
        "https://qtify-backend-labs.crio.do/albums/top"
      );
      const newRes = await axios.get(
        "https://qtify-backend-labs.crio.do/albums/new"
      );
      if (newRes.status === 200 && res.status === 200) {
        setSongsData(res.data);
        setNewSongsData(newRes.data);
      }
    } catch (error) {
      enqueueSnackbar(
        "Could not fetch songs. Check that the backend is running, reachable and returns valid JSON.",
        {
          variant: "error",
        }
      );
    }
  }

  const StyledTabs = styled(Tabs)({
    "& .MuiTabs-indicator": {
      display: "block !important",
      backgroundColor: "#34C94B",
      height: "4px",
      borderRadius: "2px",
    },
  });

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(16),
      marginRight: theme.spacing(1),
      fontFamily: "'Poppins', sans-serif",
      color: '#FFFFFF',
      '&.Mui-selected': {
        color: '#34C94B',
      },
      '&.Mui-focusVisible': {
        backgroundColor: '#34C94B',
      },
    }),
  );

  useEffect(() => {
    fetchSongs();
    fetchGenreAndSongs();
  }, []);

  const handleChange = (event, newValue) => {
    console.log(event, newValue);
    setValue(newValue);
  };

  return (
    <>
    <div style={{ padding: "10px" }}>
      <div className={styles.top}>
        <Typography
          style={{ fontSize: "20px", fontWeight: 600, color: "#FFFFFF" }}
        >
          Top Albums
        </Typography>
        {isCollapsed ? (
          <button
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#34C94B",
              cursor: "pointer",
              border: "none",
              background: "none",
            }}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            Show All
          </button>
        ) : (
          <button
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#34C94B",
              cursor: "pointer",
              border: "none",
              background: "none",
            }}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            Collapse
          </button>
        )}
      </div>
      {!isCollapsed ? (
        <Grid container spacing={2} padding={"15px"}>
          {songsData.map((ele) => (
            <Grid item size={1.7}>
              <SongCard
                img={ele.image}
                followers={ele.follows}
                desc={ele.title}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div style={{ padding: "15px" }}>
          <Carousel
            key="top-albums-carousel"
            items={songsData.map((ele) => (
              <Grid item key={ele.id} size={1.7}>
                <SongCard
                  img={ele.image}
                  followers={ele.follows}
                  desc={ele.title}
                />
              </Grid>
            ))}
          />
        </div>
      )}

      <div className={styles.top}>
        <Typography
          style={{ fontSize: "20px", fontWeight: 600, color: "#FFFFFF" }}
        >
          New Albums
        </Typography>
        {isNewCollapsed ? (
          <button
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#34C94B",
              cursor: "pointer",
              border: "none",
              background: "none",
            }}
            onClick={() => setNewCollapsed((prev) => !prev)}
          >
            Show All
          </button>
        ) : (
          <button
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#34C94B",
              cursor: "pointer",
              border: "none",
              background: "none",
            }}
            onClick={() => setNewCollapsed((prev) => !prev)}
          >
            Collapse
          </button>
        )}
      </div>
      {!isNewCollapsed ? (
        <Grid container spacing={2} padding={"15px"}>
          {newSongsData.map((ele) => (
            <Grid item size={1.7}>
              <SongCard
                img={ele.image}
                followers={ele.follows}
                desc={ele.title}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div style={{ padding: "15px" }}>
          <Carousel
            key="new-albums-carousel"
            items={newSongsData.map((ele) => (
              <Grid item key={ele.id} size={1.7}>
                <SongCard
                  img={ele.image}
                  followers={ele.follows}
                  desc={ele.title}
                />
              </Grid>
            ))}
          />
        </div>
      )}
    </div>
    <div style={{border: '1px solid #34C94B', 'border-style': 'solid none'}}>
    <div className={styles.top} style={{ padding: "10px" }}>
            <Typography
              style={{ fontSize: "20px", fontWeight: 600, color: "#FFFFFF" }}
            >
              Songs
            </Typography>
          </div>
          <Box sx={{ width: '100%', padding : "10px"}}>
      <TabContext value={value}>
        <Box>
          <StyledTabs value={value} onChange={handleChange}>
            <StyledTab label="All" value="all" />
            {
              genre.map((ele)=>(
                <StyledTab label={ele.label} value={ele.key} />
              ))
            }
          </StyledTabs>
        </Box>
        <TabPanel value="all">
        <div style={{ padding: "15px" }}>
          <Carousel
            key="songs-carousel"
            items={songs.map((ele) => (
              <Grid item key={ele.id} size={1.7}>
                <SongCard
                  img={ele.image}
                  followers={ele.likes}
                  desc={ele.title}
                  type="songs"
                />
              </Grid>
            ))}
          />
        </div>
        </TabPanel>
        <TabPanel value="jazz">
        <div style={{ padding: "15px" }}>
          <Carousel
            key="songs-carousel"
            items={songs.filter(ele => ele.genre.key === "jazz").map((ele) => (
              <Grid item key={ele.id} size={1.7}>
                <SongCard
                  img={ele.image}
                  followers={ele.likes}
                  desc={ele.title}
                  type="songs"
                />
              </Grid>
            ))}
          />
        </div>
        </TabPanel>
        <TabPanel value="rock">
        <div style={{ padding: "15px" }}>
          <Carousel
            key="songs-carousel"
            items={songs.filter(ele => ele.genre.key === "rock").map((ele) => (
              <Grid item key={ele.id} size={1.7}>
                <SongCard
                  img={ele.image}
                  followers={ele.likes}
                  desc={ele.title}
                  type="songs"
                />
              </Grid>
            ))}
          />
        </div>
        </TabPanel>
        <TabPanel value="pop">
        <div style={{ padding: "15px" }}>
          <Carousel
            key="songs-carousel"
            items={songs.filter(ele => ele.genre.key === "pop").map((ele) => (
              <Grid item key={ele.id} size={1.7}>
                <SongCard
                  img={ele.image}
                  followers={ele.likes}
                  desc={ele.title}
                  type="songs"
                />
              </Grid>
            ))}
          />
        </div>
        </TabPanel>
        <TabPanel value="blues">
        <div style={{ padding: "15px" }}>
          <Carousel
            key="songs-carousel"
            items={songs.filter(ele => ele.genre.key === "blues").map((ele) => (
              <Grid item key={ele.id} size={1.7}>
                <SongCard
                  img={ele.image}
                  followers={ele.likes}
                  desc={ele.title}
                  type="songs"
                />
              </Grid>
            ))}
          />
        </div>
        </TabPanel>
      </TabContext>
    </Box>
    </div>
    </>
  );
}

export default Section;
