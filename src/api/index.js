import { request } from './request.js'

export function search({//搜索
    keywords = '',//关键词
    limit = 30,//返回数量 , 默认为 30
    offset = 0,//偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
    type = 1//默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
}) {
    return request({
        url: '/search',
        data: {
            keywords,
            offset,
            limit,
            type
        }
    })
}

export function searchHotDetail() {//热搜列表
    return request({ url: '/search/hot/detail' })
}

export function searchSuggest(keywords) {//搜索提示
    return request({
        url: "/search/suggest",
        data: {
            keywords,
            type: 'mobile'
        }
    })
}

export function topList() {//所有榜单
    return request({ url: '/toplist' })
}

export function topListDetail() {//首页榜单推荐
    return request({ url: '/toplist/detail' })
}


export function playlistDetail(id) {//各个榜单数据
    return request({
        url: '/playlist/detail',
        data: {
            id
        }
    })
}


export function songDetail(ids) {//传入音乐id获取详细数据，多个id用','分隔
    return request({
        url: "/song/detail",
        data: {
            ids
        }
    })
}

export function songUrl(id) {//传入音乐id获取播放连接
    return request({
        url: "/song/url",
        data: {
            id
        }
    })
}

export function yric(id) {//传入音乐id获取歌词
    return request({
        url: "/lyric",
        data: {
            id
        }
    })
}

export function simiSong(id) {
    return request({
        url: "/simi/song",
        data: {
            id
        }
    })
}