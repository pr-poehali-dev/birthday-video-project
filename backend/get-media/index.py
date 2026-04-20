import json
import os
import boto3

def handler(event: dict, context) -> dict:
    """Возвращает список всех загруженных фото и видео из S3."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    media_type = (event.get('queryStringParameters') or {}).get('type', 'all')

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
    )

    prefixes = []
    if media_type == 'photo':
        prefixes = ['friend-site/photo/']
    elif media_type == 'video':
        prefixes = ['friend-site/video/']
    else:
        prefixes = ['friend-site/photo/', 'friend-site/video/']

    items = []
    access_key = os.environ['AWS_ACCESS_KEY_ID']

    for prefix in prefixes:
        response = s3.list_objects_v2(Bucket='files', Prefix=prefix)
        for obj in response.get('Contents', []):
            key = obj['Key']
            cdn_url = f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"
            file_type = 'photo' if '/photo/' in key else 'video'
            items.append({
                'url': cdn_url,
                'key': key,
                'type': file_type,
                'size': obj['Size'],
                'last_modified': obj['LastModified'].isoformat(),
            })

    # Сортируем по дате загрузки (новые первыми)
    items.sort(key=lambda x: x['last_modified'], reverse=True)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'items': items, 'count': len(items)})
    }
