pipeline {
    agent any

    stages {
        stage('Build & Push Docker Image') {
            steps {
                script {
                    def appImage = docker.build("manora/quiz-app:latest")

                    docker.withRegistry('https://registry.hub.docker.com', 'ca9d2070-70c8-4f90-86c2-87155da14262') {
                        appImage.push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Ready for kubernetes deployment...'
            }
        }
    }
}