const express = require('express')
const router = express.Router()
// how we access/edit json files
const fs = require('fs')


// INDEX ROUTE FOR PREHISTORIC CREATURES

router.get('/', (req,res) => {
    let creature = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creature)
    // let nameFilter = req.query.nameFilter
    // console.log(`NameFilter: ${nameFilter}`)
    // if(nameFilter) {
        // creatureData = creatureData.filter(creature => creature.type.toLowerCase() ===nameFilter.toLowerCase())
    // }
    res.render('prehistoric_creatures/index.ejs', {
        myCreature: creatureData
     })
})

// NEW CREATURE FORM ROUTE
router.get('/new', (req,res) => {
    res.render('prehistoric_creatures/new.ejs')
})

// SHOW ROUTE (a specific creature) grabbing by ID
router.get('/:id', (req,res) => {
    let creature = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creature)
    let creatureIndex = req.params.id
    console.log(`creature you are searching for is ${creatureIndex}`)
    res.render('prehistoric_creatures/show.ejs', {
        myCreature: creatureData[creatureIndex]
    })
})

// POST A NEW
router.post('/', (req,res) => {
    let creature = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creature)
    creatureData.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})


router.get('/edit/:id', (req, res) => {
    let creature = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creature)
    res.render('prehistoric_creatures/edit.ejs', {
        // render edit form
        creatureId: req.params.id,
        myCreature: creatureData[req.params.id]
    })
})

//
 // PUT creature/:id -- update the dino 
 router.put('/:id', (req, res) => {
    const creature = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creature)
    // req.params = which creature(if specify to one)
    // req.body = dino date to update
    creatureData[req.params.id].type = req.body.type
    creatureData[req.params.id].img_url = req.body.img_url
    // write the json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    //redirect to some place that has interesting data
    res.redirect('/prehistoric_creatures')
 })

// DEKETE
router.delete('/:id', (req, res) => {
    const creature = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creature)
    creatureData.splice(req.params.id, 1)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})




module.exports = router