import wikipedia
import argparse
from gtts import gTTS

parser = argparse.ArgumentParser()
parser.add_argument("-c","--content",type=str)
parser.add_argument("-n","--name",type=str)
parser.add_argument("-l","--lang",type=str)
args = parser.parse_args()

wikipedia.set_lang(args.lang)
result = wikipedia.summary(args.content, sentences = 2)

tts = gTTS(text=result, lang=args.lang, slow=False)
tts.save(args.name+".mp3")