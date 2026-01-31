# -*- coding: utf-8 -*-
"""
Created on Tue Nov 17 21:40:41 2020

@author: win10
"""

# 1. Library imports
import uvicorn
from fastapi import FastAPI

from BankNotes import BankNote
from tensorflow.keras.models import load_model
import numpy as np
#from moviepy.editor import *
import cv2
import pandas as pd
# 2. Create the app object
app = FastAPI()
model = load_model("C:\\Users\\My Dell\\Downloads\\LRCN_model___Date_Time_2024_02_19__05_36_49___Loss_1.329925298690796___Accuracy_0.5555555820465088.h5")

# 3. Index route, opens automatically on http://127.0.0.1:8000
@app.get('/')
def index():
    return {'message': 'Hello, World'}

# 4. Route with a single parameter, returns the parameter within a message
#    Located at: http://127.0.0.1:8000/AnyNameHere
@app.get('/{name}')
def get_name(name: str):
    return {'Welcome To Krish Youtube Channel': f'{name}'}

# 3. Expose the prediction functionality, make a prediction from the passed
#    JSON data and return the predicted Bank Note with the confidence
@app.post('/predict')
def predict_banknote(data:BankNote):
    data = data.dict()
   # print(classifier.predict([[variance,skewness,curtosis,entropy]]))
    input_video_file_path = "C:\\Users\\My Dell\\Downloads\\V1-0007_ball27765001.mp4"
    SEQUENCE_LENGTH=10
    IMAGE_HEIGHT , IMAGE_WIDTH = 224, 224
    CLASSES_LIST = ["boundry", "no_run", "runs", "wicket"]
    def predict_single_action(video_file_path, SEQUENCE_LENGTH):
        '''
        This function will perform single action recognition prediction on a video using the LRCN model.
        Args:
        video_file_path:  The path of the video stored in the disk on which the action recognition is to be performed.
        SEQUENCE_LENGTH:  The fixed number of frames of a video that can be passed to the model as one sequence.
        '''

        # Initialize the VideoCapture object to read from the video file.
        video_reader = cv2.VideoCapture(video_file_path)

        # Get the width and height of the video.
        original_video_width = int(video_reader.get(cv2.CAP_PROP_FRAME_WIDTH))
        original_video_height = int(video_reader.get(cv2.CAP_PROP_FRAME_HEIGHT))

        # Declare a list to store video frames we will extract.
        frames_list = []

        # Initialize a variable to store the predicted action being performed in the video.
        predicted_class_name = ''

        # Get the number of frames in the video.
        video_frames_count = int(video_reader.get(cv2.CAP_PROP_FRAME_COUNT))

        # Calculate the interval after which frames will be added to the list.
        skip_frames_window = max(int(video_frames_count/SEQUENCE_LENGTH),1)

        # Iterating the number of times equal to the fixed length of sequence.
        for frame_counter in range(SEQUENCE_LENGTH):

            # Set the current frame position of the video.
            video_reader.set(cv2.CAP_PROP_POS_FRAMES, frame_counter * skip_frames_window)

            # Read a frame.
            success, frame = video_reader.read()

            # Check if frame is not read properly then break the loop.
            if not success:
                break

            # Resize the Frame to fixed Dimensions.
            resized_frame = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))

            # Normalize the resized frame by dividing it with 255 so that each pixel value then lies between 0 and 1.
            normalized_frame = resized_frame / 255

            # Appending the pre-processed frame into the frames list
            frames_list.append(normalized_frame)

        # Passing the  pre-processed frames to the model and get the predicted probabilities.
        predicted_labels_probabilities = model.predict(np.expand_dims(frames_list, axis = 0))[0]

        # Get the index of class with highest probability.
        predicted_label = np.argmax(predicted_labels_probabilities)

        # Get the class name using the retrieved index.
        predicted_class_name = CLASSES_LIST[predicted_label]

        # Display the predicted action along with the prediction confidence.
        prediction = predicted_class_name

        # Release the VideoCapture object.
        video_reader.release()

    # Perform Single Prediction on the Test Video.
    predict_single_action(input_video_file_path, SEQUENCE_LENGTH)

    # Display the input video.
    #VideoFileClip(input_video_file_path, audio=False, target_resolution=(300,None)).ipython_display()

    return {
        'prediction': prediction
    }

# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)
    
#uvicorn app:app --reload