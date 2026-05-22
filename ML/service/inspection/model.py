import os
import numpy as np
import cv2
from tensorflow.keras.models import load_model

cnn_model = None


def load():
    global cnn_model 
    model_path = os.path.join(
        os.path.dirname(__file__), '..', 'models', 'cnn_model.h5'
    )

    if not os.path.exists(model_path):
        raise FileNotFoundError(
            f"Model not found at {model_path}. "
            "Please run: python inspection/train_cnn.py"
        )

    cnn_model = load_model(model_path)
    print("CNN model loaded successfully")


def predict(image_file):
 
    file_bytes = np.frombuffer(image_file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    if image is None:
        return None, None

    image = cv2.resize(image, (64, 64))

    image = image / 255.0

    image = np.expand_dims(image, axis=0)

    result = cnn_model.predict(image)
    confidence = float(result[0][0])

    if confidence < 0.5:
        label = 'damaged'
        score = round((1 - confidence) * 100, 1)
    else:
        label = 'undamaged'
        score = round(confidence * 100, 1)

    return label, score
