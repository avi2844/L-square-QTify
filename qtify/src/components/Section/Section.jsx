import React, { useEffect, useState, useRef } from "react";
import styles from "./Section.module.css";
import { useSnackbar } from "notistack";
import Typography from "@mui/material/Typography";
import Button from "../Button/Button";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import SongCard from "../SongCard/SongCard";
import Carousel from "../Carousel/Carousel";

function Section() {
  const { enqueueSnackbar } = useSnackbar();
  const [songsData, setSongsData] = useState([]);
  const [newSongsData, setNewSongsData] = useState([]);
  const [isCollapsed, setCollapsed] = useState(true);
  const [isNewCollapsed, setNewCollapsed] = useState(true);

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

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
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
  );
}

export default Section;
