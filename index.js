const knex = require('knex');
const knexConfig = require('./knexfile.js');
const express = require('express');

const server = express();

server.use(express.json());
const db = knex(knexConfig.development);

server.get('/', (req, res) => {
    res.send('server connected');
});


// endpoints
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => {
            res.status(500).json({ err: 'Server error retrieving cohorts' });
        });
});

server.get('/api/cohorts/:id/students', (req, res) => {
    db('students')
        .where({ cohort_id: req.params.id })
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => {
            res.status(500).json({ err: 'Server error retrieving students from cohort' });
        });
});

server.get('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({id: req.params.id})
        .then(cohort => {
            if(cohort.length !== 0) {
                res.status(200).json(cohort);
            } else {
                res.status(404).json({ message: 'Cohort could not be found with that ID' });
            }
        })
        .catch(err => {
            res.status(500).json({ err: 'Server error retrieving cohort with that ID' });
        });
});

server.post('/api/cohorts', (req, res) => {
    if(req.body.name) {
        db('cohorts')
            .insert(req.body)
            .then(id => {
                res.status(201).json(id);
            })
            .catch(err => {
                res.status(409).json({ message: 'Name already exists, try another' });
            });
    } else {
        res.status(412).json({ message: 'Please provide name and try again' });
    }
});

server.put('/api/cohorts/:id', (req, res) => {
    if(req.body.name) {
    db('cohorts')
        .where({ id: req.params.id })
        .update(req.body)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({ err: 'Server error while updating, try again' });
        });
    } else {
        res.status(412).json({ message: 'Please provide name for update' });
    }
})

server.delete('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if(count !== 0) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: 'Id could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json({ err: 'Server error while deleting, try again' });
        });
})



// students endpoints
server.get('/api/students/:id', (req, res) => {
    db('students')
        .select('students.id', 'students.name', 'cohorts.name as cohort')
        .from('students')
        .innerJoin('cohorts', 'cohorts.id', '=', 'students.cohort_id')
        .where('students.id', req.params.id)
        .then(student => {
            res.status(200).json(student);
        })
        .catch(err => {
            res.status(500).json({ err: 'Server error, try again' });
        });
});

server.listen(5001, () => console.log('server port 5001'));