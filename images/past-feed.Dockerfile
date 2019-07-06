FROM buildkite/puppeteer:latest
LABEL maintainer="5pecia1 <pdpxpd@gmail.com>"

COPY ./ /work

WORKDIR /work

RUN npm i

CMD node main.js
