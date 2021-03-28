function dec2bin(dec) {
    //return (BigInt(dec) >>> 0).toString(2);
    truedec=BigInt(dec);
    if (truedec<32n && truedec>=0n) {
        truedec=truedec+64n;
    }
    if (truedec<0n && truedec>-32n) {
        truedec=truedec-64n;
    }
    return BigInt(truedec).toString(2);
  }

function compute()
{
    p = document.getElementById("principal").value;
    
    b=dec2bin(p);
    
    arr=b.split("");
    i4=arr.pop();
    i3=arr.pop();
    i2=arr.pop();
    i1=arr.pop();
    b4=i1+i2+i3+i4;
    res="This seed:"
    if (b4=="0011") {
        ressc="Works with swamp clay? Yes."
        resrc="Works with river clay? Yes."
        resrg="Works with river gravel? No."
    } else if (b4=="0100") {
        ressc="Works with swamp clay? Yes."
        resrc="Works with river clay? No. "
        resrg="Works with river gravel? No."
    } else if (b4=="0101" || b4=="0110") {
        ressc="Works with swamp clay? No."
        resrc="Works with river clay? No."
        resrg="Works with river gravel? No."
    } else {
        ressc="Works with swamp clay? Yes."
        resrc="Works with river clay? Yes."
        resrg="Works with river gravel? Yes."
    }
    document.getElementById("b4").innerHTML="Last 4 binary digits of seed: "+b4;
    document.getElementById("result").innerHTML=res;
    document.getElementById("ressc").innerHTML=ressc;
    document.getElementById("resrc").innerHTML=resrc;
    document.getElementById("resrg").innerHTML=resrg;
}
        