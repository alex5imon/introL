/* Gets the program from a command */
function getProgram(command)
{
  command = command.replace(/(^\s+|\s+$)/g, ''); // trim whitespaces at the beginning and the end
  var n = command.split(" ");
  return n[0];
}

/* Gets all arguments from a command */
function getArguments(command)
{
  command = command.replace(/(^\s+|\s+$)/g, ''); // trim whitespaces at the beginning and the end
  var n = command.split(" ");
  // remove the program
  n.shift();
  // remove spaces an other redundant characters
  for (var i=0; i<n.length; i++) {
    var arg = n[i];
    if (arg == "" || arg == " " || arg == "./") {
      n.splice(i, 1);
      i--;
    }
    else {
      arg = arg.replace(/(^\.\/)/g, '');     // remove any './' at the beginning 
      arg = arg.replace(/(^\s+|\s+$)/g, ''); // trim whitespaces at the beginning and the end
      arg = arg.replace(/\/$/, '');          // remove any '/' at the end 
      n[i] = arg;
    }
  }
  return n;
}

/* Gets argument n from a command */
function getNArgument(command, index)
{
   var n = getArguments(command);
   if( n.length > index) {
     return n[index];
   }
   return "";
}

/* Check if general command */
function generalCommand(cmd) {
  var prog = getProgram(cmd);
  if (prog == "clear" || prog == "ls" || prog == "cd" || prog == "echo" || prog == "pwd") {
    processCommand(cmd);
    return RES.Success;
  }
  return RES.Fail;
}

/* Main function */
function processCommand(command) {
  var program = getProgram(command);

  /* Implementation main function */ 
  var arg0 = getNArgument(command, 0);
  if ((arg0 != null) && (arg0 == "--help")) {
    processHelp(program);
    return RES.Help;
  }
  switch(program) {
    case "clear":
      jqconsole.Reset();
      return RES.Success;
    case "ls":
      return doLS(arg0);
    case "cd":
      return doCD(arg0);
    case "echo":
      return doECHO( getArguments(command) );
    case "pwd":
      jqconsole.Write( doPWD()  + "\n");
      return RES.Success;
    case "mkdir":
      return doMKDIR(arg0);
    case "rmdir":
      return doRMDIR(arg0);
    case "mv":
      return doMV(arg0, getNArgument(command, 1));
    case "cp":
      return doCP(arg0, getNArgument(command, 1));
    case "rm":
      return doRM(arg0);
    case "cat":
      return doCAT(arg0);
    case "head":
      return doHEAD(arg0);
    case "tail":
      return doTAIL(arg0);
    case "wc":
      return doWC(arg0);
    case "grep":
      return doGREP(arg0, getNArgument(command, 1));
    case "su":
      return doSU();
  }
  return RES.Fail;  
}

/* Print help for each command */
function processHelp(program) {
  switch(program) {
    case "clear":
      jqconsole.Write("\x1b[33mclear: Resets the shell.\x1b[0m\n");
      break;
    case "ls":
      jqconsole.Write("\x1b[33mls [options] [files]: Lists files in the given directory.\x1b[0m\n");
      break;
    case "cd":
      jqconsole.Write("\x1b[33mcd [directory]: Sets your current directory.\x1b[0m\n");
      break;
    case "echo":
      jqconsole.Write("\x1b[33mecho [input]: Prints the given arguments on standard output.\x1b[0m\n");
      break;
    case "pwd":
      jqconsole.Write("\x1b[33mpwd: Prints the current directory.\x1b[0m\n");
      break;
    case "mkdir":
      jqconsole.Write("\x1b[33mmkdir [options] directories: creates a directory.\x1b[0m\n");
      break;
    case "rmdir":
      jqconsole.Write("\x1b[33mrmdir [options] directories: deletes empty directories.\x1b[0m\n");
      break;
    case "mv":
      jqconsole.Write("\x1b[33mmv [options] source target: renames or moves a file.\x1b[0m\n");
      break;
    case "cp":
      jqconsole.Write("\x1b[33mcp [options] files: copies a file.\x1b[0m\n");
      break;
    case "rm":
      jqconsole.Write("\x1b[33mrm [options] files: removes a file.\x1b[0m\n");
      break;
    case "cat":
      jqconsole.Write("\x1b[33mcat [options] files: prints a file to standard output.\x1b[0m\n");
      break;
    case "head":
      jqconsole.Write("\x1b[33mhead [options] files: prints the first 10 lines of a file.\x1b[0m\n");
      break;
    case "tail":
      jqconsole.Write("\x1b[33mtail [options] files: prints the last 10 lines of a file.\x1b[0m\n");
      break;
    case "wc":
      jqconsole.Write("\x1b[33mwc [options] files: prints the number of lines, words and bytes in a text file.\x1b[0m\n");
      break;
    case "grep":
      jqconsole.Write("\x1b[33mgrep [options] pattern file: prints those lines of the given file that match the pattern.\x1b[0m\n");
      break;
    case "su":
      jqconsole.Write("\x1b[33msu [options] [user]: to login as superuser.\x1b[0m\n");
      break;
  }
}
