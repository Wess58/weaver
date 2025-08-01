# Copy the files from the dist to the container
FROM nginx:stable
COPY dist/web/browser /usr/share/nginx/html

# Copy the config
COPY nginx.conf /etc/nginx/nginx.conf
# ng build && sudo docker build -t kitunda/weaverweb:1.0.0 . && sudo docker push kitunda/weaverweb:1.0.0
