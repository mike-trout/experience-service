const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 50000;
const app = express();
app.use(bodyParser.json());

const experience = [
    { id: 1, jobRole: 'Technical Evangelist', dateRange: 'Nov 2017 - Present', employer: 'Amazon Web Services', description: 'I did some stuff. It was good.' },
    { id: 2, jobRole: 'Founder, Open Source and Cloud Architect', dateRange: '2011 - 2017', employer: 'Ngineered', description: 'I did some cloud stuff. It was cloudy.' }
];

app.get('/api/experience', (req, resp) => {
    console.log('Returning experience list.');
    resp.send(experience);
});

console.log(`Experience service listening on port ${port}`);
app.listen(port);
