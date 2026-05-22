from flask import Blueprint, request, jsonify
from inspection import model as inspection_model

inspection_bp = Blueprint('inspection', __name__)

inspection_model.load()

@inspection_bp.route('/inspect', methods=['POST'])
def inspect():

    if 'image' not in request.files:
        return jsonify({
            'error': 'No image found. Send the image with key "image"'
        }), 400

    image_file = request.files['image']

    if image_file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    label, confidence = inspection_model.predict(image_file)

    if label is None:
        return jsonify({'error': 'Could not read the image. Try a different file.'}), 400

    return jsonify({
        'filename':           image_file.filename,
        'result':             label,          
        'confidence_percent': confidence        
    })
