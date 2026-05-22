import os
import numpy as np
import pickle
from tensorflow.keras.models import load_model

WINDOW_SIZE = 6
 
lstm_model = None
scaler = None


def load():

    global lstm_model, scaler

    base_dir = os.path.dirname(
        os.path.abspath(__file__)
    )

    model_path = os.path.join(
        base_dir,
        '..',
        'models',
        'lstm_model.keras'
    )

    scaler_path = os.path.join(
        base_dir,
        '..',
        'models',
        'scaler.pkl'
    )

    lstm_model = load_model(
        model_path,
        compile=False
    )

    with open(scaler_path, 'rb') as f:
        scaler = pickle.load(f)

    print("LSTM model loaded successfully")


def predict(last_6_months):

    data = np.array(
        last_6_months
    ).reshape(-1, 1)

    data_scaled = scaler.transform(
        data
    ).flatten()
 
    X1 = data_scaled.reshape(
        1,
        WINDOW_SIZE,
        1
    )

    prediction1_scaled = lstm_model.predict(
        X1,
        verbose=0
    )

    prediction1 = scaler.inverse_transform(
        prediction1_scaled
    )

    next_month = round(
        float(prediction1[0][0]),
        2
    )
 
    second_input = np.append(
        data_scaled[1:],
        prediction1_scaled[0][0]
    )

    X2 = second_input.reshape(
        1,
        WINDOW_SIZE,
        1
    )

    prediction2_scaled = lstm_model.predict(
        X2,
        verbose=0
    )

    prediction2 = scaler.inverse_transform(
        prediction2_scaled
    )

    second_month = round(
        float(prediction2[0][0]),
        2
    )

    return {
        "next_month_revenue": next_month,
        "second_month_revenue": second_month
    }