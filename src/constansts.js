// Opcord

// Opcode Bit 조건 (condition)
export const OPCD_COND_CALC = 0x000000ff; // 계산
export const OPCD_COND_JMP = 0x0000ff00; // 이동
export const OPCD_COND_DATA_TF = 0x00ff0000; // 데이터 트랜스퍼

// 계산
export const OPCD_ADD = 0x00000001;
export const OPCD_SUB = 0x00000002;
export const OPCD_MUL = 0x00000003;
export const OPCD_DIV = 0x00000004;
export const OPCD_COMP = 0x00000005;

// 이동
export const OPCD_JMP = 0x00000100;
export const OPCD_JG = 0x00000200; // Jump when Greater
export const OPCD_JL = 0x00000300; // Jump when less
export const OPCD_JGE = 0x00000400; // Jump when Greater or Equal
export const OPCD_JLE = 0x00000500; // Jump when less or Equal

// Fetch & Store
export const OPCD_LDA = 0x00010000; // 메모리 -> 레지스터
export const OPCD_STA = 0x00020000; // 레지스터 -> 메모리

export const OPCD_LD = 0x00030000; // 값 -> 레지스터

// CPU Registers
export const CPU_REG_RG1 = 0x00000001;
export const CPU_REG_RG2 = 0x00000002;
export const CPU_REG_RG3 = 0x00000003;

// CPU ALU - Compare Conditions
export const CPU_ALU_CMP_EQUAL = 0x00000000;
export const CPU_ALU_CMP_LESS = 0x00000001;
export const CPU_ALU_CMP_GREATER = 0x00000002;

// MMU
export const MMU_RESERVED_ADDR = 0xff00000000;

// USB Controller
export const IO_CONTROLLER_BIT = 0xff0000000f;
export const IO_CONTROLLER_CNOTROL = 0xff00000001;
export const IO_CONTROLLER_BASE_ADDR = 0xff00000002;
export const IO_CONTROLLER_MEM_SIZE = 0xff00000003;
export const IO_CONTROLLER_DATA_SIZE = 0xff00000004;
