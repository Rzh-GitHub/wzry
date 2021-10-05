module.exports = app => {
    const express = require('express')
    // 子路由
    const router = express.Router()
    // 引入模型
    const Category = require('../../models/Category')
    // 创建分类
    router.post('/categories', async (req, res) => {
        // 需要 json 中间件
        const model = await Category.create(req.body)
        // 告诉客户端创建完成
        res.send(model)
    })
    // 分类列表
    router.get('/categories', async (req, res) => {
        const items = await Category.find().limit(10)
        res.send(items)
    })
    // 获取详情（用于绑定编辑分类的 input 输入框）
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    // 编辑分类
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    // 删除分类
    router.delete('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    // 挂载
    app.use('/admin/api', router)
}