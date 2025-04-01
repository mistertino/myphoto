pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build("$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG")
                    docker.withRegistry('https://your-docker-registry.com', 'docker-registry-credentials') {
                        docker.image("$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG").push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    sh "kubectl config set-cluster my-cluster --server=https://your-kubernetes-server --certificate-authority=/path/to/your/ca.crt"
                    sh "kubectl config set-credentials my-user --username=your-username --password=your-password"
                    sh "kubectl config set-context my-cluster --cluster=my-cluster --user=my-user --namespace=your-namespace"
                    sh "kubectl config use-context my-cluster"
                    sh "kubectl set image deployment/your-deployment your-container=$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG"
                }
            }
        }
    }
}
