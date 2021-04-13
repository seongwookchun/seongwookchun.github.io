import pandas as pd
import os
from bs4 import BeautifulSoup as bs
import re
import logging

mylogger = logging.getLogger('melonMonthly')


class CrawlManager():
    def __init__(self):
        self.maxTrial = 3
        self.lenOfDFs = list()
    def crawl(self, curIndice):
        df = getAcculatedDF(curIndice)
        
    def getAcculatedDF(self, curIndice, driver):
        self.lenOfDFs = list()  # initialization
        
        for tdx in range(self.maxTrial):
            html = driver.find_element_by_css_selector('html')
            soup = bs(html.get_attribute('innerHTML'))

            trs = soup.select('tr.lst50') + soup.select('tr.lst100')
    #         print(len(trs))
    #         print(type(trs[0]))
            week = getWeekFromChartOpts(driver)
    #         print(week)
            dfTemp = getWeeklyChartAsDF(week, trs)
            
            if len(dfTemp) == 100:
                self.isGood = True
                self.lenOfDFs.append(len(dfTemp))
                mylogger.info(f'getAcculatedDF - self.isGood : {self.isGood} / self.lenOfDFs : {self.lenOfDFs}')
                return dfTemp, self.isGood, self.lenOfDFs
            elif tdx == 0:
                self.accumulatedDF = dfTemp
                
            elif tdx > 0:
                self.accumulatedDF = accumlateDFAandDFB(
                                        self.accumulatedDF, dfTemp)[0]
            self.lenOfDFs.append(len(self.accumulatedDF))
            
            if self.lenOfDFs[0] < self.lenOfDFs[-1]:
                self.isGood = True
            else:
                self.isGood = False
        mylogger.info(f'getAcculatedDF - self.isGood : {self.isGood} / self.lenOfDFs : {self.lenOfDFs}')
        
        return self.accumulatedDF, self.isGood, self.lenOfDFs
    
    def saveAsCsv(self, df, path):
        df.to_csv(path, index=False)
        mylogger.info(f'csv has been saved as : {path}')
    
    def saveRawHTML(self, html, path):
        with open(path, 'w', encoding='utf8') as f:
            f.write(html)
        mylogger.info(f'html has been saved as : {path}')
        
    def httpGETbyBS4(self, songId, albumId):
        cacheGetInfoOfSong = dict()
        cacheGetInfoOfAlbum = dict()
        
#         resInfoOfSong = csd.getInfoOfSong(cache=getInfoOfSongCache)
        resInfoOfSong = csd.getInfoOfSong(songId, cache=getInfoOfSongCache)
        dicInfoOfSong = getSongDetails(resInfoOfSong)
        
#         resInfoOfAlbum = csd.getInfoOfAlbum(cache=getInfoOfAlbumCache)
        resInfoOfAlbum = csd.getInfoOfAlbum(albumId, cache=getInfoOfAlbumCache)
        dicInfoOfAlbum = getAlbumDetails(resInfoOfAlbum)
        
        dfInfoOfSong = pd.DataFrame.from_dict(dicInfoOfSong, orient='index')
        dfInfoOfAlbum = pd.DataFrame.from_dict(dicInfoOfAlbum, orient='index')
        dfResult = pd.concat([dfInfoOfSong, dfInfoOfAlbum])
        return dfResult.transpose()



def setSub(serA, serB):
    return set(serA) - set(serB)

def accumlateDFAandDFB(dfA, dfB):
    res = pd.concat([dfA, 
                      dfB[dfB['rank'].isin(
                          list(setSub(dfB['rank'], dfA['rank'])))]],
                    ).sort_values('rank')
    return res, len(res)


def clickChartOptions(prevIndice, curIndice):
    mylogger.debug('-'*50)
    mylogger.debug(f'prevIndice, curIndice | {prevIndice}, {curIndice}')
    for lcnt, idx in enumerate(curIndice):
        mylogger.debug(f'lcnt {lcnt} idx {idx}')
        mylogger.debug(f'prevIndice[idx] / curIndice[idx] | {prevIndice[lcnt]} / {curIndice[lcnt]}')
        
        # skip condition
        if lcnt == 3:
            continue
        if lcnt != 4 and prevIndice[lcnt] == curIndice[lcnt]:
#             mylogger.debug(f'prevIndice[idx] / curIndice[idx] | {prevIndice[idx]} / {curIndice[idx]}')
            mylogger.debug(f'<same>')
            continue
        mylogger.debug(f'<not same>')
        if lcnt <= 1:
            esLi = eChartTabs[lcnt].find_elements_by_css_selector('li')[::-1]
        else:
            esLi = eChartTabs[lcnt].find_elements_by_css_selector('li')
#         mylogger.debug(f'lcnt {lcnt} | text {esLi[idx].text}')
        mylogger.debug(f'len of esLi {esLi[idx].text} {len(esLi)}')
        esLi[idx].click()
        concatChartOptions.append(esLi[idx].text)
        mylogger.debug(f'btn clicked.')



def convertWeekPrevsToMmdd_(weekPrevs):
    return '_'.join([w.replace('년', '').replace('.', '') 
                        for w in weekPrevs])


def getWeekFromChartOpts(driver):
    # rawName ex)
    # '2020년대_2020년_12월_12.21~12.27_장르종합'
#     rawName = '2020년대_2023년_12월_12.21~12.27_장르종합'
    # montly chart)
    # 2010년대_2010년_01월_종합
    rawName = '_'.join([e.text for e in 
                  driver.find_elements_by_css_selector(
                      '.wrap_chart .list_value .on')
               ])
#     print(rawName)
    year = re.match('\d+년대_(\d+)년', rawName).group(1)
#     print(year)
#     mmdd_mmdd = re.match('.+월_(\d+.\d+~\d+.\d+)', rawName).group(1)
#     mmdd_mmdd = mmdd_mmdd.replace(".", "")
#     mmddLeft, mmddRight = mmdd_mmdd.split('~')
    return rawName#



def crawlAction(curIndice, weekPrevs, searchBtn, driver):
    searchBtn.click()
    mmdd_mmdd = getWeekFromChartOpts(driver)
    mmdd_mmdd_ = mmdd_mmdd
#     mmdd_mmdd_ = mmdd_mmdd.replace('^','_')
    # mmdd_mmdd_ = convertWeekPrevsToMmdd_(weekPrevs)

    df, isGood, lenOfDF = crawlManager.getAcculatedDF(curIndice, driver)#[0]
    pathCsv = os.path.join('..\\rsc\\monthly\\csv', f"{mmdd_mmdd_}_{lenOfDF}_{isGood}.csv")
    crawlManager.saveAsCsv(df, pathCsv)
    
    
    html = driver.find_element_by_css_selector(
                    'body').get_attribute('innerHTML')
    pathHTML = os.path.join('..\\rsc\\monthly\\html', f"{mmdd_mmdd_}_{lenOfDF}_{isGood}.html")
    crawlManager.saveRawHTML(html, pathHTML)


from .getWeeklyChartAsDF import getWeeklyChartAsDF
crawlManager = CrawlManager()



        
        



if __name__ == '__main__':
    crawlManager = CrawlManager()
    print(crawlManager)