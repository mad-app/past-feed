FROM buildkite/puppeteer:latest
LABEL maintainer="pdpxpd@gmail.com"

COPY ./ /work

WORKDIR /work

RUN npm i

CMD node main.js
