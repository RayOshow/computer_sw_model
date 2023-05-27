import * as constants from "./constansts.js";
import * as ram from "./ram.js";

/**
 * CPU - Register
 */
class Registers {
    constructor() {
        // 프로그램 실행 위치
        this._pc = 0x00000000;
        // 범용 레지스터
        this.rg1 = 0x00000000;
        this.rg2 = 0x00000000;
        this.rg3 = 0x00000000;
        // 상태 저장
        this.flags = 0x0;
    }

    /*
        프로그램 카운터 레지스터에서 현재 실행할 메모리 위치를 가져온다.
    */
    get pc() {
        const rtn = this._pc;
        this._pc++; // 값을 한번 가져오면 +1 시킴.
        return rtn;
    }

    set pc(value) {
        this._pc = value;
    }

    /*
    지정된 범용 레지스터에 저장된 값을 가져온다.
    */
    getRg(regCode) {
        switch (regCode) {
            case constants.CPU_REG_RG1:
                return this.rg1;
            case constants.CPU_REG_RG2:
                return this.rg2;
            case constants.CPU_REG_RG3:
                return this.rg3;
        }

        // 범용 레지스터를 잘못 지정했다면, 0 리턴
        return 0;
    }

    /*
        지정된 범용 레지스터에 값을 저장 한다.
    */
    setRg(regCode, value) {
        switch (regCode) {
            case constants.CPU_REG_RG1:
                this.rg1 = value;
                break;
            case constants.CPU_REG_RG2:
                this.rg2 = value;
                break;
            case constants.CPU_REG_RG3:
                this.rg3 = value;
                break;
        }
    }
}

export let registers = new Registers();

/**
 * CPU - Arithmetic Logic Unit
 *  계산 명령을 처리 한다. 실제로는 하드웨어를 통해 처리 된다.
 *
 * @param {*} opcode 명령어
 * @param {*} regCode1 명령어의 대상이 되는 레지스터 코드, ALU의 계산 결과물이 담김.
 * @param {*} regCode2 명령어의 대상이 되는 레지스터 코드
 */
export function alu(opcode, regCode1, regCode2) {
    console.log("[ALU]:: " + opcode.toString(16));

    switch (opcode) {
        case constants.OPCD_ADD:
            registers.setRg(
                regCode1,
                registers.getRg(regCode1) + registers.getRg(regCode2),
            );
            console.log("[ADD]::: " + registers.getRg(regCode1).toString(16));
            break;

        case constants.OPCD_SUB:
            registers.setRg(
                regCode1,
                registers.getRg(regCode1) - registers.getRg(regCode2),
            );
            console.log("[SUB]::: " + registers.getRg(regCode1));
            break;

        case constants.OPCD_MUL:
            registers.setRg(
                regCode1,
                registers.getRg(regCode1) * registers.getRg(regCode2),
            );
            console.log("[MUL]::: " + registers.getRg(regCode1));
            break;

        case constants.OPCD_DIV:
            registers.setRg(
                regCode1,
                registers.getRg(regCode1) / registers.getRg(regCode2),
            );
            console.log("[DIV]::: " + registers.getRg(regCode1));
            break;

        case constants.OPCD_COMP:
            console.log("reg1:: " + registers.getRg(regCode1));
            console.log("reg2:: " + registers.getRg(regCode2));

            if (registers.getRg(regCode1) > registers.getRg(regCode2)) {
                registers.flags = constants.CPU_ALU_CMP_LESS;
            } else if (registers.getRg(regCode2) > registers.getRg(regCode1)) {
                registers.flags = constants.CPU_ALU_CMP_GREATER;
            } else {
                registers.flags = constants.CPU_ALU_CMP_EQUAL;
            }

            console.log("[COMP]::: " + registers.flags);
            break;
    }
}

/**
 * Cpu을 실행 한다.
 *  Control Unit이 담당.
 */
export function doCpu() {
    // fectch
    const opcode = ram.getRam(registers.pc);

    console.log("opcode:: " + opcode.toString(16));

    let operand1;
    let operand2;

    if (opcode & constants.OPCD_COND_CALC) {
        // 계산 명령어

        operand1 = ram.getRam(registers.pc);
        operand2 = ram.getRam(registers.pc);

        // 계산의 경우 Alu 실행
        alu(opcode, operand1, operand2);

        console.log("operand1:: " + operand1.toString(16));
        console.log("operand2:: " + operand2.toString(16));
    } else if (opcode & constants.OPCD_COND_JMP) {
        operand1 = ram.getRam(registers.pc);

        /*
         r2에 비교 대상값 , r1에 비교 기준 값.
         예) 숫자 10을 x에 비교하고 싶으면, (x = r1, 10 = r2)  
        */
        switch (opcode) {
            case constants.OPCD_JMP:
                console.log("[JMP]:: ");
                registers.pc = operand1;
                break;

            case constants.OPCD_JG:
                console.log("[JG]:: ");
                if (registers.flags === constants.CPU_ALU_CMP_GREATER) {
                    registers.pc = operand1;
                }
                break;

            case constants.OPCD_JL:
                console.log("[JL]:: ");
                if (registers.flags === constants.CPU_ALU_CMP_LESS) {
                    registers.pc = operand1;
                }
                break;

            case constants.OPCD_JGE:
                console.log("[JGE]:: ");

                if (
                    registers.flags === constants.CPU_ALU_CMP_GREATER ||
                    registers.flags === constants.CPU_ALU_CMP_EQUAL
                ) {
                    registers.pc = operand1;
                }

                break;
            case constants.OPCD_JLE:
                console.log("[JLE]:: ");

                if (
                    registers.flags === constants.CPU_ALU_CMP_LESS ||
                    registers.flags === constants.CPU_ALU_CMP_EQUAL
                ) {
                    registers.pc = operand1;
                }
                break;
        }

        console.log("operand1:: " + operand1.toString(16));
        console.log("pc:::" + registers.pc.toString(16));
    } else if (opcode & constants.OPCD_COND_DATA_TF) {
        switch (opcode) {
            case constants.OPCD_LDA:
                // fetch operand:: LDA의 Operand1 -> Register 위치
                operand1 = ram.getRam(registers.pc);
                // fetch operand:: LDA의 Operand2 -> 값이 담긴 메모리 addr
                operand2 = ram.getRam(ram.getRam(registers.pc));

                console.log("[LDA]:: ");
                console.log("operand1:: " + operand1.toString(16));
                console.log("operand2:: " + operand2.toString(16));

                registers.setRg(operand1, operand2);

                break;

            case constants.OPCD_LD:
                // fetch operand:: LDA의 Operand1 -> Register 위치
                operand1 = ram.getRam(registers.pc);
                // fetch operand:: LDA의 Operand2 -> 값
                operand2 = ram.getRam(registers.pc);

                console.log("[LD]:: ");
                console.log("operand1:: " + operand1.toString(16));
                console.log("operand2:: " + operand2.toString(16));

                registers.setRg(operand1, operand2);

                break;

            case constants.OPCD_STA:
                // fetch operand:: LDA의 Operand1 -> Register 위치
                operand1 = ram.getRam(registers.pc);
                // fetch operand:: 저장될 메모리 addr
                operand2 = ram.getRam(registers.pc);

                const value = registers.getRg(operand1);

                console.log("[STA]:: ");
                console.log("operand1:: " + operand1.toString(16));
                console.log("operand2:: " + operand2.toString(16));

                // LDA의 Operand2 -> 값이 담긴 메모리 addr
                ram.setRam(operand2, value);

                break;
        }
    }
}
