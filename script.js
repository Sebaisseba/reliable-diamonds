ores=[60009n];//dia
//ores=[60005n,60006n,60007n,60008n,60009n,60010n];
//orelabels=["Coal","Iron","Gold","Redstone","Diamond","Lapis"];
disks=[60011n,60012n,60013n];//sc rc rg
//disklabels=["Swamp clay","River clay","River gravel"];
lmult=0x5deece66dn;
mask=0xffff_ffff_ffffn;

//not needed, we will just index the solutions
function getKey(disk, ore, seed) {
    targetSalt=ore;
    measuredSalt=disk;
    seed = seed & mask;
    key=(((seed + targetSalt) ^ lmult) - ((seed + measuredSalt) ^ lmult)) & mask;
    return key;
}

//not needed, we will just index the solutions
/*this function takes in a disk (e.g. swamp clay is 60011), an ore (e.g. diamond is 60009), and a world seed,
then calculates the x,z, and possibly y offsets. y offset is complicated and not useful anyway

the function is not working correctly though, so do not use it. use my rewritten version of Matt's java code
*/
function getOffsets(disk, ore, seed) {
    seed = BigInt(seed);
    key=getKey(disk, ore, seed);
    blockToSeed=17592186044416n;//=2^48/16;
    s1=(key*lmult) & mask; //x
    s2=(s1*lmult) & mask; //z
    divs1=0n;
    while (divs1*blockToSeed<s1) {
        divs1++;
    }
    divs2=0n;
    while (divs2*blockToSeed<s2) {
        divs2++;
    }//bigints can't be divided conventionally, but since our output is 1-16 this is fine even if inefficient
    xoff=divs1-1n;//=s1/blockToSeed
    zoff=divs2-1n;//=s2/blockToSeed
    //s3=(s2*lmult) & mask; //y
    //yoff=s3/blockToSeed;
    return [xoff,zoff];
    //return [xoff,zoff,yoff];
}

//our answers. note that for some values we get an x offset of -1. i am going to ignore this for now
//i am indexing solutions instead of calculating them because it's faster than trying to get getOffsets to work, sorry future sebastian
function interpretResidue(residue) {
    if (residue == "0000") {//sc-1,8, rc3, rg14
        off=[8,3,14];
    } else if (residue == "0001") {//sc6, rc1, rg14
        off=[6,1,14];
    } else if (residue == "0010") {//sc6, rc3, rg14
        off=[6,3,14];
    } else if (residue == "0011") {//sc-1,8, rc-1,4
        off=[8,4,0];
    } else if (residue == "0100") {//sc-1,8
        off=[8,0,0];
    } else if (residue == "0101") {//NONE
        off=[0,0,0];
    } else if (residue == "0110") {//NONE
        off=[0,0,0];
    } else if (residue == "0111") {//sc-1,8, rc-1,4, rg14
        off=[8,4,14];
    } else if (residue == "1000") {//sc-1,8, rc3, rg14
        off=[8,3,14];
    } else if (residue == "1001") {//sc6, rc1, rg14
        off=[6,1,14];
    } else if (residue == "1010") {//sc6, rc3, rg14
        off=[6,3,14];
    } else if (residue == "1011") {//sc-1,8, rc-1,4, rg14
        off=[8,4,14];
    } else if (residue == "1100") {//sc-1,8, rc3, rg14
        off=[8,3,14];
    } else if (residue == "1101") {//sc6, rc1, rg14
        off=[6,1,14];
    } else if (residue == "1110") {//sc6, rc3, rg14
        off=[6,3,14];
    } else if (residue == "1111") {//sc-1,8, rc-1,4, rg14
        off=[8,4,14];
    }
    return off;
}




function dec2bin(dec) {
    //return (BigInt(dec) >>> 0).toString(2);//javascript's BigInts are babies that can't do anything
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
    
    //i know this is garbage code, i simply do not care
    b=dec2bin(p);
    
    arr=b.split("");
    i4=arr.pop();
    i3=arr.pop();
    i2=arr.pop();
    i1=arr.pop();
    b4=i1+i2+i3+i4;
    
    sol=interpretResidue(b4);
    if (sol[0]<0.1) {//all numbers in js are floats so bad practice to check ==0
        sc="No (offset varies). Most likely offsets (+Z/-Z): 15/-1, 12/-4, 10/-6";
    } else {
        sc="Yes. Offset (+Z/-Z): " + sol[0] + "/"+(sol[0]-16).toString();
    }
    if (sol[1]<0.1) {
        rc="No (offset varies). Most likely offsets (+Z/-Z): 12/-4, 9/-7";
    } else {
        rc="Yes. Offset (+Z/-Z): " + sol[1]+ "/"+(sol[1]-16).toString();
    }
    if (sol[2]<0.1) {
        rg="No (offset varies). Most likely offsets (+Z/-Z): 8/-8, 5/-11, 2/-14";
    } else {
        rg="Yes. Offset (+Z/-Z): " + sol[2]+"/"+(sol[2]-16).toString();
    }

    res="For this seed:";
    ressc="Swamp clay patches are reliable? " + sc;
    resrc="River clay patches are reliable? " + rc;
    resrg="River gravel patches are reliable? " + rg;

    
    //document.getElementById("b4").innerHTML="Last 4 binary digits of seed: "+b4;
    document.getElementById("result").innerHTML=res;
    document.getElementById("ressc").innerHTML=ressc;
    document.getElementById("resrc").innerHTML=resrc;
    document.getElementById("resrg").innerHTML=resrg;


    //res=getOffsets(ores[0],disks[0],p);
    //res=b4;
    //document.getElementById("result").innerHTML=res;
}
        