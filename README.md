# Some Stuff...

## Guide used for dockerising react:
`https://rsbh.dev/blogs/dockerize-react-app`

### Starting the production server on `:3000`:
```
docker build -t rat-tv-live .
docker images
docker run --restart=always -p 3000:80 rat-tv-live
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