const log = (x) => console.log("Result is: ",x);

const identity = (x) => x
log(identity(1));

const add = (a,b) => a + b
const sub = (a,b) => a - b
const mul = (a,b) => a * b

log(add(1,2));

const identityf = (x) => () => x
log(identityf(5)());

// suggested for interviews
const addf = (x) => (y) => x + y
log(addf(2)(2));

const liftf = (f) => (x) => (y) => f(x,y)
log(liftf(add)(1)(2));

const curry = (f,x) => (y) => f(x,y)
// const curry = (f,x) => liftf(f)(x)
log(curry(mul,7)(7));

// const inc = (x) => addf(1)(x)
// const inc = (x) => liftf(add)(1)(x)
const inc = (x) => curry(add,1)(x)
log(inc(4));

const twice = (f) => (x) => f(x,x)
log(twice(mul)(3));

const reverse = (f) => (x,y) => f(y,x)
log(reverse(sub)(5,4));

//helpers / example for next challanges
const doubl  = (x) => twice(add)(x)
const square = (x) => twice(mul)(x)

const composeu = (f,g) => (x) => g(f(x))
log(composeu(doubl, square)(5));

const composeb = (f,g) => (x,y,z) => g(f(x,y),z)
log(composeb(add, mul)(2,3,7)); // 35

const limit = (f, count) => (a,b) => {
    if(count > 0){
        count -= 1
        return f(a,b)
    }else{
        return undefined;
    }
}

const add_ltd = limit(add,1)
log(add_ltd(3,4)); // 7
log(add_ltd(3,4)); // undefined


const from = (x) => () => {
    cur = x
    x += 1
    return cur
}

const i = from(0)
log(i()); // 0
log(i()); // 1


const to = (gen, end) => () => {
    value = gen()
    if(value < end){
        return value
    }else{
        return undefined
    }
}

const index = to(from(1),3)
log(index()); // 1
log(index()); // 2
log(index()); // undefined

const fromTo = (start, end) => {
    return to(from(start),end)
}

const index2 = fromTo(0,3)
log("fromTo code now:")
log(index2()); // 0
log(index2()); // 1
log(index2()); // 2
log(index2()); // undefined

// challange 4
const element = (arr, gen) => () => {
    if(gen === undefined){
        gen = fromTo(0,arr.length);
    }
    val = gen();
    if(val !== undefined){
        return arr[val];
    }else{
        return undefined;
    }
}
var ele = element(['a','b','c','d'], fromTo(1,3))
log(ele()); // b
log(ele()); // c
log(ele()); // undefined


log("---- challange 5 ----")
const collect = (gen, arr) => () => {
    val = gen()
    if(val !== undefined){
        arr.push(val)
    }
    return val
}

var arr = [];
var col = collect(fromTo(0,2),arr)
log(col()); // 0
log(col()); // 1
log(col()); // undefined
log(arr);   // [1,2]


log("---- challange 6 ----");
const filter = (gen, pred) => () => {
    do{
        val = gen();
    } while(val !== undefined && !pred(val));
    return val;
};

var fil = filter(fromTo(0,5),
                 function third(value){
                     return (value % 3) === 0;
                 });

log(fil()) // 0
log(fil()) // 3
log(fil()) // undefined

const concat = (gen1, gen2) => {
    let gen = gen1
    return function(){
        val = gen()
        if(val === undefined){
            gen = gen2
            val = gen()
        }
        return val
    }
}
const con = concat(fromTo(0,3),fromTo(0,2))
log(con()) // 0
log(con()) // 1
log(con()) // 2
log(con()) // 0
log(con()) // 1
log(con()) // undefined

const gensymf = (prefix) => {
    const gen = from(1);
    return () => {
        value = gen();
        return `${prefix}${value}`
    }
}

var geng = gensymf("G"),
genh = gensymf("H");

log(geng()) // G1
log(genh()) // H1
log(geng()) // G2
log(genh()) // H2

const gensymff = (unary, seed) => {
    return (prefix) => {
        return () => {
            const number = unary(number);
            return `${prefix}${number}`;
        };
    };
};
