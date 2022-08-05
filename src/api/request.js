export function request({//设置默认值
    baseUrl = "http://localhost:3000",
    url = '',
    method = 'GET',
    data = {},
    headers = "",
    timeout = 60000
}) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + url,
            method,
            data,
            headers,
            timeout,
            success(res){
                if(res.data&&res.data.code==-460){
                    uni.showToast({
                        title: '标题',
                        duration: 2000
                    });
                    uni.showToast({
                        title:"数据加载失败",
                        icon:"error"
                    })
                    reject(res)
                }else{
                    resolve(res)
                }
            },
            fail(err){
                console.log({
                    type:"错误",
                    error:err
                })
                uni.showToast({
                    title:"数据加载失败",
                    icon:"error"
                })
                reject(err)
            }
        })
    })
}
