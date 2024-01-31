from openai import OpenAI

client = OpenAI(api_key='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')

def transcribe():
    media_file_path = 'flask-server/ben_andrew.caf.m4a'
    media_file = open(media_file_path, 'rb')
    
    text = client.audio.transcriptions.create(
        model = "whisper-1",
        file = media_file,
        response_format="text"
    )
    return text

def generate_summary(text):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant. Talking directly to the user"},
            {"role": "user", "content": f"Given some context of a person, can you give me a summary about them? More specifically, my relationship with them as well: {text}"}
            ]
    )
    content_section = response.choices[0].message.content
    return content_section
    
def generate_questions(text):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant. Talking directly to the user"},
            {"role": "user", "content": f"Given some context of a person, can you give me some questions to ask them?:{text}"}
            ]
    )
    content_section = response.choices[0].message.content
    return content_section

