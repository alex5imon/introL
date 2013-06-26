/* Main function */
function runTutorial2(lvl, command) {
  var program = getProgram(command);

  if (program == "help") {
    help(lvl);
    return RES.Success;
  }
  /* Implementation main function */ 
  switch(lvl) {
    case L.lesson2_1:
      lesson2_1();
      break;
    case L.lesson2_2:
      lesson2_2();
      break;
    case L.lesson2_3:
      lesson2_3();
      break;
    case L.lesson2_4:
      lesson2_4();
      break;
    case L.lesson2_5:
      lesson2_5();
      break;
    case L.lesson2_6:
      lesson2_6();
      break;
    default:
  }
  return RES.Success;

  /* --------- Private functions --------- */

  /* Lesson 2_1: ls */
  function lesson2_1() {
    if (program == "ls") {
      args = getArguments(command);
      if (args.length > 0) {
        jqconsole.Write('\x1b[33mTry ls with no arguments for now.\x1b[0m\n');
        return RES.Fail;
      }
      else if (processCommand(command) == RES.Success) {
          jqconsole.Write(success);
          changeLevel();
          return RES.Success;
      }
      return RES.Success;
    }
    // Allow clear and echo
    else if ( (program == "clear") || (program == "echo")) {
      if (processCommand(command) != RES.Fail) {
        return RES.Success;
      }
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Lesson 2_2: cd */
  function lesson2_2() {
    if (program == "cd") {
  		var argument = getNArgument(command, 0);
   		if (argument == null || (argument != 'home' && argument != '/home' && argument != '--help')) {
     		jqconsole.Write('\x1b[33mBetter try /home as argument\x1b[0m\n');
       	return RES.Fail;
    	}
			if (processCommand(command) == RES.Success) {
       	jqconsole.Write(success);
       	changeLevel();
     	}
			return RES.Success;
    }
    // Allow clear, ls and echo 
    else if ((program == "clear") || (program == "ls") || (program == "echo")) {
      if (processCommand(command) != RES.Fail) {
        return RES.Success;
      }
      return RES.Fail;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Lesson 2_3: pwd */
  function lesson2_3() {
    if (program == "pwd") {
		  if (processCommand(command) == RES.Success) {
        jqconsole.Write(success);
        changeLevel();
      }
		  return RES.Success;
    }
    // Allow clear, ls and echo 
    else if (program == "clear" || program == "ls" || program == "echo" ) {
      if (processCommand(command) != RES.Fail) {
       	return RES.Success;
      }
    }
    // Do not allow cd
    else if (program == "cd") {
      jqconsole.Write('\x1b[33mUse pwd instead to print the current directory.\x1b[0m\n');
      return RES.Fail;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Lesson 2_4: mkdir */
  function lesson2_4() {
    if (program == "mkdir") {
      var argument = getNArgument(command, 0);
      if (argument == null || (argument != 'Kano' && argument != '/Kano' && argument != '--help')) {
        jqconsole.Write('\x1b[33mTry /Kano as parameter\x1b[0m\n');
        return RES.Fail;
      }
      if (processCommand(command) == RES.Success) {
        step++;
        document.getElementById("systemImg").src = "images/filesystem2.png";
        jqconsole.Write('\x1b[36mExcellent! Use ls to see your new directory.\x1b[0m\n');
      }
      return RES.Success;
    }
    else if (program == "ls") {
      var args = getArguments(command);
      if (args.length > 0) {
        jqconsole.Write('\x1b[33mUse ls with no arguments to list files in the current directory.\x1b[0m\n');
        return RES.Fail;
      }
      else if (processCommand(command) != RES.Fail) {
        if (step == 1) {
          jqconsole.Write(success);
          changeLevel();
        }
        return RES.Success;
      }
    }
    // Allow clear and echo 
    else if (program == "clear" || program == "echo") {
      if (processCommand(command) != RES.Fail) {
        return RES.Success;
      }
    }
    // Do not allow cd
    else if (program == "cd") {
      jqconsole.Write('\x1b[33mYou are in the correct place. Let\'s create that dir!\x1b[0m\n');
      return RES.Fail;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Lesson 2_5: cd && cd .. */
  function lesson2_5() {
    if (program == "cd") {
      var argument = getNArgument(command, 0);
      if (step == 0 && argument != '..' && argument != '--help') {
        jqconsole.Write('\x1b[33mTry first cd ..\x1b[0m\n');
        return RES.Fail;
      }
      if (step == 1 && argument != '--help' && argument != "" && argument != "~") {
        jqconsole.Write('\x1b[33mBetter try cd with no arguments\x1b[0m\n');
        return RES.Fail;
      }
      if (processCommand(command) == RES.Success) {
        if (step == 1) {
          jqconsole.Write(success);
          changeLevel();
          return RES.Success;
        }
        step++;
        jqconsole.Write('\x1b[36mThat\'s it! Current directory is root, use cd to go to home/Kano\x1b[0m\n');
      }
      return RES.Success;
    }
    // Allow clear, ls, pwd and echo 
    else if (program == "clear" || program == "ls" || program == "pwd" || program == "echo" ) {
      if (processCommand(command) != RES.Fail) {
       	return RES.Success;
      }
      return RES.Fail;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Lesson 2_6: rmdir */
  function lesson2_6() {
    if (generalCommand(command)) {
      return RES.Success;
    }
    else if (program == "rmdir") {
      // Protection: power to remove only TMP
      var dir = getLastDir(command);
      var arg0 = getNArgument(command, 0);
      if (dir != 'TMP' && arg0 != 'TMP' && arg0 != '--help') {
        jqconsole.Write('rmdir: \x1b[31mPermission denied.\x1b[0m\n');
        return RES.Fail;
      }
      if (processCommand(command) == RES.Success) {
        jqconsole.Write(success);
        changeTutorial(L.lesson3_1);
      }
      return RES.Success;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Tutorial 2 help function */
  function help(lvl) {
    switch(lvl) {
      case L.lesson2_1:
        jqconsole.Write("\x1b[33mType ls to list the directories under the current directory.\x1b[0m\n");
      	break;
      case L.lesson2_2:
      	jqconsole.Write("\x1b[33mType cd /home to go to /home.\x1b[0m\n");
        break;
      case L.lesson2_3:
      	jqconsole.Write("\x1b[33mType pwd to print the current directory.\x1b[0m\n");
      	break;
      case L.lesson2_4:
        var str = (step == 0) ? "\x1b[33mType mkdir /Kano to create a new directory.\x1b[0m\n" : "\x1b[33mType ls.\x1b[0m\n"
      	jqconsole.Write(str);
      	break;
      case L.lesson2_5:
      	var str = (step == 0) ? "\x1b[33mType cd .. to go up a level.\x1b[0m\n" : "\x1b[33mType \'cd\' (no arguments) to go to your home directory.\x1b[0m\n"
      	jqconsole.Write(str);
      	break;
      case L.lesson2_6:
      	jqconsole.Write("\x1b[33mLook in directories other than /home.\x1b[0m\n");
      	break;
      default:
    }
    return RES.Success;
  }

}
