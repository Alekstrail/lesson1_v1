import {Request, Response} from "express";

const express = require('express')
export const app = express()
const port = process.env.PORT || 3003



export type VideosType = {
    "id": Number
    "title": "string"
    "author": "string"
    "canBeDownloaded": Boolean | false
    "minAgeRestriction": Number | null
    "createdAt": new Date().toISOString()
    "publicationDate": new Date().toISOString()
    "availableResolutions": Array<string>
}
    const resolution : Array<string> = ['P144', 'P240','P360', 'P480', 'P720', 'P1080','P1440', 'P2160'];
//function for Resolution

    function resolutionTrue (getResolution,resolution) {
       for (var i=0; i < resolution.length;i++) {
           if (getResolution===resolution[i]) {
               return true;
           } else {
               return false;
           }
       }
    }
const videos: Array<VideosType> = [
    {
        "id": 1,
        "title": "Harry",
        "author": "Potter",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2023-04-01T17:20:32.639Z",
        "publicationDate": "2023-04-01T17:20:32.639Z",
        "availableResolutions": "P144"

    },
    {
        "id": 2,
        "title": "James",
        "author": "Bond",
        "canBeDownloaded": true,
        "minAgeRestriction": null,
        "createdAt": "2023-04-01T17:20:32.639Z",
        "publicationDate": "2023-04-01T17:20:32.639Z",
        "availableResolutions": "P240"

    }
]


app.get('/videos', (req: Request, res: Response) => {
    res.send(videos)
})

app.get('/products/:id', (req:Request, res: Response) => {

    let video = videos.find(p => p.id === +req.params.id)
    if (video) {
        res.sendStatus(200).send(video);
    } else {
        res.send(404)
    }

})

app.post('/videos', (req: Request, res: Response) => {
    let title= req.body.title
    let author = req.body.author
    let availableResolutions = req.body.availableResolutions


    if (!title || typeof title !== 'string' || title.length >40) {
        res.sendStatus(400).send({
            "errorsMessages":[
        {
            "message": "Incorrect title",
            "field": "title"
        }]
        })
        return;
    }
    if (!author || typeof author !== 'string' || author.length >20) {
        res.sendStatus(400).send({
            "errorsMessages":[
                {
                    "message": "Incorrect title",
                    "field": "title"
                }]
        })
        return;
    }

    if (!availableResolutions || resolutionTrue(availableResolutions,resolution) === false) {
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
        "title": title,
        "author": author,
        "availableResolutions": availableResolutions,
        "canBeDownloaded": false
        "minAgeRestriction": null
        "createdAt": new Date().toISOString()
        "publicationDate": new Date().toISOString()
    };
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
    let title = req.body.title
    let author = req.body.author
    let availableResolutions = req.body.availableResolutions
    let minAgeRestriction = req.body.minAgeRestriction
    let canBeDownloaded = req.body.canBeDownloaded
    let publicationDate = req.body.publicationDate
    if (!title || typeof title !== 'string' || title.length >40) {
        res.sendStatus(400).send({
            "errorsMessages":[
                {
                    "message": "Incorrect title",
                    "field": "title"
                }]
        })
        return;
    }
    if (!author || typeof author !== 'string' || author.length >20) {
        res.sendStatus(400).send({
            "errorsMessages":[
                {
                    "message": "Incorrect title",
                    "field": "title"
                }]
        })
        return;
    }

    if (!availableResolutions || resolutionTrue(availableResolutions,resolution) === false) {
        res.sendStatus(400).send({
            "errorsMessages":[
                {
                    "message": "Incorrect title",
                    "field": "title"
                }]
        })
        return;
    }

    if (!minAgeRestriction || minAgeRestriction > 18) {
        res.sendStatus(400).send({
            "errorsMessages": [
                {
                    "message": "Incorrect value",
                    "field": "title"
                }]
        })
        return;
    }
    if ( canBeDownloaded !== Boolean) {
        res.sendStatus(400).send({
            "errorsMessages": [
                {
                    "message": "Incorrect value",
                    "field": "title"
                }]
        })
        return;
    }

    if (!canBeDownloaded) {
        canBeDownloaded = false;
        }



    if (!publicationDate || publicationDate !== 'string') {
        res.sendStatus(400).send({
            "errorsMessages": [
                {
                    "message": "Incorrect date",
                    "field": "title"
                }]
        })
        return;
    }



        let video = videos.find(v => v.id === +req.params.id)
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

    app.delete('/__test__/data', (req: Request, res: Response) => {
    videos = [];
    res.sendStatus(204)}
)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})