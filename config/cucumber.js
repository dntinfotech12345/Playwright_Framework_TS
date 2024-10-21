module.exports = {
    //default is to override the cucumber default features like snippites
    default: { 
        tags: process.env.npm_config_TAGS || "",
        //to get the snippet option in the formate of async and await
        formatOptions: {
            snippetInterface: "async-await"
        },
        //we have give path to locate our fetaure 
        paths: [
            "src/test/features/doglus.feature" 
        ],
        //to desable the cloud default report of cucumber
        publishQuiet: true, 
        dryRun: false,
        //here we have kept out steps and hooks file path
        require: [
            "src/test/steps/*.ts",
            "src/hooks/hooks.ts"
        ],
        //this required to avoid the errors for the imports statements for ts
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 1
    },
    rerun: {
        formatOptions: {
            snippetInterface: "async-await"
        },
        publishQuiet: true,
        dryRun: false,
        require: [
            "src/test/steps/*.ts",
            "src/hooks/hooks.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt"
        ],
        parallel: 2
    }
}