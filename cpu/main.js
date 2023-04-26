import { printRam, setRam, getRam } from './ram.js'

setRam(0, 0xFFFFFFFF)
console.log(getRam(0))
printRam()