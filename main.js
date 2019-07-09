const { app } = require('./lib/server');

const PORT = process.env.SERVER_PORT || 3000;

async function main() {
    app.listen(PORT, () => {
        console.log(`App is running at http://localhost:${PORT}`)
    });

    console.log("  Press CTRL-C to stop\n");
}

main();
