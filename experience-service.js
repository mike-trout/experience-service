const express = require('express');

const port = process.env.HTTP_PORT || 50000;
const app = express();

const experience = [
    { id: 1, jobRole: 'Analyst Programmer', dateRange: 'Jan 2011 - Present', employer: 'Covea Insurance plc.', description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quam adipiscing vitae proin sagittis nisl. Arcu felis bibendum ut tristique et egestas quis. Pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies. Eu volutpat odio facilisis mauris sit. Volutpat odio facilisis mauris sit. Arcu vitae elementum curabitur vitae nunc sed. Et egestas quis ipsum suspendisse ultrices gravida dictum. Sed turpis tincidunt id aliquet risus feugiat. Fermentum leo vel orci porta non. Blandit cursus risus at ultrices. Vitae purus faucibus ornare suspendisse sed nisi lacus. Scelerisque varius morbi enim nunc faucibus a. Neque aliquam vestibulum morbi blandit cursus risus at ultrices mi. Commodo sed egestas egestas fringilla. Feugiat sed lectus vestibulum mattis ullamcorper. Imperdiet proin fermentum leo vel orci.</p><p>Laoreet sit amet cursus sit amet. Et ultrices neque ornare aenean euismod elementum. Tristique senectus et netus et malesuada fames ac. Sagittis aliquam malesuada bibendum arcu vitae. Volutpat est velit egestas dui id ornare arcu odio. Enim facilisis gravida neque convallis a. Sit amet mauris commodo quis imperdiet massa. Tortor dignissim convallis aenean et tortor. Viverra ipsum nunc aliquet bibendum enim facilisis. Lacinia quis vel eros donec ac odio tempor. Libero id faucibus nisl tincidunt eget. Nec feugiat in fermentum posuere urna nec tincidunt praesent.</p>' },
    { id: 2, jobRole: 'Technician', dateRange: '2009 - 2011', employer: 'Electron Dynamics ltd.', description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Viverra maecenas accumsan lacus vel facilisis volutpat est velit. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit amet. Platea dictumst quisque sagittis purus sit amet volutpat. Maecenas volutpat blandit aliquam etiam erat velit scelerisque. Purus semper eget duis at tellus at urna condimentum mattis. Elementum nisi quis eleifend quam. Euismod lacinia at quis risus sed vulputate. Tincidunt nunc pulvinar sapien et ligula. Nunc id cursus metus aliquam. Tincidunt lobortis feugiat vivamus at augue eget. Auctor neque vitae tempus quam pellentesque. Mi tempus imperdiet nulla malesuada. Laoreet suspendisse interdum consectetur libero id faucibus nisl. Sed felis eget velit aliquet sagittis id.</p>' }
];

app.get('/api/experience', (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    resp.send(experience);
});

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
        process.exit(128 + value);
    });
};

// Create a listener for each of the signals to handle
Object.keys(signals).forEach((signal) => {
    process.on(signal, () => {
        console.log(`Process received a ${signal} signal`);
        shutdown(signal, signals[signal]);
    });
});
