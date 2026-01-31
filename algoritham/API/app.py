# from flask import Flask, request, jsonify
# from model import load_action_model, predict_single_action

# app = Flask(__name__)

# model_path = 'C:\\Users\\My Dell\\Downloads\\LRCN_model___Date_Time_2024_02_19__05_36_49___Loss_1.329925298690796___Accuracy_0.5555555820465088.h5'
# model = load_action_model(model_path)

# SEQUENCE_LENGTH = 10
# IMAGE_HEIGHT, IMAGE_WIDTH = 224, 224
# CLASSES_LIST = ["boundary", "no_run", "runs", "wicket"]

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     video_path = data.get('video_path')

#     prediction_result = predict_single_action(model, video_path, SEQUENCE_LENGTH, IMAGE_HEIGHT, IMAGE_WIDTH, CLASSES_LIST)

#     return jsonify(prediction_result)

# if __name__  == '__main__':
#     app.run(port=5000)


# app.py

from flask import Flask, request, jsonify
from model import predict_action

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    print("Received request")
    if 'video' not in request.files:
        return jsonify({'error': 'No video file found'}), 400
    
    video_file = request.files['video']
    clip_frames = [cv2.imdecode(np.fromstring(video_file.read(), np.uint8), cv2.IMREAD_UNCHANGED)]
    
    action_label, confidence = predict_action(clip_frames)
    
    print("Prediction:", action_label, confidence)
    
    return jsonify({'action_label': action_label, 'confidence': confidence}), 200

if __name__ == '__main__':
    app.run(debug=True)
