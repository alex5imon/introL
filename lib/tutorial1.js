
/* Main function */
function runTutorial1(lvl, command) {
  var program = getProgram(command);
  
  if (program == "help") {
    help(lvl);
    return RES.Success;
  }
  /* Implementation main function */ 
  switch(lvl) {
    case L.lesson1_1:
      lesson1_1();
      break;
    case L.lesson1_2:
      lesson1_2();
      break;
    case L.lesson1_3:
      lesson1_3();
      break;
    case L.lesson1_4:
      lesson1_4();
      break;
    default:
  }
  return RES.Success;

  /* --------- Private functions --------- */

  /* Lesson 1_1: Echo */
  function lesson1_1() {
    var arguments = getArguments(command);
    if ((program == "Echo") && (arguments.length == 0)) {
      jqconsole.Write(program + errorCmd);
      jqconsole.Write(success);
      changeLevel();
      //changeTutorial(L.lesson3_6);
      return RES.Success;
    }
    jqconsole.Write('\x1b[33mJust try typing Echo\x1b[0m\n');
    return RES.Fail;
  }

  /* Lesson 1_2: echo */
  function lesson1_2() {
    if(program == "echo") {
      if (processCommand(command) == RES.Success) {
        jqconsole.Write(success);
        changeLevel();
      }
      return RES.Success;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Lesson 1_3: help */
  function lesson1_3() {
    if (program == "echo") {
      if (processCommand(command) == RES.Help) {
        jqconsole.Write(success);
        changeLevel();
        return RES.Success;
      }
      return RES.Success;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Lesson 1_4: clear */
  function lesson1_4() {
    // skip echo 
    if (program == "echo") {
      if (processCommand(command) == RES.Success) {
        return RES.Success;
      }
    }
    if (program == "clear" ) {
      if (processCommand(command) == RES.Success) {
        changeTutorial(L.lesson2_1);
      }
      return RES.Success;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Tutorial 1 help function */
  function help(lvl) {
    switch(lvl) {
      case L.lesson1_1:
        jqconsole.Write("\x1b[33mType Echo and press Enter.\x1b[0m\n");
        break;
      case L.lesson1_2:
        jqconsole.Write("\x1b[33mType echo follow by anything you want.\x1b[0m\n");
        break;
      case L.lesson1_3:
        jqconsole.Write("\x1b[33mI see that you know the help command, now type echo --help.\x1b[0m\n");
        break;
      case L.lesson1_4:
        jqconsole.Write("\x1b[33mType clear to reset the shell.\x1b[0m\n");
        break;
      default:
    }
    return RES.Success;
  }

}
