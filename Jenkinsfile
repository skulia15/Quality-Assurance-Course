node {
    def git = checkout scm

    // Wipe out all the files that have not been git added to our repository 
    // and remove all changes that might have been made to the files that git is tracking
    stage("Clean") {
        echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'
        sh "git clean -dfxq"
        sh "git stash"
    }

    // Install our project dependencies, in our case we only have to install our npm packages.
    stage("Setup") {
        sh "cd game-api ; npm install"
    }

    stage("Lint") {
        sh "cd game-api ; npm run eslint"
    }

    stage("Build") {
        echo "${git.GIT_COMMIT}"
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }

    stage("Test") {
        sh "cd game-api ; npm run test:unit"
    }
    
    // build job: 'Deployment stage', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]
}