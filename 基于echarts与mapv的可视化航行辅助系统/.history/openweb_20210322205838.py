import sys
from PyQt5.QtCore import *
from PyQt5.QtWebChannel import QWebChannel
from PyQt5.QtWidgets import QApplication, QMainWindow
from PyQt5.QtCore import QUrl
from PyQt5.QtWebEngineWidgets import QWebEngineView
import pandas as pd
import os
import matplotlib.pyplot as plt
# from osgeo import gdal
import cv2

class myClass(QObject):
    @pyqtSlot()
    def testPy2JS(self):
        myWeb.page().runJavaScript('wmsg =' + info + ';')

    @pyqtSlot()
    def onTimeData(self):
        myWeb.page().runJavaScript('wmsg2 =' + Info2 + ';')


#######程序入口

if __name__ == "__main__":
    save_file = 'data/dataset/1/'
    traj_list = []
    for root, dirs, files in os.walk(save_file):
        for file in files:
            path = os.path.join(root, file)
            traj = pd.read_csv(path, usecols=[1, 2], header=None).values
            traj_list.append(traj)
    print("number of original trajectories:", len(traj_list))

    testWeb = myClass()  # 用于通信的实例化对象
    app = QApplication(sys.argv)
    myWeb = QWebEngineView()
    myChannel = QWebChannel()
    myWeb.page().setWebChannel(myChannel)
    myChannel.registerObject('testObject', testWeb)  # 注册
    myWeb.load(QUrl(QFileInfo('index.html').absoluteFilePath()))
    myWeb.setWindowTitle('基于echarts与mapv的可视化航行辅助系统')
    myWeb.showMaximized()
    myWeb.show()
    sys.exit(app.exec_())
    #sys.exit(0)



