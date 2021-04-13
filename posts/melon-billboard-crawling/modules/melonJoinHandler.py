def reduceSingers(arrDics):
    return ', '.join([dic['artist_name'] for dic in arrDics])

def reduce2DComposers(arrDics):
    lyricWriters = list()
    composers = list()
    arrangers = list()
    for dic in arrDics:
        artistName = dic['artist_name']
        if dic['jobType'] == '작사': lyricWriters.append(artistName)
        elif dic['jobType'] == '작곡': composers.append(artistName)
        elif dic['jobType'] == '편곡': arrangers.append(artistName)
            
    return {
        "lyricWriter" : ', '.join(lyricWriters),
        "composers" : ', '.join(composers),
        "arrangers" : ', '.join(arrangers)
    }



if __name__ == '__main__':
    temp = dfAccSongAlbumProto.loc[0]
    print(temp)
    print(reduceSingers(temp['singers']))
    print(reduce2DComposers(temp['composers']))