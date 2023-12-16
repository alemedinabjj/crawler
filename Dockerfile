FROM node:21-alpine3.17

# Instalação de dependências necessárias para o Puppeteer e outras dependências
RUN apk update && apk add \
  udev \
  ttf-freefont \
  chromium \
  nss \
  freetype \
  freetype-dev \
  harfbuzz \
  ca-certificates \
  fontconfig

# Configuração do Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Set env variables
ENV GMAIL_USER=alesurf13@gmail.com
ENV GMAIL_PASS="nuxd iqnl jlbt fcrq"

# Bundle app source
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "run", "start"]
