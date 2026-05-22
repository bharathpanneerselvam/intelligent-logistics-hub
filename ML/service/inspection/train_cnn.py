import os
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
from tensorflow.keras.preprocessing.image import ImageDataGenerator

IMAGE_SIZE = (64, 64)
BATCH_SIZE = 16
EPOCHS     = 10

base_dir = os.path.dirname(os.path.abspath(__file__))

file_path = os.path.abspath(os.path.join(
        base_dir,
        '..',
        '..',
        '..',
        'data',
        'package-images'
    ))

DATA_DIR = file_path

def train():
    print("Loading images from:", DATA_DIR)

    datagen = ImageDataGenerator(
        rescale=1.0 / 255,    
        validation_split=0.2   
    )

    train_data = datagen.flow_from_directory(
        DATA_DIR,
        target_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='binary',  
        subset='training'
    )

    val_data = datagen.flow_from_directory(
        DATA_DIR,
        target_size=IMAGE_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='binary',
        subset='validation'
    )

    print("Building CNN model...")
    model = Sequential([ 
        Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 3)),
        MaxPooling2D(2, 2),
 
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D(2, 2),
 
        Flatten(),
        Dense(64, activation='relu'),
        Dense(1, activation='sigmoid')  # 0 = damaged, 1 = undamaged
    ])

    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )

    print("Training... this may take a few minutes")
    model.fit(train_data, epochs=EPOCHS, validation_data=val_data, verbose=1)
 
    models_dir = os.path.join(os.path.dirname(__file__), '..', 'models')
    os.makedirs(models_dir, exist_ok=True)

    save_path = os.path.join(models_dir, 'cnn_model.h5')
    model.save(save_path)

    print(f"Done! Model saved to {save_path}")
    print("Class labels:", train_data.class_indices)


if __name__ == '__main__':
    train()
