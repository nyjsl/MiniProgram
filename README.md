## 概述

Todo App 是支付宝小程序的一个经典案例，本示例演示如何结合小程序客户端程序和 Basement 后端服务，完成一个小程序的开发，使其同时具备客户端和后端的能力，可以作为一个完成程序使用。

## 环境准备

* Nodejs 10 或以上版本

## 使用步骤


1. 点击左侧面板开通云服务（如已经创建请忽略）
![截图](https://gw.alicdn.com/tfs/TB1SijZTsbpK1RjSZFyXXX_qFXa-1296-1262.png)
2. 关联云服务
![截图](https://gw.alicdn.com/tfs/TB1ES_VThTpK1RjSZFKXXa2wXXa-918-324.png)
注：0.30版本以上IDE会自动关联，30版本以下请按照上图点击手动关联。

2. 预览小程序：刷新预览，可以读取初始信息并且可以正常操作使用，可以认为我们已经将小程序跑起来了。
    ![截图](https://cdn.nlark.com/yuque/0/2018/png/84303/1536985350442-fc2f8bf3-7b17-4ea5-95aa-5b8dc7182435.png)

3. 调用服务：`basement` 是 Basement 服务的全局对象，内置在小程序中，可以直接调用对应服务实现程序功能。在本示例的小程序中，可以找到以下服务调用的对应处理。
    * 云函数：`basement.function`
    * 数据存储：`basement.db`
    * 文件存储：`basement.file`

## 资源

1. Basement 后端云服务相关信息，[请点击这里](https://tech.antfin.com/products/BASEMENT)
