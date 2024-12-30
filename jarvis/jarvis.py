import pyttsx3
import speech_recognition as sr
import datetime
import os
import cv2
import random
import requests
from requests import get
import webbrowser


engine = pyttsx3.init('sapi5')
voices = engine.getProperty("voices")
engine.setProperty('voice', voices[0].id)

# Text to speech
def speak(audio):
    engine.say(audio)
    print(audio)
    engine.runAndWait()

# To convert voice into text 
def takecommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("listening...")
        r.pause_threshold = 1 
        audio = r.listen(source, timeout=3, phrase_time_limit=5)

    try:
        print("recognizing...")
        query = r.recognize_google(audio, language="en-IN")
        print(f"user said: {query}")

    except Exception as e:
        speak("say that again please...")
        return "none"
    return query

# To wish
def wish():
    hour = int(datetime.datetime.now().hour)

    if hour >= 0 and hour < 12:
        speak("Good morning")
    elif hour >= 12 and hour < 18:
        speak("Good afternoon")
    else:
        speak("Good evening")
    speak("I am Jarvis. Please tell me how I can help you.")

if __name__ == "__main__":
    wish()
    
    # while loop to listen to multiple commands
    while True:
        query = takecommand().lower()

        # Logic for tasks
        if "open notepad" in query:
            npath = "C:\\Windows\\System32\\notepad.exe"
            os.startfile(npath)

        elif "Just open google chrome" in query:
            chrome_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
            os.startfile(chrome_path)

        elif "open command prompt" in query:
            os.system("start cmd")

        elif "open camera" in query:
            cap = cv2.VideoCapture(0)
            if not cap.isOpened():
                print("Error: Could not open camera.")
            else:
                width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
                height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
                print(f"Camera resolution: {width}x{height}")

                while True:
                    ret, img = cap.read()
                    if not ret:
                        print("Failed to capture image.")
                        break

                    img_resized = cv2.resize(img, (width, height))
                    cv2.imshow('webcam', img_resized)

                    # Exit loop when 'Esc' key is pressed
                    if cv2.waitKey(50) == 27:
                        break

                cap.release()
                cv2.destroyAllWindows()

        elif "play sound" in query or "start audio" in query:
            sound_path = "C:\\Users\\wach\\Downloads\\Hina ASMR\\Hina ASMR\\Hina\\01.『タイトルコール』.mp3"
            if os.path.exists(sound_path):
                os.startfile(sound_path)
            else:
                speak("Sound file not found.")

        elif "ip adress" in query:
            ip = get('http://api.ipify.org').text
            speak(f"your IP address is {ip}")
        
        elif "open youtube" in query:
            chrome_path = "C:/Program Files/Google/Chrome/Application/chrome.exe %s"
            webbrowser.get(chrome_path).open("https://www.youtube.com")

        elif "open facebook" in query:
            webbrowser.open("www.facebook.com")

        elif "open google" in query:
            speak("What should I search?")
            cm = takecommand().lower()
            chrome_path = "C:/Program Files/Google/Chrome/Application/chrome.exe %s"
            webbrowser.get(chrome_path).open(f"https://www.google.com/search?q={cm}")


        elif "stop" in query:
            speak("Stopping all operations. Goodbye!")
            break



