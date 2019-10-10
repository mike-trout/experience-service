const express = require('express'); // Require the Express package
const app = express(); // App is an Express server

// Hardcode experience resource for the time being
const experience = [
    { id: 1, jobRole: 'Analyst Programmer', dateRange: 'Jan 2011 - Present', employer: 'Cov&eacute;a Insurance, Reading', description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam adipiscing vitae proin sagittis nisl. Arcu felis bibendum ut tristique et egestas quis. Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Eu volutpat odio facilisis mauris sit. Volutpat odio facilisis mauris sit. Arcu vitae elementum curabitur vitae nunc sed. Et egestas quis ipsum suspendisse ultrices gravida dictum. Sed turpis tincidunt id aliquet risus feugiat. Fermentum leo vel orci porta non. Blandit cursus risus at ultrices. Vitae purus faucibus ornare suspendisse sed nisi lacus. Scelerisque varius morbi enim nunc faucibus a. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi. Commodo sed egestas egestas fringilla. Feugiat sed lectus vestibulum mattis ullamcorper. Imperdiet proin fermentum leo vel orci.</p><p>Laoreet sit amet cursus sit amet. Et ultrices neque ornare aenean euismod elementum. Tristique senectus et netus et malesuada fames ac. Sagittis aliquam malesuada bibendum arcu vitae. Volutpat est velit egestas dui id ornare arcu odio. Enim facilisis gravida neque convallis a. Sit amet mauris commodo quis imperdiet massa. Tortor dignissim convallis aenean et tortor. Viverra ipsum nunc aliquet bibendum enim facilisis. Lacinia quis vel eros donec ac odio tempor. Libero id faucibus nisl tincidunt eget. Nec feugiat in fermentum posuere urna nec tincidunt praesent.</p>' },
    { id: 2, jobRole: 'Technician', dateRange: '2008 - 2011', employer: 'Electron Dynamics, Southampton', description: '<p>My main duties included the surface mount and thru-hole assembly of PCB boards, stock control and purchasing, invoicing and shipping orders. I also became involved in the assembly and testing of complete temperature control units, electronic design and prototyping, programming microcontrollers in C and 3D modelling and rendering using AutoCAD.</p>' }
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
