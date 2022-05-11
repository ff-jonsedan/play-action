import * as core from '@actions/core';
import {wait} from './wait';

async function run(): Promise<void> {
    try {

        core.setOutput('foo', 'abc123');
        core.setOutput('bar', 'def456');
        const ms: string = core.getInput('milliseconds');
        core.debug(`Waiting ${ms} milliseconds ...`); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

        core.debug(new Date().toTimeString());
        await wait(parseInt(ms, 10));
        core.debug(new Date().toTimeString());

        core.info('Info about this');
        core.warning('Warning about that');

        await core.summary
            .addHeading('Heading123')
            .addCodeBlock('{"foo":true}', "json")
            .addTable([
                [{data: 'Header1', header: true}, {data: 'Header2', header: true}],
                ['Text1', 'Pass ✅'],
                ['Text2', 'Fail ❌'],
            ])
            .addLink('View staging deployment!', 'https://github.com')
            .write();


    } catch (error) {
        if (error instanceof Error) core.setFailed(error.message);
    }
}

run();
