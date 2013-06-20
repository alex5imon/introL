// Global variables
var currentDir;

/* Create the basic File System */
function FileSystem() {
    // Root
    var r = { fname: "/",
              father: null,
    	        children: new Array() };
    this.root = r;
    // bin (0)
    var bin = { fname: "bin",
                father: this.root,
    	          children: null };
    this.root.children.push(bin);
    // etc (1)
    var etc = { fname: "etc",
                father: this.root,
    	          children: null };
    this.root.children.push(etc);
    // home (2)
    var home = { fname: "home",
                 father: this.root,
    	           children: null };
    this.root.children.push(home);
    // var (3)
    var varD = { fname: "var",
                 father: this.root,
    	           children: null };
    this.root.children.push(varD);
    // usr (4)
    var usr = { fname: "usr",
                father: this.root,
    	          children: null };
    this.root.children.push(usr);
    // 
    currentDir = this.root;
}

/* Initialise the filesystem given the current level */
function initFileSystem() {
  switch(level) {
    case L.lesson2_6:
      // Hide system image
      document.getElementById('systemImg').style.visibility='hidden';
      // Add folder TMP in /usr
      var tmp = { fname: "TMP",
                  father: this.root.children[4],
    	            children: null };
      if (this.root.children[4].children == null) {
        this.root.children[4].children = new Array();
      }
      this.root.children[4].children.push(tmp);
      break;
    case L.lesson3_1:
      document.getElementById('systemImg').style.visibility='visible';
      // Add file renameMe in /var
      var tmp = { fname: "renameMe",
                  father: this.root.children[3],
    	            children: null,
                  file: true };
      if (this.root.children[3].children == null) {
        this.root.children[3].children = new Array();
      }
      this.root.children[3].children.push(tmp);
      // Make sure home/Kano folder exists
      if (this.root.children[2].children == null) {
        this.root.children[2].children = new Array();
        var kano = { fname: "Kano",
                     father: this.root.children[2],
    	               children: null };
        this.root.children[2].children.push(kano);
      }
      break;
    case L.lesson3_6:
      // Hide system image
      document.getElementById('systemImg').style.visibility='hidden';
      // Add a file in /usr
      var tmp = { fname: "Password.txt",
                  father: this.root.children[4],
    	            children: null,
                  file: true };
      if (this.root.children[4].children == null) {
        this.root.children[4].children = new Array();
      }
      this.root.children[4].children.push(tmp);
      // Add a file in /etc
      var tmp2 = { fname: "Profile.txt",
                   father: this.root.children[1],
    	             children: null,
                   file: true };
      if (this.root.children[1].children == null) {
        this.root.children[1].children = new Array();
      }
      this.root.children[1].children.push(tmp2);
      // Make sure home/Kano folder exists
      if (this.root.children[2].children == null) {
        this.root.children[2].children = new Array();
        var kano = { fname: "Kano",
                     father: this.root.children[2],
    	               children: null };
        this.root.children[2].children.push(kano);
      }
      break;
    default:
  }
} // initFileSystem

/* Print list of files on the current directory */
function doECHO(arguments) {
  if( arguments.length > 0) {
 		jqconsole.Write( arguments.join(" ") + "\n");
  }
 	else {
   	jqconsole.Write("\n");
  }
 	return RES.Success;
}

/* Print list of files on the current directory*/
function doLS(dir) {
  var objDir = currentDir;

  if (dir != "") { // A relative path has been provided
    objDir = getDirectory(dir, true);
    if( objDir == null ) {
      return RES.Fail;
    }
  }
  
  if( objDir.children == null ) {
    jqconsole.Write("\n");
    return RES.Success;
  }
  // Create a list with all the files
  var files = new Array();
  for(var i=0; i<objDir.children.length; i++) {
    files.push(objDir.children[i].fname + "\t"); 
  }
  // Print the files
  jqconsole.Write(files.join(" ") + "\n");
  return RES.Success;
} // doLS

/* Changes the current directory */
function doCD(dir) {
  var oldDir = currentDir;

  if (dir == "") { // Go to /home/Kano
    currentDir = this.root.children[2];
    for (var i=0; (currentDir.children != null) && (i<currentDir.children.length); i++) {
      if (currentDir.children[i].fname == "Kano") {
        currentDir = currentDir.children[i];
	      jqconsole.SetPromptLabel(prompt1 + '~' + prompt2);
      }
    }
    return RES.Success;
  }
  var tmp = getDirectory(dir, true);
  if (tmp != null) {
    if (tmp.file == true) {
      jqconsole.Write("cd:\x1b[31m " + dir + ": Not a directory\x1b[0m\n");
      return RES.Fail;
    }
    currentDir = tmp;
    // change the prompt to current dir
    var str = (currentDir.fname == "Kano") ? '~' : doPWD();
    jqconsole.SetPromptLabel(prompt1 + str + prompt2);
    return RES.Success;
  }
  return RES.Fail;
} // doCD

/* Return the current directory */
function doPWD() {
  if (currentDir.fname == "/") {
    return currentDir.fname;
  }
  var str = '/' + currentDir.fname;
  var tmp = currentDir;
  while (tmp.father != null) {
    tmp = tmp.father;
    if (tmp.fname != '/') {
      str = '/' + tmp.fname + str;
    }
  }
  return str;
} // doPWD

/* Creates a new directory */
function doMKDIR(dir) {
  if (dir == "") {
    jqconsole.Write("mkdir: \x1b[31mmissing operand\nTry \'mkdir --help\' for more information.\x1b[0m\n");
    return RES.Fail;
  }
  var objDir = currentDir;
  var dirs   = dir.split("/");
  var newD   = dirs[dirs.length - 1];
  if (dirs.length > 1) { // A relative path has been provided
    var tmp = dirs;
    tmp.pop(); // Remove the folder name
    var path = tmp.join("/");
    objDir = getDirectory(path, true);
    if( objDir == null ) {
      return RES.Fail;
    }
  }
  // Check if a file already exists with that name
  for (var i=0; (objDir.children != null) && (i<objDir.children.length); i++) {
    if (objDir.children[i].fname == newD) {
      jqconsole.Write('mkdir: \x1b[31mcannot create directory ‘' + newD +'’: File exists\x1b[0m\n');
      return RES.Fail;
    }
  }

  var d = { fname: newD,
            father: objDir,
    	    children: null };
  if (objDir.children == null) {
    objDir.children = new Array();
  }
  objDir.children.push(d);
  return RES.Success;
} // doMKDIR

/* Deletes an existent directory */
function doRMDIR(dir) {
  if (dir == "") {
    jqconsole.Write("rmdir: \x1b[31mmissing operand\nTry \'rmdir --help\' for more information.\x1b[0m\n");
    return RES.Fail;
  }
  var objDir = currentDir;
  var dirs   = dir.split("/", 5);
  var deleteD = dirs[dirs.length - 1];
  if (dirs.length > 1) { // A relative path has been provided
    var tmp = dirs;
    tmp.pop(); // Remove the folder name
    var path = tmp.join("/");
    objDir = getDirectory(path, true);
    if( objDir == null ) {
      return RES.Fail;
    }
  }

  for (var i=0; (objDir.children != null) && (i<objDir.children.length); i++) {
    if (objDir.children[i].fname == deleteD) {
      // Check if the directory is empty
      if (objDir.children[i].children != null && objDir.children[i].children.length > 0) {
        jqconsole.Write('rmdir: \x1b[31mfailed to remove ‘' + deleteD +'’: Directory not empty\x1b[0m\n');
        return RES.Fail;
      }
      objDir.children.splice(i, 1);
      return RES.Success;
    }
  }
  jqconsole.Write(dir + errorDir);
  return RES.Fail;
} // doRMDIR

/* Renames or moves a file */
function doMV(source, target) {
  if (source == "") {
    jqconsole.Write("mv: \x1b[31mmissing source file operand\nTry \'mv --help\' for more information.\x1b[0m\n");
    return RES.Fail;
  }
  if (target == "") {
    jqconsole.Write("mv: \x1b[31mmissing destination file operand\nTry \'mv --help\' for more information.\x1b[0m\n");
    return RES.Fail;
  }
  var targetDir = getDirectory(target, false);
  var sourceDir = getDirectory(source, true);
  if ((sourceDir == null) || (sourceDir.file == false)) {
    return RES.Fail;
  }
  // Rename
  if (target.indexOf('/') == -1 && target.indexOf('~') == -1){
    sourceDir = getDirectory(source, true);
    sourceDir.fname = target;
    return RES.Success;
  }
  // Move
  else if (targetDir == null) {
    jqconsole.Write(target + errorDir);
    return RES.Fail;
  }
  // Delete the file from its parent
  for (var i=0; i<sourceDir.father.children.length; i++) {
    if (sourceDir.father.children[i].fname == sourceDir.fname) {
      sourceDir.father.children.splice(i, 1);
    }
  }
  // Add new file to directory
  var file = { fname: sourceDir.fname,
               father: targetDir,
    	       children: null,
               file: true };
  if (targetDir.children == null) {
    targetDir.children = new Array();
  }
  targetDir.children.push(file);
  return RES.Success;
} // doMV

/* Copies a file */
function doCP(source, target) {
  if (source == "") {
    jqconsole.Write("cp: \x1b[31mmissing source file operand\nTry \'cp --help\' for more information.\x1b[0m\n");
    return RES.Fail;
  }
  if (target == "") {
    jqconsole.Write("cp: \x1b[31mmissing destination file operand\nTry \'cp --help\' for more information.\x1b[0m\n");
    return RES.Fail;
  }
  var sourceDir = getDirectory(source, true);
  var targetPath = target.split("/");
  var targetName = targetPath.pop(); // Remove file name
  var targetDir = getDirectory(targetPath.join('/'), true);
  if (sourceDir != null && targetDir != null ) {
    // Add new file to directory
    var file = { fname: targetName,
                 father: targetDir,
    	           children: null,
                 file: true };
    targetDir.children.push(file);
    return RES.Success;
  }
  return RES.Fail;
} // doCP

/* Removes a file */
function doRM(target) {
  var targetDir = getDirectory(target, true);
  if (targetDir != null) {
    // Delete the file from its parent
    for (var i=0; i<targetDir.father.children.length; i++) {
      if (targetDir.father.children[i].fname == targetDir.fname) {
        targetDir.father.children.splice(i, 1);
        return RES.Success;
      }
    }
  }
  return RES.Fail;
} // doRM

/* Prints a file */
function doCAT(dir) {
  if (dir != "") {
    var file = getDirectory(dir, true);
    if (file != null) {
      if (file.file == true) {
        jqconsole.Write( getFileText(getLastDir(dir), 'cat') + '\n');
        return RES.Success;
      }
      jqconsole.Write("cat: \x1b[31m" + dir + ": is a directory \x1b[0m\n");
    }
  }
  return RES.Fail;
} // doCAT

/* Prints first lines of a file */
function doHEAD(dir) {
  if (dir != "") {
    var file = getDirectory(dir, true);
    if (file != null) {
      if (file.file == true) {
        jqconsole.Write( getFileText(getLastDir(dir), 'head') + '\n');
        return RES.Success;
      }
      jqconsole.Write("head: \x1b[31m" + dir + ": is a directory \x1b[0m\n");
    }
  }
  return RES.Fail;
} // doHEAD

/* Prints last lines of a file */
function doTAIL(dir) {
  if (dir != "") {
    var file = getDirectory(dir, true);
    if (file != null) {
      if (file.file == true) {
        jqconsole.Write( getFileText(getLastDir(dir), 'tail') + '\n');
        return RES.Success;
      }
      jqconsole.Write("tail: \x1b[31m" + dir + ": is a directory \x1b[0m\n");
    }
  }
  return RES.Fail;
} // doTAIL

/* Prints number of lines, words and bytes of a given file */
function doWC(dir) {
  if (dir != "") {
    var file = getDirectory(dir, true);
    if (file != null) {
      if (file.file == true) {
        jqconsole.Write( getFileText(getLastDir(dir), 'wc') + '\n');
        return RES.Success;
      }
      jqconsole.Write("wc: \x1b[31m" + dir + ": is a directory \x1b[0m\n");
    }
  }
  return RES.Fail;
} // doWC

/* Prints all lines that match the given word */
function doGREP(word, dir) {
  if (word == "") {
    jqconsole.Write("grep: \x1b[31mmissing pattern operand\nTry \'grep --help\' for more information.\x1b[0m\n");
    return RES.Fail;
  }
  if (dir == "") {
    jqconsole.Write("grep: \x1b[31mmissing file operand\nTry \'grep --help\' for more information.\x1b[0m\n");
    return RES.Fail;
  }
  var file = getDirectory(dir, true);
  if (file != null) {
    if (file.file == true) {
      var str = "";
      var text = getFileText(getLastDir(dir), 'cat').split("\n");
      for(var i = 0; i < text.length; i++) {
        if (text[i].indexOf(word) != -1) { // word found
          str += dir + ": " + text[i].replace(word,"\x1b[31m" + word + "\x1b[0m") + "\n";
        }
      }
      jqconsole.Write(str);
      return RES.Success;
    }
    jqconsole.Write("grep: \x1b[31m" + dir + ": is a directory \x1b[0m\n");
  }
  return RES.Fail;
} // doGREP

/* Enters superuser mode */
function doSU() {
  currentDir = jqconsole.GetPromptLabel();
  jqconsole.SetPromptLabel("Password:");
  jqconsole.Write("\x1b[37m");
  return RES.Success;
} // doSU

/* Checks the password correctness */
function doSU_Pass(input, pass) {
  if (input == pass) {
    jqconsole.SetPromptLabel(currentDir);
    jqconsole.Write("\x1b[0m");
    return RES.Success;
  }
  jqconsole.SetPromptLabel(currentDir);
  jqconsole.Write("su: \x1b[31mAuthentication failure\x1b[0m\n");
  return RES.Fail;
} // doSU

/* Gets the object of the given directory */
function getDirectory(dir, outE) {
  var outDir = currentDir;
  if (dir == null) {
    return null;
  }
  if (dir == "") {
    return outDir;
  }
  var dirs = dir.split("/");
  while (dirs.length != 0) {
    if (dirs[0]=="..") {
      if (outDir.father != null) {
        outDir = outDir.father;
        dirs.shift();
      }
      else if (dirs.length == 1) {
        return outDir;
      }
    }
    else if (dirs[0]=="~") {
      var dirHome = this.root.children[2];
      for (var i=0; (dirHome.children != null) && (i<dirHome.children.length); i++) {
        if (dirHome.children[i].fname == 'Kano') {
          outDir = dirHome.children[i];
          break;
        }
      }
      dirs.shift();
    }
    else {
      var found = false;
      for (var i=0; (outDir.children != null) && (i<outDir.children.length); i++) {
        if (dirs[0] == outDir.children[i].fname) {
          outDir = outDir.children[i];
          dirs.shift();
          found = true;
          break;
        }
      }
      if (!found) {
        // Dir not found: print error
        if (outE) {
          jqconsole.Write(dir + errorDir);
        }
        return null;
      }
    }
  }
  return outDir;
} // getDirectory

/* Given a path return the last name */
function getLastDir(dir) {
  var dirs = dir.split("/");
  return dirs[dirs.length-1];
} // getLastDir
