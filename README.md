# Some Stuff...

## Guide used for dockerising react:
`https://rsbh.dev/blogs/dockerize-react-app`

# Setup
1. Copy the rat-tv systemd service and related bin files.
```
ln -s /home/ratbox/Projects/tv/rat-tv/startup.sh /usr/local/bin/rat-tv-start
ln -s /home/ratbox/Projects/tv/rat-tv/stop.sh /usr/local/bin/rat-tv-stop
```
2. Create a systemd soft link for the rat-tv service
```
ln -s /home/ratbox/Projects/tv/rat-tv/service.service  /etc/systemd/system/rat-tv.service
```
3. Configure the startup script: Set your system to run the script startup.sh on startup. This will open firefox to your rat-tv home page once the service is ready.


### Starting the production server on `:3000`:
```
# If updating do these 2 steps
docker stop rat-tv-live-instance
sudo docker update --restart=no <container_id>

# Build new image
docker build -t rat-tv-live .
docker images

docker run --restart=always -d -p  3000:80 -e "REACT_APP_IP=192.168.16.4" rat-tv-live
```

### Start the dev server (with hot reload) `:3001`:
```
docker-compose up
```

### Start the python script for desktop control

1. Create a python venv with  
    ```
    python3 -m venv controller/py-env
    ```

2. Populate it with requirements.txt
    ```
    MouseInfo==0.1.3
    PyAutoGUI==0.9.53
    PyGetWindow==0.0.9
    PyMsgBox==1.0.9
    pyperclip==1.8.2
    PyRect==0.2.0
    PyScreeze==0.1.28
    python3-xlib==0.15
    pytweening==1.0.7
    websocket-client==1.5.1
    websockets==11.0.3
    ```
3. Active the python environment and start the desktop controller script
    ```
    source controller/py-env/bin/activate
    xhost +local:root
    python3 controller/main.py
    ```
