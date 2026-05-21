import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras import Input
from sklearn.preprocessing import MinMaxScaler
import pickle
import os


WINDOW_SIZE = 6
base_dir = os.path.dirname(os.path.abspath(__file__))

def load_and_clean_data():



    file_path = os.path.abspath(os.path.join(
        base_dir,
        '..',
        '..',
        '..',
        'data',
        'cleaned_sales.csv'
    ))

    print("Looking for CSV at:", file_path)

    if not os.path.exists(file_path):
        raise FileNotFoundError(
            f"CSV file not found at: {file_path}"
        )

    df = pd.read_csv(file_path)

    # revenue = amount
    revenue = (df['quantity'] * df['price']).values.astype(float)

    return revenue


def create_sequences(data, window_size=WINDOW_SIZE):

    X = []
    y = []

    for i in range(len(data) - window_size):

        X.append(data[i:i + window_size])

        y.append(data[i + window_size])

    return np.array(X), np.array(y)


def train():

    print("Loading data...")

    revenue = load_and_clean_data()

    scaler = MinMaxScaler()

    revenue_scaled = scaler.fit_transform(
        revenue.reshape(-1, 1)
    ).flatten()

    print("Creating sequences...")

    X, y = create_sequences(
        revenue_scaled,
        window_size=WINDOW_SIZE
    )

    X = X.reshape(
        (X.shape[0], X.shape[1], 1)
    )

    print("Building LSTM model...")

    model = Sequential([
        Input(shape=(WINDOW_SIZE, 1)),
        LSTM(50, activation='relu'),
        Dense(1)
    ])

    model.compile(
        optimizer='adam',
        loss='mse'
    )

    print("Training model...")

    model.fit(
        X,
        y,
        epochs=30,
        batch_size=8,
        verbose=1
    )

    models_dir = os.path.abspath(os.path.join(
        base_dir,
        '..',
        'models'
    ))

    os.makedirs(models_dir, exist_ok=True)

    model_path = os.path.join(
        models_dir,
        'lstm_model.keras'
    )

    model.save(model_path)

    scaler_path = os.path.join(
        models_dir,
        'scaler.pkl'
    )

    with open(scaler_path, 'wb') as f:
        pickle.dump(scaler, f)

    print("Training complete!")
    print("Model saved successfully")


if __name__ == '__main__':
    train()