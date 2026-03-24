FROM ubuntu:22.04
WORKDIR /app

# Zmiana na java 17, ponieważ Gradle wymaga co najmniej tej wersji

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk curl zip unzip && \
    apt-get clean


RUN bash -c "curl -s https://get.sdkman.io | bash && \
    source /root/.sdkman/bin/sdkman-init.sh && \
    sdk install kotlin && \
    sdk install gradle"

ENV PATH="/root/.sdkman/candidates/kotlin/current/bin:/root/.sdkman/candidates/gradle/current/bin:${PATH}"


RUN mkdir -p src/main/java
COPY build.gradle .
COPY Hello.java src/main/java/Hello.java

CMD ["gradle", "run"]