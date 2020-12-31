const fs = require('fs');

async function readFile() {
    const data = await fs.readFileSync('./textFile.txt');
    const input = data.toString('utf-8');
    await inputInstruction(input);
}

async function inputInstruction(inputValue) {
    let instructions = [];
    let splitInput = inputValue.split('\n');

    for (const iterator of splitInput) {
        let inst = {};
        let opcode = iterator.split(' ');
        inst['opcode'] = opcode[0];
        inst['operand'] = parseInt(opcode[1]);
        instructions.push(inst);
    }
    await repeatAccumulatorValue(instructions)
}

async function repeatAccumulatorValue(instructions) {
    let programLen = instructions.length;
    let counter = 0;
    let accumulator = 0;
    let executeInst = new Set();
    let repeatInst = false;
    while (0 <= counter && counter < programLen) {
        let currentInst = instructions[counter];
        if (executeInst.has(counter)) {
            repeatInst = true
            break;
        } else {
            executeInst.add(counter)
        }
        if (currentInst["opcode"] == "jmp") {
            counter += currentInst["operand"];
            continue;
        } else if (currentInst["opcode"] == "acc") {
            accumulator += currentInst["operand"];
        } else if (currentInst["opcode"] == "nop") {

        } else {
            console.log(`Something went wrong in accumulator value accumulator:${accumulator},counter:${counter}`)
        }
        counter++;
    }
    if (repeatInst) {
        console.log(`The accumulator contents repeated instruction is: ${accumulator},counter:${counter}.`)
    } else {
        console.log("Reached end of instructions without any repeating contents");
    }
}


readFile();


