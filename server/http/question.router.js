// import express from 'express';
import checkToken from '../middleware/check.token';
import QuestionApi from '../apis/question';
const router = Router();
// TODO: api 下的请求使用 json 配置进行真实请求，请求参数的验证在前端完成
// TODO: http 下的请求进行正则匹配 json 的结构
// TODO: 每次新增接口，直接配置 json 即可

// 浏览器发过来的get请求  /api/questionList
router.get('/question/list', checkToken, async function (req, res, next) {
  try {
    const result = await new QuestionApi(req).getList(req.query);
    res.send(result.data);
  } catch (err) {
    next(err);
  }
});

router.delete('/question/delete/:productId', checkToken, async function (req, res, next) {
    try {
        const result = await new QuestionApi(req).deleteItem(req.params);
        res.send(result.data);
    } catch (err) {
        next(err);
    }
});

router.patch('/question/modify/:productId', checkToken, async function (req, res, next) {
    try {
        const result = await new QuestionApi(req).modifyItem(req.params, req.body);
        res.send(result.data);
    } catch (err) {
        next(err);
    }
});

router.post('/question/create', checkToken, async function (req, res, next) {
    try {
        const result = await new QuestionApi(req).createItem(req.body);
        res.send(result.data);
    } catch (err) {
        next(err);
    }
});

module.exports = function (app) {
  app.use('/api', router);
};

