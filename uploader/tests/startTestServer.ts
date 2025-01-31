import {spawn} from "child_process";

export default function(env: {}) {
    const testServer = spawn("yarn", ['startTestServer'], {
        env: {
            ...process.env,
            ...env
        },
        cwd: __dirname + "/..",
    });

    /*process.stdout.on('data', (data) => {
        console.log(data.toString());
    });*/
    testServer.stderr.on('data', (data) => {
        console.warn(data.toString());
    });
    testServer.on('error', (err) => {
        console.error('Failed to start subprocess.', err);
    });
    return testServer;
    /*return fork("tests/testServer.ts", {
        execArgv: ["yarn"],
        env: env
    })*/
}
