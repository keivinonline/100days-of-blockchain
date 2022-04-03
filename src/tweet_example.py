import tweepy
from decouple import config
from os.path import exists
client = tweepy.Client(
    consumer_key=config("API_KEY"), consumer_secret=config("API_KEY_SECRET"),
    access_token=config("ACCESS_TOKEN"), access_token_secret=config("ACCESS_TOKEN_SECRET")
)
# debug
api_key = config("API_KEY")
print("API_KEY from python is {api_key}")
# Create Tweet

# The app and the corresponding credentials must have the Write permission

# Check the App permissions section of the Settings tab of your app, under the
# Twitter Developer Portal Projects & Apps page at
# https://developer.twitter.com/en/portal/projects-and-apps

# Make sure to reauthorize your app / regenerate your access token and secret
# after setting the Write permission

'''
Read from file
'''
file_path = "final_payload.txt"
str_payload = str()
if exists(file_path):
    with open(file_path) as f:
        '''read as str'''
        str_payload = f.read()
        print("payload:")
        print(str_payload)
'''
Post tweet
'''
response = client.create_tweet(
    text=str_payload
)
print(f"https://twitter.com/user/status/{response.data['id']}")
