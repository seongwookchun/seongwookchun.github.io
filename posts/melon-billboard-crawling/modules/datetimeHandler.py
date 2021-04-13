import datetime
import re


def dtt(argDt):
    # mylogger.logger.debug(f'''dtt() - args(argDt) : {argDt}''')
#     mylogger.logger.info(f'''dtt() - args(argDt) : {argDt}''')
    # for month
    pats = ['%m', '%m.%d', '%Y년%m.%d', '%Y%m%d', '%Y-%m-%d', '%Y.%m.%d']
    for pat in pats:
        try:
            res = datetime.datetime.strptime(argDt, pat)
        except:
            continue
    try: return res
    except: return None

ddelta = datetime.timedelta

if __name__ == '__main__':
    print(dtt('01.07'))   
    print(dtt('2016년01.01').weekday())
    print(dtt('2016년01.07'))
    # print(dtt(weekCurs[0]))
    # print(dtt(weekCurs[1]))
    print(dtt('2016년01.07') - dtt('2016년01.01'))
    print(dtt('20210103'))