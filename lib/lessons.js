var L = 
{
  lesson1_1: 0, lesson1_2: 1, lesson1_3: 2,	// Tutorial 1: introduction to linux 
  lesson2_1: 20, lesson2_2: 21, lesson2_3: 22, lesson2_4: 23, lesson2_5: 24, lesson2_6: 25	// Tutorial 2: directory operations
  												// Tutorial 3: file operations
};

// Global variables
var level   = L.lesson1_1; // Current lesson
var step    = 0; // Current step within a lesson
var success = '\x1b[36mSuccess!\x1b[0m\n';
var error   = ': \x1b[31mcommand not found\x1b[0m\n';
var prompt1 = 'pi@Kano:';

/* Main function */
function runLesson(command) {
  var program = getProgram(command);

  /* Implementation main function */ 
  switch(level) {
    case L.lesson1_1:
      lesson1_1();
      break;
    case L.lesson1_2:
      lesson1_2();
      break;
    case L.lesson1_3:
      lesson1_3();
      break;
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
  return false;

  /* --------- Private functions --------- */

  /* Change tutorial */
  function changeTutorial(tutorial) {
    document.getElementById('systemImg').style.visibility='visible';
    level = tutorial;
    step  = 0;
    FileSystem(); // create filesystem
    updateText(level);
  }	

  /* Change level */
  function changeLevel() {
    level++;
    step = 0;
    initFileSystem();
    updateText(level);
  }
  
  /* --------- Lesson implementations --------- */

  /* Lesson 1_1: Echo */
  function lesson1_1() {
    if(program == "Echo")
    {
      changeLevel();
      jqconsole.Write(command + error);
      return;
    }
    jqconsole.Write('\x1b[31mJust try typing Echo\x1b[0m\n');
  }

  /* Lesson 1_2: echo */
  function lesson1_2() {
    if(program == "echo")
    {
      if (processCommand(command)) {
        jqconsole.Write(success);
        changeLevel();
      }
      return;
    }
    jqconsole.Write(program + error);
  }

  /* Lesson 1_3: clear */
  function lesson1_3() {
    // skip echo 
    if (program == "echo") {
      if (processCommand(command)) {
        return true;
      }
    }
    if (program == "clear" ) {
      if (processCommand(command)) {
        changeTutorial(L.lesson2_1);
        //setTimeout(function(){changeTutorial(L.lesson2_1);}, 2000); // wait 2 secs before continuing
      }
      return;
    }
    jqconsole.Write(program + error);
  }

  /* Lesson 2_1: ls */
  function lesson2_1() {
    if (program == "clear" || program == "ls") {
        if (processCommand(command)) {
          jqconsole.Write(success);
          changeLevel();
        }
	return;
    }
    jqconsole.Write(program + error);
  }

  /* Lesson 2_2: cd */
  function lesson2_2() {
    // skip clear and ls 
    if (program == "clear" || program == "ls") {
      if (processCommand(command)) {
        return true;
      }
    }
    if (program == "cd") {
        var arguments = getArguments(command);
        if (arguments.length == 0 || (arguments[0] != 'home' && arguments[0] != '/home' && arguments[0] != 'home/')) {
          jqconsole.Write('\x1b[31mBetter try /home as parameter\x1b[0m\n');
          return;
        }
	if (processCommand(command)) {
          jqconsole.Write(success);
          changeLevel();
        }
	return;
    }
    jqconsole.Write(program + error);
  }

  /* Lesson 2_3: mkdir */
  function lesson2_3() {
    // skip clear and ls 
    if (program == "clear" || program == "ls") {
      if (processCommand(command)) {
        return true;
      }
    }
    if (program == "cd") {
      jqconsole.Write('\x1b[36mYou are in the correct place. Let\'s create that dir!\x1b[0m\n');
      return;
    }
    if (program == "mkdir") {
      var arguments = getArguments(command);
      if (arguments.length == 0 || (arguments[0] != 'Kano' && arguments[0] != '/Kano')) {
        jqconsole.Write('\x1b[31mTry /Kano as parameter\x1b[0m\n');
        return;
      }
      if (processCommand(command)) {
        jqconsole.Write(success);
        changeLevel();
        document.getElementById("systemImg").src = "images/filesystem2.png";
      }
      return;
    }
    jqconsole.Write(program + error);
  }

  /* Lesson 2_4: pwd */
  function lesson2_4() {
    // skip clear, cd and ls 
    if (program == "clear" || program == "cd" || program == "ls" ){
        if (processCommand(command)) {
          return true;
        }
        jqconsole.Write(program + error);
    }
    else {
      if (program == "pwd") {
	if (processCommand(command)) {
          jqconsole.Write(success);
          changeLevel();
        }
	return;
      }
      jqconsole.Write(program + error);
    }
  }

  /* Lesson 2_5: cd && cd .. */
  function lesson2_5() {
    // skip clear and ls 
    if (program == "clear" || program == "ls") {
      if (processCommand(command)) {
        return true;
      }
    }
    if (program == "cd") {
        var arguments = getArguments(command);
        if (step == 0 && arguments[0] != '..') {
          jqconsole.Write('\x1b[31mTry first cd ..\x1b[0m\n');
          return;
        }
        if (step == 1 && arguments.length != 0) {
          jqconsole.Write('\x1b[31mBetter try cd with no arguments\x1b[0m\n');
          return;
        }
	if (processCommand(command)) {
          if (step == 1) {
            jqconsole.Write(success);
            changeLevel();
            return;
          }
          step++;
        }
	return;
    }
    jqconsole.Write(program + error);
  }

  /* Lesson 2_6: rmdir */
  function lesson2_6() {
    if (generalCommand(command)) {
        return true;
    }
    else {
      if (program == "rmdir") {
        // Protection: power to remove only TMP
        var arguments = getArguments(command);
        if (arguments[arguments.length -1] != 'TMP') {
          jqconsole.Write('\x1b[31mPermission denied.\x1b[0m\n');
          return;
        }
	if (processCommand(command)) {
          jqconsole.Write(success);
          //changeLevel();
        }
	return;
      }
      jqconsole.Write(program + error);
    }
  }
}
