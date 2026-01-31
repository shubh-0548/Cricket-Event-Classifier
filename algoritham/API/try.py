import tensorflow as tf
#from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, Dense
#from sklearn.model_selection import train_test_split
import os
import cv2
#import numpy as np
#from moviepy.editor import *
# import cv2
import numpy as np

#claude version
SEQUENCE_LENGTH = 10
IMAGE_HEIGHT, IMAGE_WIDTH = 224, 224
CLASSES_LIST = ["boundry", "no_run", "runs", "wicket"]

cmodel = tf.keras.models.load_model('C:\\Users\\My Dell\\Downloads\\LRCN_model___Date_Time_2024_02_19__05_36_49___Loss_1.329925298690796___Accuracy_0.5555555820465088.h5')

def preprocess_image(img):
    img = cv2.resize(img, (224, 224))
    img = img / 255.0  # Normalize pixel values
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img

def predict_single_action(clip_frames, SEQUENCE_LENGTH):
    '''
    This function will perform single action recognition prediction on a sequence of frames using the LRCN model.
    Args:
        clip_frames: A list of frames representing the video clip.
        SEQUENCE_LENGTH: The fixed number of frames of a video that can be passed to the model as one sequence.
    '''
    # Initialize a variable to store the predicted action being performed in the video.
    predicted_class_name = ''

    # Get the number of frames in the clip.
    num_frames = len(clip_frames)

    # Calculate the interval after which frames will be added to the sequence.
    skip_frames_window = max(int(num_frames / SEQUENCE_LENGTH), 1)

    # Initialize a list to store the sequence of frames.
    frames_sequence = []

    # Iterating the number of times equal to the fixed length of sequence.
    for frame_counter in range(SEQUENCE_LENGTH):
        # Get the frame from the clip_frames list.
        frame = clip_frames[frame_counter * skip_frames_window]

        # Resize the Frame to fixed Dimensions.
        resized_frame = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))

        # Normalize the resized frame by dividing it with 255 so that each pixel value then lies between 0 and 1.
        normalized_frame = resized_frame / 255

        # Appending the pre-processed frame into the frames_sequence list.
        frames_sequence.append(normalized_frame)

    # Passing the pre-processed frames to the model and get the predicted probabilities.
    predicted_labels_probabilities = cmodel.predict(np.expand_dims(frames_sequence, axis=0))[0]

    # Get the index of class with highest probability.
    predicted_label = np.argmax(predicted_labels_probabilities)

    # Get the class name using the retrieved index.
    predicted_class_name = CLASSES_LIST[predicted_label]

    # Display the predicted action along with the prediction confidence.
    print(f'Action Predicted: {predicted_class_name}\nConfidence: {predicted_labels_probabilities[predicted_label]}')

# Load pre-trained model
model = tf.keras.models.load_model('C:\\Users\\My Dell\\Downloads\\fv_classification_model (1).h5')

# Load input video
video_path = 'C:\\Users\\My Dell\\Downloads\\Untitled video - Made with Clipchamp (4).mp4'
cap = cv2.VideoCapture(video_path)

# Initialize variables
current_clipping = []
clipping_count = 0
frame_count = 0
in_front_view_sequence = False
min_frames_threshold = 35  # Minimum number of frames required in a resultant clip
first_frame_numbers = []  # Store the first frame number for each saved clip


def save_clipping(output_path, start_frame, end_frame, fps=30):
    # Re-initialize the video capture object and set it to the start frame
    cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

    # Get dimensions of the frames
    ret, frame = cap.read()
    height, width, _ = frame.shape

    # Define codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    # Initialize a list to store the frames
    clip_frames = []

    # Write frames to the output video and store them in clip_frames
    for frame_num in range(start_frame, end_frame):
        ret, frame = cap.read()
        if ret:
            out.write(frame)
            clip_frames.append(frame)
        else:
            break

    # Release the VideoWriter object
    out.release()

    return clip_frames

# Process video frames
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Preprocess frame (resize, normalize, etc.)
    preprocessed_frame = preprocess_image(frame)

    # Perform inference
    prediction = model.predict(preprocessed_frame)
    is_front_view = prediction >= 0.6  # Assuming 0.5 as the threshold

    # Update current clipping
    if is_front_view:
        if not in_front_view_sequence:
            in_front_view_sequence = True
            current_clipping = [frame]  # Start a new clipping
            first_frame_number = frame_count  # Store the first frame number
        else:
            current_clipping.append(frame)
    else:
        if in_front_view_sequence:
            in_front_view_sequence = False
            # Save current clipping if it meets the threshold
            if len(current_clipping) >= min_frames_threshold:
                #save_clipping(f'k_{clipping_count}.mp4', current_clipping)
                first_frame_numbers.append(first_frame_number)  # Store the first frame number for the saved clip
                if len(first_frame_numbers)>=2:
                  clip_frames = save_clipping(f'k_{clipping_count}.mp4', first_frame_numbers[-2], first_frame_numbers[-1])
                  predict_single_action(clip_frames, SEQUENCE_LENGTH)
                clipping_count += 1
            current_clipping = []

    frame_count += 1  # Increment the frame count

# Release video capture object
cap.release()

# Print the first frame numbers for each saved clip
#for i, frame_number in enumerate(first_frame_numbers):
 #   print(f"Clip k_{i}.mp4 starts at frame {frame_number}")