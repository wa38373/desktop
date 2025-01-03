from flask import Flask, request, jsonify
import pyttsx3
import speech_recognition as sr
import datetime
import os
import webbrowser
import threading

app = Flask(__name__)

# Initialize Text-to-Speech engine
engine = pyttsx3.init('sapi5')
voices = engine.getProperty("voices")
engine.setProperty('voice', voices[0].id)

# Speak a message
def speak(audio):
    engine.say(audio)
    print(audio)
    engine.runAndWait()

# Convert voice input to text
def takecommand():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        r.pause_threshold = 1
        try:
            audio = r.listen(source, timeout=3, phrase_time_limit=5)
            print("Recognizing...")
            query = r.recognize_google(audio, language="en-IN")
            print(f"User said: {query}")
            return query
        except Exception as e:
            speak("Say that again, please...")
            return "none"

# Wish the user based on the time of day
def wish():
    hour = int(datetime.datetime.now().hour)
    if 0 <= hour < 12:
        speak("Good morning!")
    elif 12 <= hour < 18:
        speak("Good afternoon!")
    else:
        speak("Good evening!")
    speak("I am Jarvis. Please tell me how I can help you.")

# Main assistant logic
def jarvis():
    wish()
    while True:
        query = takecommand().lower()
        if "open notepad" in query:
            os.startfile("C:\\Windows\\System32\\notepad.exe")
        elif "open google" in query:
            speak("What should I search for?")
            cm = takecommand().lower()
            webbrowser.open(f"https://www.google.com/search?q={cm}")
        elif "stop" in query:
            speak("Goodbye!")
            break
        else:
            speak("Sorry, I didn't understand that.")

# API endpoint to start Jarvis
@app.route('/start_jarvis', methods=['POST'])
def start_jarvis():
    threading.Thread(target=jarvis).start()  # Run Jarvis in a separate thread
    return jsonify({"status": "Jarvis started"})

# Run the Flask server
if __name__ == "__main__":
    app.run(debug=True)
