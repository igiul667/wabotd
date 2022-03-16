import pytube as pt
import argparse
from pydub import AudioSegment

parser = argparse.ArgumentParser()
parser.add_argument("-t","--titolo",type=str)
parser.add_argument("-m","--mode",type=str)
parser.add_argument("-n","--name",type=str)
args = parser.parse_args()

if "https://" in args.titolo:
    try:
        video = pt.YouTube(args.titolo)
    except:
        print("error general")
else:
    try:
        video = pt.Search(args.titolo).results[0]
    except:
        print("error searching video")

if args.mode == "video":
    video.streams.filter(type='video',file_extension='mp4').first().download(filename=args.name+'.mp4')
else:
    try:
        video.streams.filter(only_audio=True,file_extension='mp3').first().download(filename=args.name+'.mp3')
    except:
        print("Using ffmpeg")
        video.streams.filter(type='video',file_extension='mp4').first().download(filename=args.name+'.mp4')
        AudioSegment.from_file(args.name+'.mp4').export(args.name+'.mp3', format='mp3')        
