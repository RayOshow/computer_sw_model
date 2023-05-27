import * as cpu from "../src/cpu.js";
import * as constants from "../src/constansts.js";

/////////////////////////////////////////////////////////////////////////
// ALU 테스트
cpu.registers.rg1 = 10
cpu.registers.rg2 = 5

// ADD 
cpu.alu(constants.OPCD_ADD, constants.CPU_REG_RG1, constants.CPU_REG_RG2)

// SUB 
cpu.alu(constants.OPCD_SUB, constants.CPU_REG_RG1, constants.CPU_REG_RG2)

// MUL
cpu.alu(constants.OPCD_MUL, constants.CPU_REG_RG1, constants.CPU_REG_RG2)

// DIV 
cpu.alu(constants.OPCD_DIV, constants.CPU_REG_RG1, constants.CPU_REG_RG2)

// COMP 
cpu.alu(constants.OPCD_COMP, constants.CPU_REG_RG1, constants.CPU_REG_RG2)

