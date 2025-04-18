pipeline {
    agent any

        environment{
        AWS_DEFAULT_REGION = 'us-east-2'
        AWS_DOCKER_REGISTRY = '311141540042.dkr.ecr.us-west-2.amazonaws.com'
        APP_NAME = 'project-image'
    }

    stages {
        stage('Build') {
            agent{
                docker{
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm install
                    npm run build
                    ls -la
                '''  
            }
        }

        stage('Test') {
            agent{
                docker{
                    image 'node:22.14.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    test -f build/index.html
                    npm test

                '''  
            }
        }


        stage('Build My Docker Image'){
            agent {
                docker {
                    image 'amazon/aws-cli'
                    reuseNode true
                    args '-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""'
                }
            }
            steps{
                 withCredentials([usernamePassword(credentialsId: 'project-user', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) 
                { 
                    sh '''
                        amazon-linux-extras install docker
                        docker build -t $AWS_DOCKER_REGISTRY/$APP_NAME .
                        aws ecr get-login-password | docker login --username AWS --password-stdin $AWS_DOCKER_REGISTRY
                        docker push $AWS_DOCKER_REGISTRY/$APP_NAME:latest
                    '''
                }
            }
        }

        // stage('Deploy to AWS') {
        //     agent {
        //         docker {
        //             image 'amazon/aws-cli'
        //             reuseNode true
        //             args '-u root --entrypoint=""'
        //         }
        //     }
            
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'demo-credentials', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) 
        //         {   
        //             sh '''
        //                 aws --version
        //                 yum install jq -y
                        
        //                 LATEST_TD_REVISION=$(aws ecs register-task-definition --cli-input-json file://aws/task-definition.json | jq '.taskDefinition.revision')
        //                 aws ecs update-service --cluster my-new-Cluster-Prod --service my-new-Service-Prod --task-definition my-new-TaskDefinition-Prod:$LATEST_TD_REVISION
        //             '''
        //         }
        //     }
        // }
    }  
}
