
/* Main function */
function runTutorial3(lvl, command) {
  var program = getProgram(command);

  if (program == "help") {
    help(lvl);
    return RES.Success;
  }
  /* Implementation main function */ 
  switch(lvl) {
    case L.lesson3_1:
      lesson3_1();
      break;
    case L.lesson3_2:
      lesson3_2();
      break;
    case L.lesson3_3:
      lesson3_3();
      break;
    case L.lesson3_4:
      lesson3_4();
      break;
    case L.lesson3_5:
      lesson3_5();
      break;
    case L.lesson3_6:
      lesson3_6();
      break;
    default:
  }
  return RES.Success;

  /* --------- Private functions --------- */

  /* Lesson 3_1: mv */
  function lesson3_1() {
    if (program == "mv") {
      var arguments = getArguments(command);
      if (arguments != null && arguments[0] == "--help") {
        return processCommand(command);
      }
      else if (arguments.length < 2) {
        jqconsole.Write("mv: \x1b[31mmissing destination file operand\nTry \'mv --help\' for more information.\x1b[0m\n");
        return RES.Fail;
      }
      // Get the source directory (can be given as Path/To/Source)
      var sourceDir = getDirectory(arguments[0], true);
      if (sourceDir == null) {
          return RES.Fail;
      }
      // step 0: rename
      if (step == 0) {
        if (sourceDir.fname != 'renameMe' || arguments[1] != 'myFile') {
          jqconsole.Write("\x1b[33mUse \'renameMe\' and \'myFile\' as first and second arguments.\x1b[0m\n");
          return RES.Fail;
        }
        else if (processCommand(command) != RES.Fail) {
          jqconsole.Write("\x1b[36mExcellent! Now move the file\x1b[0m\n");
          step++;
        }
	      return RES.Success;
      }
      // step 1: move
      if (step == 1) {
        var targetDir = getDirectory(arguments[1], true);
        if (targetDir == null || targetDir.fname != 'Kano') {
          jqconsole.Write("\x1b[33mMove myFile to home/Kano\x1b[0m\n");
          return RES.Fail;
        }
        if (processCommand(command) != RES.Fail) {
          jqconsole.Write(success);
          changeLevel();
          return RES.Success;
        }
      }
    }
    else if (generalCommand(command)) {
      return RES.Success;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Lesson 3_2: cp and rm */
  function lesson3_2() {
    if (generalCommand(command)) {
      return RES.Success;
    }
    var arguments = getArguments(command);
    if (arguments == null || arguments.length == 0) {
      jqconsole.Write(program + ": \x1b[31mmissing source file operand\nTry \'" + program +" --help\' for more information.\x1b[0m\n");
      return RES.Fail;
    }
    else if (arguments[0] == "--help") {
      return processCommand(command);
    }
    // Get the source directory (can be given as Path/To/Source)
    var sourceDir = getDirectory(arguments[0], true);
    if (sourceDir == null) {
      return RES.Fail;
    }
    // step 0: copy
    if ((program == "cp") && (step == 0)) {
      if (arguments.length < 2) {
        jqconsole.Write("cp: \x1b[31mmissing destination file operand\nTry \'cp --help\' for more information.\x1b[0m\n");
        return RES.Fail;
      }
      // Get the target directory (can be given as Path/To/Source)
      var targetPath = arguments[1].split("/");
      var targetName = targetPath.pop(); // Remove file name
      var targetDir = getDirectory(targetPath.join('/'), true);
      if (targetDir == null) {
        return RES.Fail;
      }
      if (sourceDir.fname != 'myFile') {
        jqconsole.Write("\x1b[33mThe file that needs to be copied is \'myFile\'\x1b[0m\n");
        return RES.Fail;
      }
      if (targetName != 'myCopy') {
        jqconsole.Write("\x1b[33mCall the new file \'myCopy\'\x1b[0m\n");
        return RES.Fail;
      }
      if (targetDir.fname != 'Kano') {
        jqconsole.Write("\x1b[33mCreate the file in your \'home directory\'\x1b[0m\n");
        return RES.Fail;
      }
      if (processCommand(command) == RES.Success) {
        jqconsole.Write("\x1b[36mExcellent! Now remove the file\x1b[0m\n");
        step++;
      }
      return RES.Success;
    }
    // remove
    else if ((program == "rm") && (step == 1)) {
      var arg0 = arguments[0];
      if (arg0 == '--help') {
        return processCommand(command);
      }
      if (sourceDir.fname != 'myCopy') {
        jqconsole.Write("\x1b[33mRemove the file you just created (\'myCopy\')\x1b[0m\n");
        return RES.Fail;
      }
      if (processCommand(command) == RES.Success) {
        jqconsole.Write(success);
        changeLevel();
        return RES.Success;
      }
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Lesson 3_3: cat, head and tail */
  function lesson3_3() {
    var arguments = getArguments(command);
    if (arguments != null && arguments[0] == "--help") {
      return processCommand(command);
    }
    // step 0: cat
    else if ((program == "cat") && (step == 0)) {
      if (processCommand(command) != RES.Fail) {
        jqconsole.Write("\x1b[36mWow that\'s a big file! Try head to see the difference.\x1b[0m\n");
        step++;
        return RES.Success;
      }
      return RES.Fail;
    }
    // step 1: head
    else if ((program == "head") && (step == 1)) {
      if (processCommand(command) != RES.Fail) {
        jqconsole.Write("\x1b[36mThat\'s better. Now let\'s print the end of the file instead.\x1b[0m\n");
        step++;
        return RES.Success;
      }
      return RES.Fail;
    }
    // step 2: tail
    else if ((program == "tail") && (step == 2)) {
      if (processCommand(command) != RES.Fail) {
        jqconsole.Write(success);
        changeLevel();
        return RES.Success;
      }
      return RES.Fail;
    }
    else if (generalCommand(command) != RES.Fail) {
      return RES.Success;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Lesson 3_4: wc */
  function lesson3_4() {
    // wc
    if (program == "wc") {
      if (processCommand(command) == RES.Success) {
        jqconsole.Write(success);
        changeLevel();
        return RES.Success;
      }
      return RES.Fail;
    }
    // Allow cat, head and tail 
    else if (program == "cat" || program == "head" || program == "tail" ) {
     	if (processCommand(command) != RES.Fail) {
       	return RES.Success;
     	}
    }
    else if (generalCommand(command) != RES.Fail) {
      return RES.Success;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Lesson 3_5: grep */
  function lesson3_5() {
    // clear to complete
    if (program == "clear" && step == 1) {
      if (processCommand(command) != RES.Fail) {
        changeLevel();
        return RES.Success;
      }
    }
    // grep
    if (program == "grep") {
      if (processCommand(command) == RES.Success && step == 0) {
          jqconsole.Write("\x1b[36mSuccess! Type \'clear\' to continue.\x1b[0m\n");
          step++;
      }
      return RES.Success;
    }
    else if (generalCommand(command) != RES.Fail) {
      return RES.Success;
    }
    // Allow wc, cat, head and tail 
    else if (program == "wc" || program == "cat" || program == "head" || program == "tail" ) {
     	if (processCommand(command) != RES.Fail) {
       	return RES.Success;
     	}
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }
  
  /* Lesson 3_6: */
  function lesson3_6() {
    if (step == 0) {
      if (generalCommand(command) != RES.Fail) {
        return RES.Success;
      }
      else if ((program == "grep") || (program == "wc") || (program == "mv")) {
        return processCommand(command);
      }
      // Only allow cat/head/tail under home/Kano
      else if ( (program == "cat") || (program == "head") || (program == "tail") ) {
        var arg0 = getNArgument(command, 0);
        if (arg0 == '--help') {
          return processCommand(command);
        }
        var f = getDirectory(arg0, true);
        if (f == null) {
          return RES.Fail;
        } 
        else if (f.file == true) {
          if (f.father.fname != 'Kano') {
            jqconsole.Write("\x1b[33mAccess denied. Try moving the file to your home directory.\x1b[0m\n");
            return RES.Fail;
          }
          if (processCommand(command) != RES.Fail) {
            return RES.Success;
          } 
        }
        else if (arg0 != "") {
          jqconsole.Write(program +": \x1b[31m" + arg0 + ": is a directory \x1b[0m\n");
        }
        return RES.Fail;
      }
      // Su command
      else if (program == "su") {
        var res = processCommand(command);
        if (res == RES.Success) {
          step++;   
          return RES.Success;
        }
        else if (res == RES.Help) {
          return RES.Help;
        }
      }
    }
    // Su mode
    if (step == 1) {
      if (doSU_Pass(command,"11060")) {
        jqconsole.Write(success);
        step++;
        //ChangeTutorial(L.lesson4_1);
        return RES.Success;
      }
      step--;
      return RES.Fail;
    }
    jqconsole.Write(program + errorCmd);
    return RES.Fail;
  }

  /* Tutorial 3 help function */
  function help(lvl) {
    switch(lvl) {
      case L.lesson3_1:
      	var str = (step == 0) ? "\x1b[33mType \'mv renameMe myFile\' to rename the file.\x1b[0m\n" : "\x1b[33mUse \'mv myFile path/to/home/dir\' to move the file.\x1b[0m\n";
      	jqconsole.Write(str);
      	break;
    	case L.lesson3_2:
      	var str = (step == 0) ? "\x1b[33mType \'cp myFile myCopy\' to make a copy.\x1b[0m\n" : "\x1b[33mUse \'rm myCopy\' to remove the file.\x1b[0m\n"
      	jqconsole.Write(str);
        break;
    	case L.lesson3_3:
        var str = "";
        if (step == 0) {
          str = "\x1b[33mUse \'cat myFile\' to display the entire content of the file.\x1b[0m\n";
        }
        else if (step == 1) {
          str = "\x1b[33mUse \'head myFile\' to display the first 10 lines of the file.\x1b[0m\n";
        }
        else {
          str = "\x1b[33mUse \'tail myFile\' to display the last 10 lines of the file.\x1b[0m\n";
        }
      	jqconsole.Write(str);
      	break;
    	case L.lesson3_4:
        jqconsole.Write("\x1b[33mType \'wc myFile\' to display information about the file.\x1b[0m\n");
      	break;
    	case L.lesson3_5:
      	var str = (step == 0) ? "\x1b[33mType \'grep word myFile\'.\n" : "\x1b[33mUse \'clear\' to continue.\x1b[0m\n";
      	jqconsole.Write(str);
      	break;
    	case L.lesson3_6:
      	var str = (step == 0) ? "\x1b[33mFind the mystery file and read it to discover the password.\x1b[0m\n" : "\x1b[33mType \'su\' and enter the password.\x1b[0m\n";
      	jqconsole.Write(str);
        break;
    	default:
  	}
  	return RES.Success;
  }

}
