// obj.a.b.c 和 obj['a']['b']['c'] 哪一个性能更好?
a.b.c.d比a['b']['c']['d']性能高点，后者还要考虑[ ]中是变量的情况，
再者，从两种形式的结构来看，显然编译器解析前者要比后者容易些，自然也就快一点
后者AST会大一些，但在AST解析上消耗的这点时间基本可以忽略不计

const arr=[0,0,1,2,0,4,0,6];
let arrLen=arr.length;
for(let i=0;i<arrLen;i++){
    if(arr[i]==0){
        arr.push(arr[i]);
        arr.splice(i,1);
        i--;
        arrLen--;
    }
}
console.log(arr);