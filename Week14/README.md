学习笔记
mvc mvvm 复用率
组件化

## 对象与组件

#### 对象
1. Properties 
2. Methods
3. Inherit (继承关系)

#### 组件
1. Properties 
2. Methods
3. Inherit 

4. Attribute
5. Config & State
6. Event
7. Lifecycle （生命周期）
8. Children （必要条件）

###### Properties 和 Attribute
* Properties 是可以经过处理的， Attribute 不可处理
* input的Attribute value 是默认值，实际效果以Properties优先
----
### 如何设计组件状态
Markup 标签 | JS set | JS Change | User Input Change | -
--:|:--:|:--:|:--:|:-- | --
N| Y | Y | N | property
Y| Y | Y | N | attribute
N| N | N | Y | state
N| Y | N | N | config

1. property
2. attribute
3. state （外部不可修改）
4. config (一次性的)

----
### 生命周期
类似 react vue的组件生命周期

### children
* Content 型 与 Template 型
----
#### 建立markup环境
1. 基于react jsx
2. 基于vue标记语言parser



### 循环轮播思路，自动播放
* 选取当前显示的图和下一个显示的图，调整下一个图位置
* 将下一张图放在轮播图的下一张的位置，再移动
* 难点：计算每个图的 可见位置 ， 移动到第二个位置 和 -1 个位置
* 全部是相对于当前图 可见位置为（-index * 100），第二个位置（-index * 100 + 100），第三个位置（-index * 100 + 200），第-1个位置（-index * 100 - 100）

### 用户控制第几张代码思路
* 设置当前移动位置 position ，整数
* 设置位置，用四舍五入round（移动的距离/总长度）
* 替换position
* 用position去计算当前互动距离

### 循环拖动思路
* move的时候获取要操作的child （通过[-1, 0, 1] 左中右 和当前显示位置current决定） => [length + current + (-1,0,1)] % length 得到要操作元素下标
* 获取当前移动的位置，计算思路（当前元素位置 + 移动位置）
* 获取需要移动的元素，加上 移动方向（移动系数）获得最终要移动到的位置