# Copy the files from the dist to the container
FROM nginx:stable
COPY dist/web /usr/share/nginx/html

# Copy the config
COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl/certificate.crt /etc/nginx/certs/
COPY ssl/private.key /etc/nginx/certs/
