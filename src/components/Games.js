import React, { useState } from 'react';
import axios from "axios";
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import DialogGames from './DialogGames';

function Loading() {
    return (
        <Grid item lg={3} md={4} xs={12} style={{ margin: "0 auto", textAlign: "center" }}>
            <Typography variant="h2">
                Loading
            </Typography>
        </Grid>
    )
}

function fetchData(page, callback) {
    axios.get("https://www.balldontlie.io/api/v1/games?per_page=20&&page=" + page)
        .then(res => callback(res.data.data));
}

function Games() {
    const [data, setData] = useState(["Loading"]);
    const [loading, setLoading] = useState(true);
    let [modalOpen, setModalOpen] = useState(() => {
        let temp = {};
        for (let i=0; i<20; i++)
            temp = {...temp, [i]: false};
        return temp;
    });
    const [page, setPage] = useState(1);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    function handleNext(e) {
        e.stopPropagation();
        setPage((page+1));
        setLoading(true);
        fetchData(page, (data) => {setData(data); setLoading(false)});
    }
    function handlePrevious(e) {
        e.stopPropagation();
        if (page > 1) {
            setPage((page-1));
            setLoading(true);
            fetchData(page, (data) => {setData(data); setLoading(false)});
        }
    }
    function openModal(e,idx) {
        e.stopPropagation();
        console.log("openModal");
        const temp = {...modalOpen, [idx]: true};
        setModalOpen(temp);
    }
    function closeModal(idx) {
        console.log("closeModal");
        const temp = {...modalOpen, [idx]: false};
        setModalOpen(temp);
    }
    if (data[0] === "Loading") 
        fetchData(page, (data) => {setData(data); setLoading(false)});
    return (
        <Paper>
            <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={40}>
                {
                    loading ?
                        <Loading /> :
                        data.map((item, idx) => {
                            return (
                                <Grid item md={4} lg={3} xs={12} key={idx} onClick={(e) => {return openModal(e,idx)}}>
                                    <Typography variant="title">
                                        {(new Date(item.date)).toLocaleDateString("latn", options)}
                                        <Typography variant="subtitle1">
                                            {item.status}
                                        </Typography>
                                    </Typography>
                                    <DialogGames data={item} open={modalOpen[idx]} close={() => {return closeModal(idx)}}/>
                                </Grid>
                            );
                        })
                }
            </Grid>
            <Grid container spacing={40} justify="center" style={{ textAlign: "center" }}>
                <Grid item md={6} lg={6} xs={12}>
                    <Button size="large" style={{ background: "#60cb5c", color: "white" }} onClick={handlePrevious}>Previous</Button>
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                    <Button size="large" style={{ background: "#60cb5c", color: "white" }} onClick={handleNext}>Next</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Games;