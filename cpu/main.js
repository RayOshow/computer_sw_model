import { printRam, setRam, getRam } from './ram.js'
import { doCpu } from './cpu.js'

/*
=====
function test (c) {

    const a = 3
    const b = 5

    if ( c > a+b ) {
        return;
    }

    ....
}

test(12)로 함수가 호출 된 상황. 

 변수가 저장되는 방식.
 -> 코드상 위치 : 컴파일러의 역할
 -> function stack 상 위치 : OS 역할.

*전제 조건
    변수 'a'가 담기는 메모리 addr 0x000000F0
    변수 'b'가 담기는 메모리  addr 0x000000F1
    변수 'c'가 담기는 메모리  addr 0x000000F2
    리턴 addr가 가 담기는 메모리  0x000000F3

    프로그램 코드는 0x00 메모리 부터 탑재되어 있다고 가정. 

*어셈블리 언어 (X)
    LDA r1, 0x000000F0  // 변수 'a' 값을 r1에 저장 
    LDA r2, 0x000000F1  // 변수 'b' 값을 r2에 저장
    ADD r1, r2  /// 첫번 째 인자 (r1 레지스터)에 output이 저장
    LDA r2, 0x000000F2 // 변수 'c' 값을 r2에 저장
    CMP r1, r2 //
    jg 0x000000F3 // r2의 값이 r1보다 큰 경우 FLAGS 레지스터값이 2가됨. 이 경우만 0x000000F3로 이동

*오브젝트 코드
    0x00010000 // LDA 
    0x00000001 // r1
    0x000000F0 

    0x00010000 // LDA
    0x00000002 // r2
    0x000000F1

    0x00000001 // ADD
    0x00000001 // r1
    0x00000002 // r2

    0x00010000 // LDA
    0x00000002 // r2
    0x000000F2  

    0x00000005 // CMP
    0x00000001 // r1
    0x00000002 // r2

    0x00000200 // Jump when Greater
    0x000000F3
     

*/

// 변수 값 저장
setRam(0x000000F0, 3) 
setRam(0x000000F1, 5)
setRam(0x000000F2, 12)
setRam(0x000000F3, 0x000001FF)

setRam(0, 0x00010000) // LDA
setRam(1, 0x00000001) // r1 레지스터
setRam(2, 0x000000F0) // 값이 담겨 있는 메모리 위치

setRam(3, 0x00010000) // LDA
setRam(4, 0x00000002) // r2 레지스터
setRam(5, 0x000000F1) // 값이 담겨 있는 메모리 위치

setRam(6, 0x00000001) // ADD
setRam(7, 0x00000001) // r1 레지스터
setRam(8, 0x00000002) // r2 레지스터

setRam(9, 0x00010000) // LDA
setRam(10, 0x00000002) // r2 레지스터
setRam(11, 0x000000F2) // 값이 담겨 있는 메모리 위치

setRam(12, 0x00000005) // CMP
setRam(13, 0x00000001) // r1 레지스터
setRam(14, 0x00000002) // r2 레지스터

setRam(15, 0x00000200) // LDA
setRam(16, 0x000000F3) // r2 레지스터

for(let i = 0; i < 6 ; i++) {
    console.log('Cpu run Index:' + i)
    doCpu()
    console.log('')
}
