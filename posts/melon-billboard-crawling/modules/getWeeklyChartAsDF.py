import re
import logging
import pandas as pd

mylogger = logging.getLogger('melonMonthly')
# print(f'mylogger {mylogger}')
def getWeeklyChartAsDF(week, trs):
    listDataFrame = list()
    for i, tr in enumerate(trs):
    #     print(tr)
        tds = tr.select('td')
        row = [week]#list()
        for j, td in enumerate(tds):
            if j == 0 or j > 3:
                continue
            elif j == 1:
                rank = int(td.select('span:nth-child(1)')[0].get_text())
                rankDelta = td.select('.wrap_rank')[0].get_text().strip()
                # 단계 상승 / 단계 하락 / 단계 유지 / 순위 집입(오타有 유의)
                try:
                    sign, rankDelta = rankDelta.split('\n')
                    sign = -1 if sign == '단계 하락' else +1
#                     rankDelta = 0 if rankDelta == 0 else sign * rankDelta
                    rankDelta = sign * int(rankDelta)
                except:
                    # NEW
                    rankDelta = rankDelta.split('\n')[0]
                row.append(rank)   # as
                row.append(rankDelta)
                mylogger.debug('-'*50)
                mylogger.debug(f'j: {j} rank: {rank} rankDelta: {rankDelta}')
                continue  # to avoid commands below
            elif j == 2:
                albumId = td.select('a')[0].attrs['href']
                # albumId = re.match('.+\(.?(\d+).?\)', albumId).group(1)
                row.append(albumId)
                mylogger.debug('-'*50)
                mylogger.debug(f'j: {j} albumId: {albumId}')
                continue  # to avoid commands below            
            elif j == 3:
                songId = td.select('a')[0].attrs['href']
                # songId = re.match('.+\(.?(\d+).?\)', songId).group(1)
                row.append(songId)
                mylogger.debug('-'*50)
                mylogger.debug(f'j: {j} songId: {songId}')

                # title = td.select('.wrap_song_info a')[0].get_text()
                # 서비스 중지곡
                title = td.select('.wrap_song_info > div:nth-child(1)')[0].get_text()
                row.append(title)
                mylogger.debug('-'*50)
                mylogger.debug(f'j: {j} title: {title}')
                continue  # to avoid commands below

            mylogger.debug(f'j: {j}\n{td.get_text().strip()}')
#         print(row)
        listDataFrame.append(row)

    df = pd.DataFrame(listDataFrame)
    df.columns = ['week', 'rank', 'dRank', 
                  'albumId', 'songId', 'title']
    
    # calculate rank of the previous weekly chart
    df['prevRank'] = df.apply(lambda row: 
                 row['rank'] + row['dRank'] 
                 if type(row['dRank']) == int else 'outOfChart', axis=1)
    
    return df