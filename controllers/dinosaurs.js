const express = require('express')
const router = express.Router()
// how we access/edit json files
const fs = require('fs')


router.get('/', (req,res) => {
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    // console.log(`NameFilter: ${nameFilter}`)
    if(nameFilter) {
        dinoData = dinoData.filter(dino => dino.name.toLowerCase() ===nameFilter.toLowerCase())
    }
    res.render('dinosaurs/index.ejs', {
        myDinos: dinoData
    })
})

// NEW DINO FORM ROUTE
router.get('/new', (req,res) => {
    res.render('dinosaurs/new.ejs')
})


// SHOW ROUTE (a specific dinosaur)
router.get('/:id', (req,res) => {
    // get the array of dinos from the json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // identify the index of the dino in question
    let dinoIndex = req.params.id
    console.log(`The dino you are searching for is ${dinoIndex}`)
    // isolate the dino in question
    console.log(dinoData[dinoIndex])
    res.render('dinosaurs/show.ejs', {
        myDino: dinoData[dinoIndex] 
    })
})

// POST A NEW 
router.post('/', (req,res) => {
    // get the array of dinos from the json
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    //add the new dino to the array
    dinoData.push(req.body)

    // save the dinosaurs to the json file
    fs.writeFileSync('./dinosaurs.json',JSON.stringify(dinoData))

    // redirect to the index route
    res.redirect('/dinosaurs')

    console.log(req.body)
})

// GET /dinosaurs/edit/:id -- a view of a form to edit a specific dino @ :id
router.get('/edit/:id', (req,res) => {
    // res.send(`show and edit a dino @ ${req.params.id}`)
    // get the dino data and render the edit form
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // render edit form
    res.render('dinosaurs/edit.ejs', {
        dinoId: req.params.id,
        dino: dinoData[req.params.id]
    })
})


// PUT //dinosaurs/:id -- update a dino @ :id in the database
router.put('/:id', (req, res) => {
    // get the dinos from the dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    // console.log(req.params.id, req.body)
    // update the dino based on the req.params.id and the req.body
    // req.params = which dino 
    // req.body = dino data to updated
    dinoData[req.params.id].name = req.body.name
    dinoData[req.params.id].type = req.body.type
    // write the json file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to some place that has interesting data
    res.redirect('/dinosaurs')
    // res.redirect(`./dinosaurs/${req.params.id}`) just to see this one dino
    // res.send(`update a dino @ ${req.params.id}`)
})

// DELETE /dinosaurs/:id -- DESTROY a dino @ :id
router.delete('/:id', (req,res) => {
    // get the dinos from the dino json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)
    // splice dino out f the array (index from the req.params)
    // Array.splice(starting index to remove, how many elements to remove)
    dinoData.splice(req.params.id, 1)

    // save the dino json
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to see all dinos
    // res.send(`DESTROY a poor dino @ ${req.params.id}`)
    res.redirect('/dinosaurs')
})


module.exports = router
