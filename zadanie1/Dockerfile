FROM ubuntu:22.04
WORKDIR /app

RUN apt-get update && \
    apt-get install -y openjdk-8-jdk curl zip unzip && \
    apt-get clean


RUN bash -c "curl -s https://get.sdkman.io | bash && \
    source /root/.sdkman/bin/sdkman-init.sh && \
    sdk install kotlin && \
    sdk install gradle"

COPY build.gradle .

CMD ["/bin/bash"]