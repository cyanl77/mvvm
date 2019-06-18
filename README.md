# mvvm
模拟vue简单实现一个mvvm框架

完整mvvm流程中包含：
Compile类负责解析模板，根据模板中的数据生成相应的watcher。
reactive.js实现对数据绑定其setter、getter函数，以及观察者类、订阅者类的相关声明。

数据劫持仅包含数据观察及相应逻辑，不含模板分析。
