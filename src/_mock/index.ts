import Mock from 'mockjs'

Mock.mock('/api/test', 'get', () => {
  return {
    code: 0,
    data: {
      name: `lkk ${Date.now()}`,
    },
  }
})
