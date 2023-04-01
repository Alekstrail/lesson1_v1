import {Request, Response} from "express";

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
type AvailableResolutionsType = {
    [ P144, P240, P360, P480, P720, P1080, P1440, P2160 ]
}

type VideosType = {
    "id": Number
    "title": "string"
    "author": "string"
    "canBeDownloaded": Boolean | false
    "minAgeRestriction": Number | null
    "createdAt": new Date().toISOString()
    "publicationDate": new Date().toISOString()
    "availableResolutions": AvailableResolutionsType
}
const videos: VideosType[] = [
    {
        "id": 1,
        "title": "Harry",
        "author": "Potter",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2023-04-01T17:20:32.639Z",
        "publicationDate": "2023-04-01T17:20:32.639Z",
        "availableResolutions": [
            "P144"
        ]
    },
    {
        "id": 2,
        "title": "James",
        "author": "Bond",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2023-04-01T17:20:32.639Z",
        "publicationDate": "2023-04-01T17:20:32.639Z",
        "availableResolutions": [
            "P240"
        ]
    }
]

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Alex!')
})

app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.post('/videos', (req: Request, res: Response) => {
    if (!req.body.title || !req.body.author || !req.body.availableResolutions) {
        res.sendStatus(400).send({
            "errorsMessages":[
        {
            "message": "Incorrect title",
            "field": "title"
        }]
        })
        return;
    }
    let newVideo: VideosType = {
        "id": +(new Date()),
        "title": req.body.title,
        "author": req.body.author,
        "availableResolutions": req.body.availableResolutions
    }
    videos.push(newVideo)
    res.status(201).send(newVideo)
})

app.get('/videos/:id', (req: Request, res: Response) => {
    let video = videos.find(v=>v.id === +req.params.id)
    if (video) {
        res.sendStatus(200).send(video)
    } else {
        res.send(404)
    }
    res.send(videos)
})

app.put('/videos/:id', (req: Request, res: Response) => {
    if (!req.body.title || !req.body.author || !req.body.availableResolutions) {
        res.sendStatus(400).send({
            "errorsMessages":[
                {
                    "message": "Incorrect value",
                    "field": "title"
                }]
        })
        return;

    let video = videos.find(v=>v.id === +req.params.id)
    if (video) {
        video.title = req.body.title
        video.author = req.body.author
        video.availableResolutions = req.body.availableResolutions
        video.canBeDownloaded = req.body.canBeDownloaded
        video.minAgeRestriction = req.body.minAgeRestriction
        video.publicationDate = req.body.publicationDate
        res.sendStatus(200).send(video)
    } else {
        res.send(404)
    }
    res.send(videos)
})

app.delete('/videos/:id', (req: Request, res: Response) => {
    for (let i=0;i<videos.length; i++) {
       if (videos[i].id === +req.params.id) {
            videos.splice(i, 1);
            res.send(204)
        }
    }
    res.send(404)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})