var findAnagrams = function(s, p) {
    let indexArr = []
    let data = new Array(26).fill(0)
    for(let i =0;i<p.length;i++){
        data[p.charCodeAt(i)-'a'.charCodeAt(0)]++
        data[s.charCodeAt(i)-'a'.charCodeAt(0)]--
    }
    console.log('123123', data, p, s)
    if(allZero(data)) indexArr.push(0)
    for(let i=p.length;i<s.length;i++){
        const left = i-p.length
        data[s.charCodeAt(left)-'a'.charCodeAt(0)]++
        data[s.charCodeAt(i)-'a'.charCodeAt(0)]--
        if(allZero(data)) indexArr.push(left+1)
    }
    return indexArr
};
function allZero(data){
    for(let i=0;i<data.length;i++){
        if(data[i]!=0){
            return false
        }
    }
    return true
}
findAnagrams('cbaebabacd', 'abc')
