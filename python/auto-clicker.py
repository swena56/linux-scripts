import time
import threading
from pynput.mouse import Button, Controller
from pynput.keyboard import Listener, KeyCode

# python3 -u "auto-click.pys
delay = 0.0001
button = Button.left
increase_key = KeyCode(char='+')
decrease_key = KeyCode(char='-')
start_stop_key = KeyCode(char='s')
exit_key = KeyCode(char='e')


class ClickMouse(threading.Thread):
    def __init__(self, delay, button):
        super(ClickMouse, self).__init__()
        self.delay = delay
        self.button = button
        self.running = False
        self.program_running = True

    def start_clicking(self):
        self.running = True

    def stop_clicking(self):
        self.running = False

    def increase(self):
        self.delay = 0.001

    def decrease(self):
        self.delay = 0.101

    def exit(self):
        self.stop_clicking()
        self.program_running = False

    def run(self):
        while self.program_running:
            while self.running:
                mouse.click(self.button)
                time.sleep(self.delay)
            time.sleep(0.0001)


mouse = Controller()
click_thread = ClickMouse(delay, button)
click_thread.start()


def on_press(key):
    if key == start_stop_key:
        if click_thread.running:
            click_thread.stop_clicking()
        else:
            click_thread.start_clicking()
    elif key == increase_key:
    	click_thread.increase()
    elif key == decrease_key:
    	click_thread.decrease()
    elif key == exit_key:
        click_thread.exit()
        listener.stop()


with Listener(on_press=on_press) as listener:
    listener.join()
