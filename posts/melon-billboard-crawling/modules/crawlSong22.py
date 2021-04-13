from bs4 import BeautifulSoup
import requests
import re


headers = requests.utils.default_headers()
headers.update({
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
})

suffixCrawlWatermark = '_-_'


def getInfoOfSong(songId=33077590, cache=None):
    # to use cache
    if cache != None:
        try: 
            return cache[albumId]
        except:
            pass
        
    url = f'https://www.melon.com/song/detail.htm?songId={songId}'

    r = requests.get(url, headers=headers)
#     print(r)
    soup =BeautifulSoup(r.content,"lxml")
#     print(str(soup)[:1000])


    # 장르
    genreOfSong = soup.select('.list > dd:nth-child(6)')[0].get_text()
    # 발매일
    launchDate = soup.select('.list > dd:nth-child(4)')[0].get_text()
    
    singers = [
    {"jobType": f"가수{suffixCrawlWatermark}",
      "artistId": re.match('.+\(.?(\d+).?\)',
                           e.attrs['href']).group(1),
      "artist_name": e.get_text()}
       for e in soup.select('.info .artist_name')
    ]
    
    composers = [
    {"jobType": e.select('.type')[0].get_text(),
      "artistId": re.match('.+\(.?(\d+).?\)', 
                           e.select('a.artist_name')[0].attrs['href']).group(1),
      "artist_name": e.select('a.artist_name')[0].get_text()}
         for e in soup.select('.section_prdcr li')]

#     print(singers)
    res = {"response": r,
           "isCached": 'yes',
            "genreOfSong": genreOfSong,
            "launchDate": launchDate,
            "singers": singers,
            "composers": composers}
    # add to cache
    if str(res["response"]) == '<Response [200]>':
        cache[songId] = res
    return res


def getInfoOfAlbum(albumId=10521601, cache=None, modeUpdate=False):
    # to use cache
    if cache != None and modeUpdate == False:
        try: 
            return cache[albumId]
        except:
            pass
        
    url = f'https://www.melon.com/album/detail.htm?albumId={albumId}'
#     url = f'https://www.melon.com/album/detail.htm?albumId=10521601'

    r = requests.get(url, headers=headers)
#     print(r)
    soup =BeautifulSoup(r.content,"lxml")
#     print(str(soup)[:1000])
    
    # 앨범 이름
    albumName = soup.select(
        '.song_name')[0].get_text()
    albumName = re.match('앨범명\s+(.+)', albumName.strip()).group(1)    
    # 앨범 장르
    genreOfAlbum = soup.select(
        '.list > dd:nth-child(4)')[0].get_text()
    # 발매사
    publisher = soup.select(
        '.list > dd:nth-child(6)')[0].get_text()
    # 엔터테인먼트
    entertainmentName = soup.select(
        '.list > dd:nth-child(8)')[0].get_text()
    composers = [
    {"jobType": e.select('.type')[0].get_text(),
      "artistId": re.match('.+\((\d+)\)', 
                           e.select('a.artist_name')[0].attrs['href']).group(1),
      "artist_name": e.select('a.artist_name')[0].get_text()}
         for e in soup.select('.section_prdcr li')]
    
           
    res = {"response": r,
           "isCached": 'yes',
           "albumId": albumId,
           "albumName": albumName,
           "genreOfAlbum": genreOfAlbum,
           "publisher": publisher,
           "entertainmentName": entertainmentName}
    # add to cache
    if str(res["response"]) == '<Response [200]>':
        cache[albumId] = res
    return res
