async function GenerateCodeUnique(room) {
  let codeFound = true;
  let code;

  while (codeFound) {
    code = "";
    for (let i = 0; i < 5; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }

    const roomIdExists = await room.findOne({ where: { code } });

    if (!roomIdExists) {
      codeFound = false;
    }
  }
  return code;
}

export default GenerateCodeUnique