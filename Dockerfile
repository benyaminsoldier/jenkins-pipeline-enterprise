FROM amazon/aws-cli

USER root
RUN yum install -y docker jq

ENTRYPOINT [""]

 