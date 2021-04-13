import logging

class EquippedLogger():
    def __init__(self, alias, pathLogFile=None):
        self.alias = alias
        self.pathLogFile = pathLogFile
        
        self.logger = logging.getLogger(alias)
        self.logger.setLevel(logging.INFO)
        
        self.formatHandlers = list()
        self.setFormatterHandler('default')
        self._setFileHandler()
        
        self.logger.info("server start!!!")
        
    def _setFileHandler(self):
        if self.pathLogFile == None: 
            self.pathLogFile = f'{self.alias}.log'
        file_handler = logging.FileHandler(self.pathLogFile)
        file_handler.setFormatter(self.formatter)
        self.logger.addHandler(file_handler)
        
    def setFormatterHandler(self, contextName):
#         self.removeFormatterHandler()
        self.logger.handlers.clear()
        
        self.formatter = logging.Formatter(f'%(asctime)s - %(name)s - {contextName} - %(levelname)s - %(message)s')
        stream_hander = logging.StreamHandler()
        stream_hander.setFormatter(self.formatter)
        
        self.formatHandlers.append(stream_hander)
        self.logger.addHandler(stream_hander)
        
    def removeFormatterHandler(self):
        self.logger.removeHandler(self.formatHandlers[0])


if __name__ == '__main__':
    # mylogger.logger.handlers.clear()
    print()
