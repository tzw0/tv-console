import os
os.environ['DISPLAY'] = ':0'
os.environ['XAUTHORITY']='/run/user/1000/gdm/Xauthority'

import pyautogui
import websockets
import asyncio
import time

async def handler(websocket, path):
    fullscreen_toggle = False
    while True:
        try:
            data = await websocket.recv()
        except websockets.exceptions.ConnectionClosedOK as e:
            print("disconnected from keyboard ws")
            return

        if len(data) == 1:
            pyautogui.write(data)
        elif data == "Backspace":
            pyautogui.write("\b")
        elif data == "Enter":
            pyautogui.write("\n")
        elif data.startswith("*paste*"):
            pyautogui.write(data.lstrip("*paste*"))
        elif data.startswith("*raw-command*"):
            command = data.lstrip("*raw-command*")
            if "fullscreen" in command:
                if fullscreen_toggle:
                    pyautogui.press("esc", _pause=False)
                else:
                    pyautogui.press("f", _pause=False)
                # time.sleep(0.1)
                # pyautogui.press("f11", _pause=False)
                fullscreen_toggle = not fullscreen_toggle
                continue

            keys = command.split("+")
            print("processing command:", keys)
            
            if len(keys) == 1 or (len(keys)==2 and keys[0]==""):
                key = keys[0]
                if len(keys) == 2:
                    key = keys[1]
                pyautogui.press(key, _pause=False)
                continue
            for key in keys:
                if key == "":
                    continue
                pyautogui.keyDown(key, _pause=False)
            for key in keys[::-1]:
                if key == "":
                    continue
                pyautogui.keyUp(key, _pause=False)

        elif data.startswith("*raw_press*"):
            pyautogui.press(data.lstrip("*raw_press*"))
        else:
            print("\nUNRECOGNISED COMMAND:", data)
    



async def handlerMouse(websocket, path):
    last_movement_millis = 0
    speed_magnitude = 0.1
    scroll_magnitude = 1
    max_x, max_y = pyautogui.size()
    print(f"connected to client!")
    while True:
        try:
            data = await websocket.recv()
        except websockets.exceptions.ConnectionClosedOK as e:
            print("disconnected from keyboard ws")
            return

        coord = data.split(",")
        x, y, gtype = 0.1, 0.1, 0
        if len(coord) == 3:
            x, y, gtype = \
                float(coord[0])*speed_magnitude,\
                float(coord[1])*speed_magnitude, int(coord[2])
        if len(coord) == 3 and gtype == 2:
            print("scroll", "{:.2f}".format(x), "{:.2f}".format(
                y), ", type:", gtype, ", scroll_mag:", scroll_magnitude)
            if abs(y) >= abs(x):
                pyautogui.scroll(y*scroll_magnitude, _pause=False)
            else:
                pyautogui.hscroll(x*scroll_magnitude, _pause=False)
        elif len(coord) == 3 and gtype == 1:
            start_x, start_y = pyautogui.position()
            end_x, end_y = start_x+x, start_y+y
            if pyautogui.onScreen(end_x, end_y):
                print("move", "{:.2f}".format(x), "{:.2f}".format(
                    y), ", type:", gtype, ", speed_mag:", "{:.4f}".format(speed_magnitude))
                pyautogui.move(x, y, _pause=False)
                now_millis = round(time.time()*1000)
                if last_movement_millis + 30 > now_millis and speed_magnitude < 0.5:
                    speed_magnitude += 0.0005
                else:
                    speed_magnitude = 0.1
                last_movement_millis = now_millis
            else:
                print(x, y, "out of bounds")

            continue
        elif data == "left-click":
            pyautogui.click()
            print("left-click")
        elif data == "right-click":
            print("right-click")
            pyautogui.click(button="right")

print("start server on 8000 and 8001")
start_server = websockets.serve(handler, "192.168.18.2", 8000)
start_server_mouse = websockets.serve(handlerMouse, "192.168.18.2", 8001)


asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_until_complete(start_server_mouse)
asyncio.get_event_loop().run_forever()