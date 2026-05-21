import os
import numpy as np
import cv2
from tensorflow.keras.models import load_model

# -------------------------------------------------------
# Loaded ONCE when Flask starts.
# The route calls predict() on every POST /inspect request.
# -------------------------------------------------------

cnn_model = None


def load():
    global cnn_model

    # path to saved model — relative to ml-service root
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
    # read the uploaded image bytes
    file_bytes = np.frombuffer(image_file.read(), np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    if image is None:
        return None, None

    # resize to 64x64 — same size used during training
    image = cv2.resize(image, (64, 64))

    # normalize pixels to [0, 1]
    image = image / 255.0

    # add batch dimension: (64, 64, 3) → (1, 64, 64, 3)
    image = np.expand_dims(image, axis=0)

    # predict — returns a number between 0.0 and 1.0
    result = cnn_model.predict(image)
    confidence = float(result[0][0])

    # 0 = damaged, 1 = undamaged
    if confidence < 0.5:
        label = 'damaged'
        score = round((1 - confidence) * 100, 1)
    else:
        label = 'undamaged'
        score = round(confidence * 100, 1)

    return label, score
