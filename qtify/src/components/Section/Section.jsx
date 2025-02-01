import React, { useEffect, useState } from "react";
import styles from "./Section.module.css";
import { useSnackbar } from "notistack";
import Typography from '@mui/material/Typography';
import Button from "../Button/Button";
import Grid from '@mui/material/Grid2';
import axios from "axios";
import SongCard from "../SongCard/SongCard"

function Section(){
    const { enqueueSnackbar } = useSnackbar();
    const [songsData, setSongsData] = useState([]);

    async function fetchSongs() {
        try {
            const res = await axios.get("https://qtify-backend-labs.crio.do/albums/top");
            if(res.status === 200){
                setSongsData(res.data);
                return (res.data);
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

    useEffect(()=>{
        fetchSongs();
    })

    return (
      <div style={{ padding: "10px" }}>
        <div className={styles.top}>
          <Typography style={{fontSize : '20px', fontWeight : 600, color : "#FFFFFF"}}>Top Albums</Typography>
          <Typography style={{fontSize : '20px', fontWeight : 600, color : "#34C94B"}}>Collapse</Typography>
        </div>
        <Grid container spacing={2} padding={'15px'}>
          {songsData.map((ele) => (
            <Grid item size={1.7}>
              <SongCard img={ele.image} followers={ele.follows} desc={ele.title}/>
            </Grid>
          ))}
        </Grid>
      </div>
    );
}

export default Section;