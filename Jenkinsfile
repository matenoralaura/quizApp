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
                script {
                    echo 'Downloading kubectl...'
                    sh "curl -LO https://dl.k8s.io/release/v1.29.0/bin/linux/amd64/kubectl"
                    
                    sh "chmod +x ./kubectl"
                    
                    echo 'Deploying to K8s...'
                    withKubeConfig([credentialsId: 'k8s-local-config', serverUrl: 'https://host.docker.internal:6443']) {
                        
                        sh "./kubectl apply -f k8s/"
                        
                        sh "./kubectl rollout restart deployment/quiz-app"
                    }
                }
            }
        }
    }
}