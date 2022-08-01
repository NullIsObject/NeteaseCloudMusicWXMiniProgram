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
                if(res.data.data&&res.data.data.code==-460){
                    uni.showToast({
                        title: '标题',
                        duration: 2000
                    });
                    console.log(460)
                    reject(res)
                }else{
                    resolve(res)
                }
            },
            fail: reject
        })
    })
}
