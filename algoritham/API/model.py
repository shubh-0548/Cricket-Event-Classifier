
# from tensorflow.keras.models import load_model


# import numpy as np
# import cv2

# def load_action_model(model_path):
#     return load_model(model_path)

# def predict_single_action(model, video_file_path, SEQUENCE_LENGTH, IMAGE_HEIGHT, IMAGE_WIDTH, CLASSES_LIST):
#     video_reader = cv2.VideoCapture(video_file_path)
#     original_video_width = int(video_reader.get(cv2.CAP_PROP_FRAME_WIDTH))
#     original_video_height = int(video_reader.get(cv2.CAP_PROP_FRAME_HEIGHT))
#     frames_list = []
#     predicted_class_name = ''
#     video_frames_count = int(video_reader.get(cv2.CAP_PROP_FRAME_COUNT))
#     skip_frames_window = max(int(video_frames_count/SEQUENCE_LENGTH), 1)

#     for frame_counter in range(SEQUENCE_LENGTH):
#         video_reader.set(cv2.CAP_PROP_POS_FRAMES, frame_counter * skip_frames_window)
#         success, frame = video_reader.read()
#         if not success:
#             break
#         resized_frame = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))
#         normalized_frame = resized_frame / 255
#         frames_list.append(normalized_frame)

#     predicted_labels_probabilities = model.predict(np.expand_dims(frames_list, axis=0))[0]
#     predicted_label = np.argmax(predicted_labels_probabilities)
#     predicted_class_name = CLASSES_LIST[predicted_label]

#     video_reader.release()

#     return {'predicted_class': predicted_class_name, 'confidence': float(predicted_labels_probabilities[predicted_label])}

# if __name__ == "__main__":
#     input_video_file_path = 'F:\\mini\\new2\\cropped_data\\runs\\V1-0003_ball21665001.mp4'
#     SEQUENCE_LENGTH = 10
#     IMAGE_HEIGHT, IMAGE_WIDTH = 224, 224
#     CLASSES_LIST = ["boundary", "no_run", "runs", "wicket"]

#     model_path = 'C:\\Users\\My Dell\\Downloads\\LRCN_model___Date_Time_2024_02_19__05_36_49___Loss_1.329925298690796___Accuracy_0.5555555820465088.h5'
#     model = load_action_model(model_path)

#     prediction_result = predict_single_action(model, input_video_file_path, SEQUENCE_LENGTH, IMAGE_HEIGHT, IMAGE_WIDTH, CLASSES_LIST)
#     print(prediction_result)



# # model.py
# import sys
# import cv2
# import numpy as np
# import tensorflow as tf
# from moviepy.video.io.VideoFileClip import VideoFileClip

# SEQUENCE_LENGTH = 10
# IMAGE_HEIGHT, IMAGE_WIDTH = 224, 224
# CLASSES_LIST = ["boundry", "no_run", "runs", "wicket"]

# # Load the LRCN model
# cmodel = tf.keras.models.load_model('F:\\mini\\new2\\algoritham\\API\\LRCN_model___Date_Time_2024_02_19__05_36_49___Loss_1.329925298690796___Accuracy_0.5555555820465088.h5')
# fv_model = tf.keras.models.load_model('F:\\mini\\new2\\algoritham\\API\\fv_classification_model (1).h5')

# def preprocess_image(img):
#     img = cv2.resize(img, (224, 224))
#     img = img / 255.0  # Normalize pixel values
#     img = np.expand_dims(img, axis=0)  # Add batch dimension
#     return img

# def predict_single_action(clip_frames, SEQUENCE_LENGTH):
#     predicted_class_name = ''
#     num_frames = len(clip_frames)
#     skip_frames_window = max(int(num_frames / SEQUENCE_LENGTH), 1)
#     frames_sequence = []

#     for frame_counter in range(SEQUENCE_LENGTH):
#         frame = clip_frames[frame_counter * skip_frames_window]
#         resized_frame = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))
#         normalized_frame = resized_frame / 255
#         frames_sequence.append(normalized_frame)

#     predicted_labels_probabilities = cmodel.predict(np.expand_dims(frames_sequence, axis=0))[0]
#     predicted_label = np.argmax(predicted_labels_probabilities)
#     predicted_class_name = CLASSES_LIST[predicted_label]

#     return(predicted_class_name)

# def predict_front_view(clip_frames):
#     prediction = fv_model.predict(clip_frames)
#     return prediction >= 0.6
    
# def extract_clip(input_video, output_video, start_frame, end_frame):
#     # Load the input video
#     video_clip = VideoFileClip(input_video)

#     # Calculate start and end times based on frame numbers
#     fps = video_clip.fps
#     start_time = start_frame / fps
#     end_time = end_frame / fps

#     # Extract the clip
#     clipped_video = video_clip.subclip(start_time, end_time)

#     # Write the clipped video with audio
#     clipped_video.write_videofile(output_video, codec='libx264', audio_codec='aac')

#     # Close the video clip object
#     video_clip.close()

# def get_clipping(start_frame, end_frame, fps=30):
#     cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)
#     ret, frame = cap.read()
#     height, width, _ = frame.shape
#     # fourcc = cv2.VideoWriter_fourcc(*'mp4v')
#     # out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
#     clip_frames = []

#     for frame_num in range(start_frame, end_frame):
#         ret, frame = cap.read()
#         if ret:
#             #out.write(frame)
#             clip_frames.append(frame)
#         else:
#             break

#     #out.release()
#     return clip_frames

# if __name__ == "__main__":
#     # Check if the video file path is provided as an argument
#     if len(sys.argv) < 2:
#         print("Error: Please provide the video file path as an argument.")
#         sys.exit(1)

#     # Get the video file path from command-line arguments
#     video_path = sys.argv[1]

#     # Load the input video
#     cap = cv2.VideoCapture(video_path)

#     # Initialize variables
#     current_clipping = []
#     clipping_count = 0
#     frame_count = 0
#     in_front_view_sequence = False
#     min_frames_threshold = 35  # Minimum number of frames required in a resultant clip
#     first_frame_numbers = []  # Store the first frame number for each saved clip

#     # Process video frames
#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break

#         # Preprocess frame (resize, normalize, etc.)
#         preprocessed_frame = preprocess_image(frame)

#         # Perform inference
#         prediction = predict_front_view(preprocessed_frame)
#         is_front_view = prediction

#         if is_front_view:
#             if not in_front_view_sequence:
#                 in_front_view_sequence = True
#                 current_clipping = [frame]
#                 first_frame_number = frame_count
#             else:
#                 current_clipping.append(frame)
#         else:
#             if in_front_view_sequence:
#                 in_front_view_sequence = False
#                 if len(current_clipping) >= min_frames_threshold:
#                     first_frame_numbers.append(first_frame_number)
#                     if len(first_frame_numbers) >= 2:
#                         clip_frames = get_clipping(first_frame_numbers[-2], first_frame_numbers[-1])
#                         pred = predict_single_action(clip_frames, SEQUENCE_LENGTH)
#                         out_path = f'F:\\mini\\new2\\backend\\{pred}\\mini_{clipping_count}.mp4'
#                         extract_clip(video_path, out_path, first_frame_numbers[-2], first_frame_numbers[-1])
#                         print(pred)  # Return output to the Node.js script
#                     clipping_count += 1
#                 current_clipping = []

#         frame_count += 1

#     # Release video capture object
#     cap.release()




# original code begins


# model.py
import sys
import cv2
import numpy as np
import tensorflow as tf
from moviepy.video.io.VideoFileClip import VideoFileClip
import shutil


SEQUENCE_LENGTH = 10
IMAGE_HEIGHT, IMAGE_WIDTH = 224, 224
CLASSES_LIST = ["boundry", "no_run", "runs", "wicket"]

# Load the LRCN model
cmodel = tf.keras.models.load_model('F:\\mini\\new2\\algoritham\\API\\LRCN_model___Date_Time_2024_02_19__05_36_49___Loss_1.329925298690796___Accuracy_0.5555555820465088.h5')
fv_model = tf.keras.models.load_model('F:\\mini\\new2\\algoritham\\API\\fv_classification_model (1).h5')

def preprocess_image(img):
    img = cv2.resize(img, (224, 224))
    img = img / 255.0  # Normalize pixel values
    img = np.expand_dims(img, axis=0)  # Add batch dimension
    return img


def copy_video(video_path, output_folder):
    try:
        shutil.copy(video_path, output_folder)
        #print(f"Successfully copied {video_path} to {output_folder}")
    except Exception as e:
        print(f"Error occurred: {e}")
                                 

def predict_single_action(clip_frames, SEQUENCE_LENGTH):
    predicted_class_name = ''
    num_frames = len(clip_frames)
    skip_frames_window = max(int(num_frames / SEQUENCE_LENGTH), 1)
    frames_sequence = []

    for frame_counter in range(SEQUENCE_LENGTH):
        frame = clip_frames[frame_counter * skip_frames_window]
        resized_frame = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))
        normalized_frame = resized_frame / 255
        frames_sequence.append(normalized_frame)

    predicted_labels_probabilities = cmodel.predict(np.expand_dims(frames_sequence, axis=0))[0]
    predicted_label = np.argmax(predicted_labels_probabilities)
    predicted_class_name = CLASSES_LIST[predicted_label]

    return(predicted_class_name)

def predict_front_view(clip_frames):
    prediction = fv_model.predict(clip_frames)
    return prediction >= 0.6
    
# def extract_clip(input_video, output_video, start_frame, end_frame):
#     # Load the input video
#     video_clip = VideoFileClip(input_video)

#     # Calculate start and end times based on frame numbers
#     fps = video_clip.fps
#     start_time = start_frame / fps
#     end_time = end_frame / fps

#     # Extract the clip
#     clipped_video = video_clip.subclip(start_time, end_time)

#     # Write the clipped video with audio
#     clipped_video.write_videofile(output_video, codec='libx264', audio_codec='aac')

#     # Close the video clip object
#     video_clip.close()
#     copy_video(output_video, 'F:\\mini\\new2\\backend\\output')


def extract_clip(input_video, output_video, start_frame, end_frame):
    # Load the input video
    video_clip = VideoFileClip(input_video)

    # Calculate start and end times based on frame numbers
    fps = video_clip.fps
    start_time = start_frame / fps
    end_time = end_frame / fps

    # Extract the clip
    clipped_video = video_clip.subclip(start_time, end_time)

    # Write the clipped video with audio
    clipped_video.write_videofile(output_video, codec='libx264', audio_codec='aac')

    # Close the video clip object
    video_clip.close()
    copy_video(output_video, 'F:\\mini\\new2\\backend\\output')


def get_clipping(start_frame, end_frame, fps=30):
    cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)
    ret, frame = cap.read()
    height, width, _ = frame.shape
    # fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    # out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    clip_frames = []

    for frame_num in range(start_frame, end_frame):
        ret, frame = cap.read()
        if ret:
            #out.write(frame)
            clip_frames.append(frame)
        else:
            break

    #out.release()
    return clip_frames

if __name__ == "__main__":
    # Check if the video file path is provided as an argument
    if len(sys.argv) < 2:
        print("Error: Please provide the video file path as an argument.")
        sys.exit(1)

    # Get the video file path from command-line arguments
    video_path = sys.argv[1]

    # Load the input video
    cap = cv2.VideoCapture(video_path)

    # Initialize variables
    current_clipping = []
    clipping_count = 0
    frame_count = 0
    in_front_view_sequence = False
    min_frames_threshold = 35  # Minimum number of frames required in a resultant clip
    first_frame_numbers = []  # Store the first frame number for each saved clip

    # original_stdout=sys.stdout
    # sys.stdout=open('NULL','w')

    # Process video frames
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # Preprocess frame (resize, normalize, etc.)
        preprocessed_frame = preprocess_image(frame)

        # Perform inference
        prediction = predict_front_view(preprocessed_frame)
        is_front_view = prediction

        if is_front_view:
            if not in_front_view_sequence:
                in_front_view_sequence = True
                current_clipping = [frame]
                first_frame_number = frame_count
            else:
                current_clipping.append(frame)
        else:
            if in_front_view_sequence:
                in_front_view_sequence = False
                if len(current_clipping) >= min_frames_threshold:
                    first_frame_numbers.append(first_frame_number)
                    if len(first_frame_numbers) >= 2:
                        clip_frames = get_clipping(first_frame_numbers[-2], first_frame_numbers[-1])
                        pred = predict_single_action(clip_frames, SEQUENCE_LENGTH)
                        print(f"Prediction:{pred}")  # Print prediction with a unique identifier
                        out_path = f'F:\\mini\\new2\\backend\\{pred}\\mini_{clipping_count}.mp4'
                        extract_clip(video_path, out_path, first_frame_numbers[-2], first_frame_numbers[-1])
                        # sys.stdout=original_stdout
                        #print(pred)  # Return output to the Node.js script
                        # sys.stdout=open('NULL','w')
                        print(f"PREDICTION: {pred}")  # Print prediction with a unique identifier
                    clipping_count += 1
                current_clipping = []

        frame_count += 1

    # Release video capture object
    cap.release()
    # sys.stdout=original_stdout

#original code ends



# test code 1
