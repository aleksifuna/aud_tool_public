from flask import Flask
import boto3
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={"/*": {"origins": "*"}})
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('master_music_logs')

@app.route('/')
def main_dashboard():
    """ Querries dynamodb and returns results"""
    response = table.scan()

    items = response.get('Items', [])
    return items