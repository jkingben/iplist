const fs = require('fs')

const libqqwry = require('lib-qqwry')
const qqwry = libqqwry(true, './qqwry.dat')

let gibo = new Map([
    ["CN", ["河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "香港", "澳门", "北京", "天津", "上海", "中国"]],
    ["US", ["美国"]]
])
/**
 * {
 *   "begInt": 16777472,
 *   "endInt": 16778239,
 *   "begIP": "1.0.1.0",
 *   "endIP": "1.0.3.255",
 *   "Country": "福建省",
 *   "Area": "电信"
 * }
 */
let outs = []
let ip = '0.0.0.0'
while (true) {
    let data = qqwry.searchIPScope(ip, ip)[0]
    if (data.Country !== 'IANA') {
        let isOut = false
        for (let [key, value] of gibo.entries()) {
            for (let str of value) {
                if (data.Country.startsWith(str)) {
                    isOut = true
                    break
                }
            }
            if (isOut) {
                outs.push(data.begIP + '|' + data.endIP + "|" + key)
                break
            }
        }
    }
    if (data.endIP === '255.255.255.255') break
    ip = libqqwry.intToIP(data.endInt + 1)
}
fs.writeFileSync('../data/data/ip_gibo.txt', outs.join('\n'))