/* Update left panel text */
function updateText(lvl) {
  var title, instr;

  // Select the text per level
  switch(lvl) {
    case L.lesson1_2:
      title = 'Lesson 1.2: commands';
      instr = 'Ops sorry! I forgot to mention that Linux is case-sensitive, therefore <i>Echo</i> and <i>echo</i> are not the same.<br><br>A <i>command</i> is generally a program name (like <i>echo</i>) follow by options and arguments.<br><br>Let\'s try it again, type <b> echo what ever comes into your mind</b> and see what the output is.';
      break;
    case L.lesson1_3:
      title = 'Lesson 1.3: a bit of help';
      instr = 'That\'s right! The command <b>echo</b> prints on standard output whatever receives as argument.<br><br>The shell is your friend, type <b>help</b> for a tip on how to complete the lesson. You can also type <i>command --help</i> for specific information about a command.<br><br> For this exercise just try <b>echo --help</b>';
      break;
    case L.lesson1_4:
      title = 'Lesson 1.4: all clear';
      instr = 'Here is a little trick, you can access the <i>command history</i> by pressing the <b>up</b> and <b>down</b> arrows. Quite handy, eh?<br><br>If the terminal gets too messy you can use the <b>clear</b> command. Try it to continue.';
      break;
    case L.lesson2_1:
      title = 'Lesson 2.1: the File System';
      instr = 'This is where the fun begins. Now you will learn how to move between directories using the shell. The hierarchy of directories is called a <i>tree</i>, it starts on the <i>root directory</i>(/) and goes down through <i>subdirectories</i>.<br><br> One of the most used commands in Linux is <b>ls</b>, which <u>l</u>i<u>s</u>ts the content of a directory. Type it in and note how the output matches the file system on the right.';
      break;
    case L.lesson2_2:
      title = 'Lesson 2.2: let\'s move';
      instr = 'Navigation is simple, just use <b>cd path/to/directory</b> to <u>c</u>hange <u>d</u>irectories.<br><br>You currently are in the <i>root directory</i>(/). For this lesson, let\'s go to the <i>home</i> directory, just type <b>cd home</b>.';
      break;
    case L.lesson2_3:
      title = 'Lesson 2.3: where am I?';
      instr = 'Have you noticed how the terminal prompt has changed when you use \'cd\'? Now it shows \'/home$\' instead of just \'/$\' to indicate the <i>current directory</i>.<br><br>Another way to know this is by using the command <b>pwd</b> to <u>p</u>rint the <u>w</u>orking <u>d</u>irectory.';
      break;
    case L.lesson2_4:
      title = 'Lesson 2.4: let\'s start to create';
      instr = 'That was great! Moving through directories has no secrets thanks to <b>cd</b>, <b>ls</b> and <b>pwd</b>.<br><br> Let\'s create now your own user space. Use <b>mkdir /Kano</b> to <u>m</u>a<u>k</u>e a <u>dir</u>ectory. This will be your <i>home directory</i>, also known as <i>~</i>.';
      break;
    case L.lesson2_5:
      title = 'Lesson 2.5: home sweet home';
      instr = ' \'home/Kano\' is your <i>home directory</i>. To quickly navigate to it from anywhere try typing <b>cd</b> (no arguments). Once in your <i>home directory</i> you will notice that the prompt terminal changes to \'~\', how cool is that? You can use \'~\' instead of \'home/Kano\', for example use <b>ls ~</b> to list the files in your <i>home directory</i> from anywhere.<br><br> To go up in the tree hierarchy type <b>cd ..</b> as argument. Try first <b>cd ..</b> and then <b>cd</b> or <b>cd ~</b> to go back to your <i>home directory</i>.';
      break;
    case L.lesson2_6:
      title = 'Lesson 2.6: seek and destroy';
      instr = 'Excellent! You can now go anywhere you want, right? Let\'s prove it and this time with no help.<br><br> We have placed a folder called \'TMP\' somewhere in the system and given you permissions to remove it. Use the <u>r</u>e<u>m</u>ove directory command <b>rmdir TMP</b>, as well as <b>ls</b> and <b>cd</b>, to accomplish your mission. Good luck!';
      break;
    case L.lesson3_1:
      title = 'Lesson 3.1: rename and move';
      instr = 'Now that you have proved your skills working with directories, let\'s move to files.<br><br>There is a file in /var that needs to be renamed to \'myFile\' and then moved to your <i>home directory</i>. Use <b>mv renameMe myFile</b> and then <b>mv myFile destination</b> to rename and <u>m</u>o<u>v</u>e it. Please note that <i>destination</i> should be the path to your home directory (/home/Kano or ~).';
      break;
    case L.lesson3_2:
      title = 'Lesson 3.2: copycat';
      instr = 'You can <u>r</u>e<u>m</u>ove a file with the <b>rm</b> command or create a <u>c</u>o<u>p</u>y using the <b>cp</b> command.<br><br>Let\'s create a copy of the file in your <i>home directory</i> using <b>cp myFile myCopy</b> and remove it afterwards with <b>rm myCopy</b>.';
      break;
    case L.lesson3_3:
      title = 'Lesson 3.3: open sesame';
      instr = 'Now it\'s time to see what\'s inside that text file. There are different ways, use <b>cat</b> to con<u>cat</u>enate the entire content to the standard output, in other words, to print it on the terminal. Or use <b>head</b> and <b>tail</b> to display just the first or last 10 lines of the file respectively.<br><br>Type <b>cat myFile</b>, <b>head myFile</b> and <b>tail myFile</b> to see the difference betweeen the three commands.';
      break;
    case L.lesson3_4:
      title = 'Lesson 3.4: it all counts';
      instr = 'You can use <b>wc</b> to get information from a file: number of lines, <u>w</u>ord <u>c</u>ount and bytes.<br><br>Type <b>wc myFile</b> to display information about the text file.';
      break;
    case L.lesson3_5:
      title = 'Lesson 3.5: grep it Ralph!';
      instr = 'Now you will learn one of the most important and powerful commands: <b>grep</b>. Given a file, this command prints all lines that contain a given word.<br><br>Use <b>grep word myFile</b>, if \'word\' is on the text a line will be printed, try searching for \'Linux\' for example. Then type <b>clear</b> to continue to the next lesson.';
      break;
    case L.lesson3_6:
      title = 'Lesson 3.6: file master';
      instr = 'No more games, there is a password somewhere in the system and we need you to find it. Remember all the commands you have learn so far: <b>ls</b>, <b>cd</b>, <b>mv</b>, <b>cat</b>, <b>head</b>, <b>tail</b>, <b>wc</b>, <b>grep</b>...<br><br>Once you have the password, type <b>su</b>, press ENTER and introduce it. You will learn about <b>su</b> and more new commands during Tutorial 4: Permissions.';
      break;
    default:
      title = "";
      instr = "";
  }

  // Set the correct text
  document.getElementById("title").innerHTML= title;
  document.getElementById("instructions").innerHTML = instr;
}

/* Gets the text from a given file and a mode(program) */
function getFileText(name, program) {
  if (name == 'myFile') {
    if (program == 'wc') {
      return "46  438 2925 " + name;
    }
    if (program == 'head') {
      return "Linux is a Unix-like computer operating system assembled under the \nmodel of free and open source software development and distribution. \nThe defining component of Linux is the Linux kernel, an operating \nsystem kernel first released on 5 October 1991, by Linus Torvalds. \nSince the C compiler that builds Linux and the main supporting user \nspace system tools and libraries originated in the GNU Project, \ninitiated in 1983 by Richard Stallman, the Free Software \nFoundation prefers the name GNU/Linux.\n\nLinux was originally developed as a free operating system for Intel \nx86-based personal computers. It has since been ported to more";
    }
    if (program == 'tail') {
      return "resource intensive desktop such as LXDE or Xfce for use on older \nor less powerful computers. A distribution intended to run as a \nserver may omit all graphical environments from the standard install\n and instead include other software such as the Apache HTTP Server \nand an SSH server such as OpenSSH. Because Linux is freely \nredistributable, anyone may create a distribution for any intended \nuse. Applications commonly used with desktop Linux systems include \nthe Mozilla Firefox web browser, the LibreOffice office application \nsuite, and the GIMP image editor.";
    }
    if (program == 'cat') {
      return "Linux is a Unix-like computer operating system assembled under the \nmodel of free and open source software development and distribution. \nThe defining component of Linux is the Linux kernel, an operating \nsystem kernel first released on 5 October 1991, by Linus Torvalds. \nSince the C compiler that builds Linux and the main supporting user \nspace system tools and libraries originated in the GNU Project, \ninitiated in 1983 by Richard Stallman, the Free Software \nFoundation prefers the name GNU/Linux.\n\nLinux was originally developed as a free operating system for Intel \nx86-based personal computers. It has since been ported to more \ncomputer hardware platforms than any other operating system. It is a\n leading operating system on servers and other big iron systems such\n as mainframe computers and supercomputers: more than 90% of today\'s\n 500 fastest supercomputers run some variant of Linux, including the\n 10 fastest. Linux also runs on embedded systems (devices where the \noperating system is typically built into the firmware and highly \ntailored to the system) such as mobile phones, tablet computers, \nnetwork routers, building automation controls, televisions and video\n game consoles; the Android system in wide use on mobile devices is \nbuilt on the Linux kernel.\n\nThe development of Linux is one of the most prominent examples of \nfree and open source software collaboration: the underlying source \ncode may be used, modified, and distributed—commercially or \nnon-commercially—by anyone under licenses such as the GNU General \nPublic License. Typically Linux is packaged in a format known as \na Linux distribution for desktop and server use. Some popular \nmainstream Linux distributions include Debian (and its derivatives \nsuch as Ubuntu and Linux Mint), Red Hat Enterprise Linux (and its \nderivatives such as Fedora and CentOS), Mandriva/Mageia, openSUSE \n(and its commercial derivative SUSE Linux Enterprise Server), \nand Arch Linux. Linux distributions include the Linux kernel, \nsupporting utilities and libraries and usually a large amount of \napplication software to fulfill the distribution\'s intended use.\n\nA distribution oriented toward desktop use will typically include \nthe X Window System and an accompanying desktop environment such as \nGNOME or KDE Plasma. Some such distributions may include a less \nresource intensive desktop such as LXDE or Xfce for use on older \nor less powerful computers. A distribution intended to run as a \nserver may omit all graphical environments from the standard install\n and instead include other software such as the Apache HTTP Server \nand an SSH server such as OpenSSH. Because Linux is freely \nredistributable, anyone may create a distribution for any intended \nuse. Applications commonly used with desktop Linux systems include \nthe Mozilla Firefox web browser, the LibreOffice office application \nsuite, and the GIMP image editor.";
    }
  } // myFile
  if (name == 'Password.txt') {
    if (program == 'wc') {
      return "1  9 46 " + name;
    }
    return "Don't you think it would be that easy, right? Keep looking!";
  } // Password.txt
  if (name == 'Profile.txt') {
    if (program == 'wc') {
      return "1  10 60 " + name;
    }
    return "Name: Kano\nPass: wc of this file (only numbers, no spaces)";
  } // Profile.txt
}
