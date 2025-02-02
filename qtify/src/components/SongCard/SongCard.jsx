import React from "react";
import styles from "./SongCard.module.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';

function SongCard({img, followers, desc, type}){
    return (
      <div className={styles.card}>
        <Card className={styles.songCard}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={img}
              alt="album"
            />
          </CardActionArea>
          <CardActions>
            <Chip className={styles.chip} label={(type === "songs") ? `${followers} Likes` : `${followers} Follows`} color="black" />
          </CardActions>
        </Card>
        <Typography color="#FFFFFF">{desc}</Typography>
      </div>
    );
}

export default SongCard;