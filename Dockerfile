FROM debian
RUN apt update
RUN apt install -y nano ffmpeg python3-pip python3 nodejs npm chromium
RUN pip3 install pytube pydub Google-Images-Search gtts
RUN git clone https://igiul667@github.com/igiul667/wabotd

WORKDIR /wabotd
RUN npm install mime-types venom-bot node-emoji
CMD ["bash"]
CMD ["node", "/wabotd/main.js"]