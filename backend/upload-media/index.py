import json
import os
import base64
import uuid
import boto3
from datetime import datetime

def handler(event: dict, context) -> dict:
    """Загружает фото или видео в S3 хранилище для сайта подруги."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    file_data = body.get('file')        # base64 строка
    file_name = body.get('name', '')    # оригинальное имя файла
    media_type = body.get('type', 'photo')  # 'photo' или 'video'
    caption = body.get('caption', '')

    if not file_data:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Файл не передан'})
        }

    # Декодируем base64
    if ',' in file_data:
        file_data = file_data.split(',', 1)[1]
    file_bytes = base64.b64decode(file_data)

    # Определяем расширение и content-type
    ext = file_name.rsplit('.', 1)[-1].lower() if '.' in file_name else 'jpg'
    content_type_map = {
        'jpg': 'image/jpeg', 'jpeg': 'image/jpeg',
        'png': 'image/png', 'gif': 'image/gif', 'webp': 'image/webp',
        'mp4': 'video/mp4', 'mov': 'video/quicktime', 'webm': 'video/webm',
    }
    content_type = content_type_map.get(ext, 'application/octet-stream')

    # Уникальное имя файла
    unique_id = str(uuid.uuid4())[:8]
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    key = f"friend-site/{media_type}/{timestamp}_{unique_id}.{ext}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    s3.put_object(
        Bucket='files',
        Key=key,
        Body=file_bytes,
        ContentType=content_type,
    )

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'url': cdn_url,
            'key': key,
            'type': media_type,
            'caption': caption,
        })
    }
