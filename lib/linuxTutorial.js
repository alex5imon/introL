var L = 
{
  lesson1_1: 0, lesson1_2: 1, lesson1_3: 2, lesson1_4: 3,					// Tutorial 1: intro to linux 
  lesson2_1: 20, lesson2_2: 21, lesson2_3: 22, lesson2_4: 23, lesson2_5: 24, lesson2_6: 25,	// Tutorial 2: directory operations
  lesson3_1: 30, lesson3_2: 31, lesson3_3: 32, lesson3_4: 33, lesson3_5: 34, lesson3_6: 35	// Tutorial 3: file operations
};

var RES = { Fail: 0, Success: 1, Help: 2 }; // Result of processCommand function

/* Global variables */
var level   	= L.lesson1_1; // Current lesson
var step    	= 0;           // Current step within a lesson
// Output messages
var success 	= '\x1b[36mSuccess!\x1b[0m\n';
var errorCmd   	= ': \x1b[31mcommand not found\x1b[0m\n';
var errorDir 	= ': \x1b[31mNo such file or directory\x1b[0m\n';
// Prompts
var prompt1 	= 'pi@Kano:';
var prompt2 	= '$ ';

/* Main function */
function runLesson(command) {
  /* Implementation main function */ 
  switch(level) {
    case L.lesson1_1:
    case L.lesson1_2:
    case L.lesson1_3:
    case L.lesson1_4:
      runTutorial1(level, command);
      break;
    case L.lesson2_1:
    case L.lesson2_2:
    case L.lesson2_3:
    case L.lesson2_4:
    case L.lesson2_5:
    case L.lesson2_6:
      runTutorial2(level, command);
      break;
    case L.lesson3_1:
    case L.lesson3_2:
    case L.lesson3_3:
    case L.lesson3_4:
    case L.lesson3_5:
    case L.lesson3_6:
      runTutorial3(level, command);
      break;
    default:
  }
  return true;
}

/* Change tutorial */
function changeTutorial(tutorial) {
  document.getElementById('systemImg').style.visibility='visible';
  level = tutorial;
  step  = 0;
  FileSystem(); // create filesystem
  initFileSystem();
  updateText(level);
}	

/* Change level */
function changeLevel() {
  level++;
  step = 0;
  initFileSystem();
  updateText(level);
}
