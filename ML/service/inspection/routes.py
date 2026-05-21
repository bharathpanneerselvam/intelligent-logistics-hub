from flask import Blueprint, request, jsonify
from inspection import model as inspection_model

inspection_bp = Blueprint('inspection', __name__)

# load the CNN model once when this file is first imported
inspection_model.load()


# POST /inspect
# Content-Type: multipart/form-data
# Form key: "image"
#
# Response:
# {
#   "filename": "box.jpg",
#   "result": "damaged",
#   "confidence_percent": 94.3
# }
@inspection_bp.route('/inspect', methods=['POST'])
def inspect():

    # check image was actually uploaded
    if 'image' not in request.files:
        return jsonify({
            'error': 'No image found. Send the image with key "image"'
        }), 400

    image_file = request.files['image']

    if image_file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # run the CNN prediction
    label, confidence = inspection_model.predict(image_file)

    if label is None:
        return jsonify({'error': 'Could not read the image. Try a different file.'}), 400

    return jsonify({
        'filename':           image_file.filename,
        'result':             label,           # "damaged" or "undamaged"
        'confidence_percent': confidence        # e.g. 94.3
    })
