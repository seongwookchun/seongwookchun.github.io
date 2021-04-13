class IndiceHandler():
    def __init__(self):
        self.maxIndice = list()#self._updateMaxIndice(self.iterables)
    
    def _updateMaxIndice(self, iterables):
        self.maxIndice = [len(e) for e in iterables]
    
    def addIndiceToIndice(self, indiceA, indiceB):
#         self._updateMaxIndice(indiceA)
        res = list()
        carrier = 0  # intialization
#         print('-'*50)
        # m : maximum of a digit
        for lcnt, (m, a, b) in enumerate(zip(self.maxIndice[::-1], 
                                   indiceA[::-1], indiceB[::-1])):
            cIn = carrier
            s = a + b + carrier
            if s >= m: 
                carrier = 1
                s -= m
            elif s < 0:
                s += m
                carrier = -1
                if lcnt == len(indiceA) -1:
                    raise Exception(f'indice minus error.\n indiceA should be bigger than indiceB.\nHowever, {indiceA} {indiceB} are given.')
                    
            else: carrier = 0
            res.append(s)
#             print(f'm, | a, b, cIn, | s, carrier, res[::-1] {m, "|", a, b, cIn, "|", s, carrier, res[::-1]}')
        
        return res[::-1]
       

if __name__ == '__main__':
    indiceHandler = IndiceHandler()#['a b c d e'.split( ) 
    #                                    for _ in range(5)])
    # indiceHandler.maxIndice = [3,3,3,12,1]  # get the indiceHandler ready
    # print(indiceHandler.addIndiceToIndice([0,2,0,0,0], [0,3,0,0,1]))
    # print(indiceHandler.addIndiceToIndice([0,2,3,0,0], [0,3,4,0,1]))
    # print(indiceHandler.addIndiceToIndice([0,2,2,0,0], [0,-1,-4,0,-1]))
    # print(indiceHandler.addIndiceToIndice([0,2,2,0,0], [0,-2,-4,0,-1]))

    # indiceHandler.maxIndice = [10,10,10]  # get the indiceHandler ready
    # n = 150
    # indiceA = [0,0,0]
    # for i in range(n):
    #     indiceA = indiceHandler.addIndiceToIndice(indiceA, [0,0,1])
    #     if i%5 == 0:
    #         print(indiceA)

    # indiceHandler.maxIndice = [2,1,2]  # get the indiceHandler ready
    # n = 10
    # indiceA = [0,0,0]
    # for i in range(n):
    #     indiceA = indiceHandler.addIndiceToIndice(indiceA, [0,0,1])
    #     # if i%5 == 0:
    #     print(indiceA)


    indiceHandler.maxIndice = [5,1,1]  # get the indiceHandler ready
    n = 10
    indiceA = [0,0,0]
    for i in range(n):
        indiceA = indiceHandler.addIndiceToIndice(indiceA, [0,0,1])
        # if i%5 == 0:
        print(indiceA)