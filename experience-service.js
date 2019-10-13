const express = require('express'); // Require the Express package
const app = express(); // App is an Express server

// Hardcode experience resource for the time being
const experience = [
    {
        id: 1,
        jobRole: 'Analyst Programmer',
        dateRange: 'Jan 2011 - Present',
        employer: 'Cov&eacute;a Insurance, Reading',
        description: `<p>After training in Software AG Adabas Natural, I was instrumental in the
migration of legacy Natural for Windows applications to the NaturalONE web application framework,
being the first to train in the technology. Additionally, I coded a utility tool in Java that
could automate the conversion of Natural for Windows source code to be compatible with the
NaturalONE framework.</p>

<p>To support the inhousing of our household claims function and migration to paperless, I
designed and developed the vast majority of the NaturalONE Documents System. The system now
supports the NaturalONE Claims System (household and commercial), the BCI commercial underwriting
platform and has replaced the legacy Natural for Windows DMS. The features include an integrated
email client, WYSIWYG document editor, image viewer with metadata support, SMS client and an
external post and email indexing system. To date, the system has processed and made available over
7.1 million items of post, letters, emails, attachments, SMS messages and other documents. It
handles approximately 44,000 new itemsper week.</p>

<p>I architected and implemented a search function for the BCI commercial underwriting platform
that uses Apache Solr on the backend to make business data far more quickly and easily accessible
compared with the limited, key-based record lookup functions available in other Natural
systems.</p>

<p>I created proof-of-concept CI/CD pipelines to automate the build, test and release of our legacy
Natural applications in an attempt to remove pain points in the existing processes. I innovated a
Natural unit test framework to enable the adoption of TDD in Natural software development. Using
React Native, I developed a mobile app to allow customers to take and upload photos and videos to
an AWS S3 bucket which are then visible in the NaturalONE Documents System.</p>

<p>Following Cov&eacute;a’s drive to become cloud-native and adopt a microservices architecture, I
am involved in the implementation of Kubernetes clusters in AWS using Terraform and Rancher and the
creation of automation pipelines using Jenkins, Docker and Helm.</p>

<p>Recently, I have organised and run a series of ‘learning lunches’ to help my colleagues. We have
so far covered tools and technologies that include Git, Docker, Node.js, MongoDB, REST APIs, using
curl to test APIs and running Docker containers on AWS EC2 instances.</p>`
    },
    {
        id: 2,
        jobRole: 'Technician',
        dateRange: '2008 - 2011',
        employer: 'Electron Dynamics, Southampton',
        description: `<p>My main duties included the surface mount and thru-hole assembly of PCB
boards, stock control and purchasing, invoicing and shipping orders. I also became involved in the
assembly and testing of complete temperature control units, electronic design and prototyping,
programming microcontrollers in C and 3D modelling and rendering using AutoCAD.</p>`
    }
];

// GET /experience/ handler
app.get('/experience/', (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    resp.setHeader('Allow', 'GET, HEAD, OPTIONS');
    const protocol = req.header('x-forwarded-proto') || req.protocol;
    const requestUrl = protocol + '://' + req.get('host') + req.path;
    const json = {
        count: experience.length,
        items: experience.map((value) => {
            return requestUrl + value.id;
        }),
        url: requestUrl
    };
    resp.send(json);
});

// GET /experience/{id} handler
app.get('/experience/:id([0-9]+)', (req, resp) => {
    const id = parseInt(req.params['id']);
    const experienceItem = experience.find((value) => value.id === id);
    resp.setHeader('Content-Type', 'application/json');
    resp.setHeader('Allow', 'GET, HEAD, OPTIONS');
    if (experienceItem) {
        const protocol = req.header('x-forwarded-proto') || req.protocol;
        experienceItem.url = protocol + '://' + req.get('host') + req.path;
        resp.send(experienceItem);
    } else {
        resp.status(404).send({ error: 'Experience item not found' });
    }
});

// GET /healthz handler
app.get('/healthz', (req, resp) => {
    resp.sendStatus(200);
});

// Get HTTP_PORT from environment, default to 50000
const port = process.env.HTTP_PORT || 50000;

// Start server listening on the specified port
const server = app.listen(port);
console.log(`Experience service listening on port ${port}`);

// The signals to handle
// NOTE: The SIGKILL signal (9) cannot be intercepted and handled
const signals = {
    'SIGHUP': 1,
    'SIGINT': 2,
    'SIGTERM': 15
};

// Do any necessary shutdown logic for the application here
const shutdown = (signal, value) => {
    console.log("Shutdown!");
    server.close(() => {
        console.log(`Server stopped by ${signal} with value ${value}`);
        process.exit();
    });
};

// Create a listener for each of the signals to handle
Object.keys(signals).forEach((signal) => {
    process.on(signal, () => {
        console.log(`Process received a ${signal} signal`);
        shutdown(signal, signals[signal]);
    });
});
