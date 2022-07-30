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
            success: resolve,
            fail: reject
        })
    })
}
