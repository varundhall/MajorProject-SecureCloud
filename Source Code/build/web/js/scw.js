

    var scwDateNow = new Date(Date.parse(new Date().toDateString()));

    var scwBaseYear        = 1960;

    // How many years do want to be valid and to show in the drop-down list?

    var scwDropDownYears   = 100;
   

    var scwLanguage;

    function scwSetDefaultLanguage()
        {try
            {scwSetLanguage();}
         catch (exception)
            {// English
             scwToday               = 'Today:';
             scwClear               = 'Clear';
             scwDrag                = 'click here to drag';
             scwArrMonthNames       = ['Jan','Feb','Mar','Apr','May','Jun',
                                       'Jul','Aug','Sep','Oct','Nov','Dec'];
             scwArrWeekInits        = ['S','M','T','W','T','F','S'];
             scwInvalidDateMsg      = 'The entered date is invalid.\n';
             scwOutOfRangeMsg       = 'The entered date is out of range.';
             scwDoesNotExistMsg     = 'The entered date does not exist.';
             scwInvalidAlert        = ['Invalid date (',') ignored.'];
             scwDateDisablingError  = ['Error ',' is not a Date object.'];
             scwRangeDisablingError = ['Error ',
                                       ' should consist of two elements.'];
            }
        };

    var scwWeekStart       =    1;
    

    var scwWeekNumberDisplay    = false;
    
    var scwWeekNumberBaseDay    = 4;   

    var scwShowInvalidDateMsg       = true,
        scwShowOutOfRangeMsg        = true,
        scwShowDoesNotExistMsg      = true,
        scwShowInvalidAlert         = true,
        scwShowDateDisablingError   = true,
        scwShowRangeDisablingError  = true;
   

    var scwArrDelimiters   = ['/','-','.',',',' '];
    
    var scwDateDisplayFormat = 'yy-mm-dd';     // e.g. 'MMM-DD-YYYY' for the US

    // Output date format

    var scwDateOutputFormat  = 'DD-MM-YYYY'; // e.g. 'MMM-DD-YYYY' for the US
   
    var scwZindex          = 1;

 

    var scwBlnStrict       = false;

    // If you are using ReadOnly or Disabled fields to return the date
    // value into, it can be useful to show a button on the calendar
    // that allows the value to be cleared.  If you want to do that,
    // set scwClearButton = true;

    var scwClearButton     = true;

    // The calendar will position itself aligned with the bottom left
    // corner of the target element.  If automatic positioning is turned
    // on  with  scwAutoPosition = true  then if that would cause the
    // calendar to display off the visible screen, it is shifted to
    // a position that is visible.

    var scwAutoPosition    = true;
   

    var scwEnabledDay      = [true, true, true, true, true, true, true,
                              true, true, true, true, true, true, true,
                              true, true, true, true, true, true, true,
                              true, true, true, true, true, true, true,
                              true, true, true, true, true, true, true,
                              true, true, true, true, true, true, true];


    var scwDisabledDates   = new Array();


    var scwActiveToday = true;

    

    var scwOutOfMonthDisable = false;
    var scwOutOfMonthHide    = false;  

    var scwOutOfRangeDisable = true;

   

    var scwFormatTodayCell = true;
    var scwTodayCellBorderColour = 'red';

    // You can allow the calendar to be dragged around the screen by
    // using the setting scwAllowDrag to true.
    // I can't say I recommend it because of the danger of the user
    // forgetting which date field the calendar will update when there
    // are multiple date fields on a page.

    var scwAllowDrag = false;

    // Closing the calendar by clicking on it (rather than elsewhere on the
    // main page) can be inconvenient.  The scwClickToHide boolean value
    // controls this feature.

    var scwClickToHide = false;

    // I have made every effort to isolate the pop-up script from any
    // CSS defined on the main page but if you have anything set that
    // affects the pop-up (or you may want to change the way it looks)
    // then you can address it in the following style sheets.

    document.writeln(
        '<style type="text/css">'                                       +
            '.scw           {padding:1px;vertical-align:middle;}'       +
            'iframe.scw     {position:absolute;z-index:' + scwZindex    +
                            ';top:0px;left:0px;visibility:hidden;'      +
                            'width:1px;height:1px;}'                    +
            'table.scw      {padding:0px;visibility:hidden;'            +
                            'position:absolute;cursor:default;'         +
                            'width:200px;top:0px;left:0px;'             +
                            'z-index:' + (scwZindex+1)                  +
                            ';text-align:center;}'                      +
        '</style>'  );

    // This style sheet can be extracted from the script and edited into regular
    // CSS (by removing all occurrences of + and '). That can be used as the
    // basis for themes. Classes are described in comments within the style
    // sheet.

    document.writeln(
        '<style type="text/css">'                                       +
            '/* IMPORTANT:  The SCW calendar script requires all '      +
            '               the classes defined here.'                  +
            '*/'                                                        +
            'table.scw      {padding:       1px;'                       +
                            'vertical-align:middle;'                    +
                            'border:        ridge 2px;'                 +
                            'font-size:     10pt;'                      +
                            'font-family:   ' +
                                   'Verdana,Arial,Helvetica,Sans-Serif;'+
                            'font-weight:   bold;}'                     +
            'td.scwDrag,'                                               +
            'td.scwHead                 {padding:       0px 0px;'       +
                                        'text-align:    center;}'       +
            'td.scwDrag                 {font-size:     8pt;}'          +
            'select.scwHead             {margin:        3px 1px;'       +
                                        'text-align:    center;}'       +
            'input.scwHead              {height:        22px;'          +
                                        'width:         22px;'          +
                                        'vertical-align:middle;'        +
                                        'text-align:    center;'        +
                                        'margin:        2px 1px;'       +
                                        'font-weight:   bold;'          +
                                        'font-size:     10pt;'          +
                                        'font-family:   fixedSys;}'     +
            'td.scwWeekNumberHead,'                                     +
            'td.scwWeek                 {padding:       0px;'           +
                                        'text-align:    center;'        +
                                        'font-weight:   bold;}'         +
            'td.scwNow,'                                                +
            'td.scwNowHover,'                                           +
            'td.scwNow:hover,'                                          +
            'td.scwNowDisabled          {padding:       0px;'           +
                                        'text-align:    center;'        +
                                        'vertical-align:middle;'        +
                                        'font-weight:   normal;}'       +
            'table.scwCells             {text-align:    right;'         +
                                        'font-size:     8pt;'           +
                                        'width:         96%;}'          +
            'td.scwCells,'                  +
            'td.scwCellsHover,'             +
            'td.scwCells:hover,'            +
            'td.scwCellsDisabled,'          +
            'td.scwCellsExMonth,'           +
            'td.scwCellsExMonthHover,'      +
            'td.scwCellsExMonth:hover,'     +
            'td.scwCellsExMonthDisabled,'   +
            'td.scwCellsWeekend,'           +
            'td.scwCellsWeekendHover,'      +
            'td.scwCellsWeekend:hover,'     +
            'td.scwCellsWeekendDisabled,'   +
            'td.scwInputDate,'              +
            'td.scwInputDateHover,'         +
            'td.scwInputDate:hover,'        +
            'td.scwInputDateDisabled,'      +
            'td.scwWeekNo,'                 +
            'td.scwWeeks                {padding:           3px;'       +
                                        'width:             16px;'      +
                                        'height:            16px;'      +
                                        'border-width:      1px;'       +
                                        'border-style:      solid;'     +
                                        'font-weight:       bold;'      +
                                        'vertical-align:    middle;}'   +
            '/* Blend the colours into your page here...    */'         +
            '/* Calendar background */'                                 +
            'table.scw                  {background-color:  #6666CC;}'  +
            '/* Drag Handle */'                                         +
            'td.scwDrag                 {background-color:  #9999CC;'   +
                                        'color:             #CCCCFF;}'  +
            '/* Week number heading */'                                 +
            'td.scwWeekNumberHead       {color:             #6666CC;}'  +
            '/* Week day headings */'                                   +
            'td.scwWeek                 {color:             #CCCCCC;}'  +
            '/* Week numbers */'                                        +
            'td.scwWeekNo               {background-color:  #776677;'   +
                                        'color:             #CCCCCC;}'  +
            '/* Enabled Days */'                                        +
            '/* Week Day */'                                            +
            'td.scwCells                {background-color:  #CCCCCC;'   +
                                        'color:             #000000;}'  +
            '/* Day matching the input date */'                         +
            'td.scwInputDate            {background-color:  #CC9999;'   +
                                        'color:             #FF0000;}'  +
            '/* Weekend Day */'                                         +
            'td.scwCellsWeekend         {background-color:  #CCCCCC;'   +
                                        'color:             #CC6666;}'  +
            '/* Day outside the current month */'                       +
            'td.scwCellsExMonth         {background-color:  #CCCCCC;'   +
                                        'color:             #666666;}'  +
            '/* Today selector */'                                      +
            'td.scwNow                  {background-color:  #6666CC;'   +
                                        'color:             #FFFFFF;}'  +
            '/* Clear Button */'                                        +
            'td.scwClear                {padding:           0px;}'      +
            'input.scwClear             {padding:           0px;'       +
                                        'text-align:        center;'    +
                                        'font-size:         8pt;}'      +
            '/* MouseOver/Hover formatting '                            +
            '       If you want to "turn off" any of the formatting '   +
            '       then just set to the same as the standard format'   +
            '       above.'                                             +
            ' '                                                         +
            '       Note: The reason that the following are'            +
            '       implemented using both a class and a :hover'        +
            '       pseudoclass is because Opera handles the rendering' +
            '       involved in the class swap very poorly and IE6 '    +
            '       (and below) only implements pseudoclasses on the'   +
            '       anchor tag.'                                        +
            '*/'                                                        +
            '/* Active cells */'                                        +
            'td.scwCells:hover,'                                        +
            'td.scwCellsHover           {background-color:  #FFFF00;'   +
                                        'cursor:            pointer;'   +
                                        'color:             #000000;}'  +
            '/* Day matching the input date */'                         +
            'td.scwInputDate:hover,'                                    +
            'td.scwInputDateHover       {background-color:  #FFFF00;'   +
                                        'cursor:            pointer;'   +
                                        'color:             #000000;}'  +
            '/* Weekend cells */'                                       +
            'td.scwCellsWeekend:hover,'                                 +
            'td.scwCellsWeekendHover    {background-color:  #FFFF00;'   +
                                        'cursor:            pointer;'   +
                                        'color:             #000000;}'  +
            '/* Day outside the current month */'                       +
            'td.scwCellsExMonth:hover,'                                 +
            'td.scwCellsExMonthHover    {background-color:  #FFFF00;'   +
                                        'cursor:            pointer;'   +
                                        'color:             #000000;}'  +
            '/* Today selector */'                                      +
            'td.scwNow:hover,'                                          +
            'td.scwNowHover             {color:             #FFFF00;'   +
                                        'cursor:            pointer;'   +
                                        'font-weight:       bold;}'     +
            '/* Disabled cells */'                                      +
            '/* Week Day */'                                            +
            '/* Day matching the input date */'                         +
            'td.scwInputDateDisabled    {background-color:  #999999;'   +
                                        'color:             #000000;}'  +
            'td.scwCellsDisabled        {background-color:  #999999;'   +
                                        'color:             #000000;}'  +
            '/* Weekend Day */'                                         +
            'td.scwCellsWeekendDisabled {background-color:  #999999;'   +
                                        'color:             #CC6666;}'  +
            '/* Day outside the current month */'                       +
            'td.scwCellsExMonthDisabled {background-color:  #999999;'   +
                                        'color:             #666666;}'  +
            'td.scwNowDisabled          {background-color:  #6666CC;'   +
                                        'color:             #FFFFFF;}'  +
        '</style>'
                    );

//******************************************************************************
//------------------------------------------------------------------------------
// End of customisation section
//------------------------------------------------------------------------------
//******************************************************************************

//  Variables required by both scwShow and scwShowMonth

    var scwTargetEle,
        scwTriggerEle,
        scwMonthSum            = 0,
        scwBlnFullInputDate    = false,
        scwPassEnabledDay      = new Array(),
        scwSeedDate            = new Date(),
        scwParmActiveToday     = true,
        scwWeekStart           = scwWeekStart%7,
        scwToday,
        scwClear,
        scwDrag,
        scwArrMonthNames,
        scwArrWeekInits,
        scwInvalidDateMsg,
        scwOutOfRangeMsg,
        scwDoesNotExistMsg,
        scwInvalidAlert,
        scwDateDisablingError,
        scwRangeDisablingError;

    // Add a method to format a date into the required pattern

    Date.prototype.scwFormat =
        function(scwFormat)
            {var charCount = 0,
                 codeChar  = '',
                 result    = '';

             for (var i=0;i<=scwFormat.length;i++)
                {if (i<scwFormat.length && scwFormat.charAt(i)==codeChar)
                        {// If we haven't hit the end of the string and
                         // the format string character is the same as
                         // the previous one, just clock up one to the
                         // length of the current element definition
                         charCount++;
                        }
                 else   {switch (codeChar)
                            {case 'y': case 'Y':
                                result += (this.getFullYear()%Math.
                                            pow(10,charCount)).toString().
                                            scwPadLeft(charCount);
                                break;
                             case 'm': case 'M':
                                // If we find an M, check the number of them to
                                // determine whether to get the month number or
                                // the month name.
                                result += (charCount<3)
                                            ?(this.getMonth()+1).
                                                toString().scwPadLeft(charCount)
                                            :scwArrMonthNames[this.getMonth()];
                                break;
                             case 'd': case 'D':
                                // If we find a D, get the date and format it
                                result += this.getDate().toString().
                                            scwPadLeft(charCount);
                                break;
                             default:
                                // Copy any unrecognised characters across
                                while (charCount-- > 0) {result += codeChar;}
                            }

                         if (i<scwFormat.length)
                            {// Store the character we have just worked on
                             codeChar  = scwFormat.charAt(i);
                             charCount = 1;
                            }
                        }
                }
             return result;
            };

    // Add a method to left pad zeroes

    String.prototype.scwPadLeft =
        function(padToLength)
            {var result = '';
             for (var i=0;i<(padToLength - this.length);i++) {result += '0';}
             return (result + this);
            };

    // Set up a closure so that any next function can be triggered
    // after the calendar has been closed AND that function can take
    // arguments.

    Function.prototype.runsAfterSCW =
        function()  {var func = this,
                         args = new Array(arguments.length);

                     for (var i=0;i<args.length;++i) {args[i] = arguments[i];}

                     return function()
                        {// concat/join the two argument arrays
                         for (var i=0;i<arguments.length;++i) {args[args.length] = arguments[i];}
                         return (args.shift()==scwTriggerEle)?func.apply(this, args):null;
                        };
                    };

    // Set up some shortcuts

    function scwID(id)
        {if (document.getElementById(id) || (!document.getElementById(id) && document.getElementsByName(id).length==0))
                                    // IF   An ID attribute is assigned
                                    // OR   No ID attribute is assigned but using IE and Opera
                                    //          (which will find the NAME attribute value using getElementById)
                                    // OR   No element has this ID or NAME attribute value
                                    //          (used internally by the script)
                                    // THEN Return the required element.
                {return document.getElementById(id);}
         else   {if (document.getElementsByName(id).length==1)
                                // IF   No ID attribute is assigned
                                // AND  Using a standards-based browser
                                // AND  Only one element has the NAME attribute set to the value
                                // THEN Return the required element (using the NAME attribute value).
                        {return document.getElementsByName(id)[0];}
                 else   {if (document.getElementsByName(id).length>1)
                            {   // IF   No ID attribute is assigned
                                // AND  using a standards-based browser
                                // AND  more than one element has the NAME attribute set to the value
                                // THEN alert developer to fix the fault.
                             alert( 'SCW' +
                                    ' \nCannot uniquely identify element named: ' + id +
                                    '.\nMore than one identical NAME attribute defined' +
                                    '.\nSolution: Assign the required element a unique ID attribute value.');
                            }
                        }
                }
        };

    // Use a global variable for the return value from the next action
    // IE fails to pass the function through if the target element is in
    // a form and scwNextAction is not defined.

    var scwNextActionReturn, scwNextAction;



    function showCal(scwEle,scwSource) {scwShow(scwEle,scwSource);};
    function scwShow(scwEle,scwSource)
        {if (!scwSource) {scwSource = window.event;}

         if (scwSource.tagName) // Second parameter isn't an event it's an element
            {var scwSourceEle = scwSource;

             if (scwID('scwIE'))  {window.event.cancelBubble = true;}
             else {scwSourceEle.parentNode.addEventListener('click',scwStopPropagation,false);}
            }
         else   // Second parameter is an event
            {var scwSourceEle = (scwSource.target)
                                    ?scwSource.target
                                    :scwSource.srcElement;

             // Stop the click event that opens the calendar from bubbling up to
             // the document-level event handler that hides it!
             if (scwSource.stopPropagation) {scwSource.stopPropagation();}
             else                           {scwSource.cancelBubble = true;}
            }

         scwTriggerEle = scwSourceEle;

         // Take any parameters that there might be from the third onwards as
         // day numbers to be disabled 0 = Sunday through to 6 = Saturday.

         scwParmActiveToday = true;

         for (var i=0;i<7;i++)
            {scwPassEnabledDay[(i+7-scwWeekStart)%7] = true;
             for (var j=2;j<arguments.length;j++)
                {if (arguments[j]==i)
                    {scwPassEnabledDay[(i+7-scwWeekStart)%7] = false;
                     if (scwDateNow.getDay()==i) {scwParmActiveToday = false;}
                    }
                }
            }

         //   If no value is preset then the seed date is
         //      Today (when today is in range) OR
         //      The middle of the date range.

         scwSeedDate = scwDateNow;

         // Find the date and Strip space characters from start and
         // end of date input.

         var scwDateValue = '';

         if (scwEle.value) {scwDateValue = scwEle.value.replace(/^\s+/,'').replace(/\s+$/,'');}
         else   {if (typeof scwEle.value == 'undefined')
                    {var scwChildNodes = scwEle.childNodes;
                     for (var i=0;i<scwChildNodes.length;i++)
                        {if (scwChildNodes[i].nodeType == 3)
                            {scwDateValue = scwChildNodes[i].nodeValue.replace(/^\s+/,'').replace(/\s+$/,'');
                             if (scwDateValue.length > 0)
                                {scwTriggerEle.scwTextNode = scwChildNodes[i];
                                 scwTriggerEle.scwLength   = scwChildNodes[i].nodeValue.length;
                                 break;
                                }
                            }
                        }
                    }
                }

         // Set the language-dependent elements

         scwSetDefaultLanguage();

         scwID('scwDragText').innerHTML = scwDrag;

         scwID('scwMonths').options.length = 0;
         for (var i=0;i<scwArrMonthNames.length;i++)
            {scwID('scwMonths').options[i] = new Option(scwArrMonthNames[i],scwArrMonthNames[i]);}

         scwID('scwYears').options.length = 0;
         for (var i=0;i<scwDropDownYears;i++)
            {scwID('scwYears').options[i] =  new Option((scwBaseYear+i),(scwBaseYear+i));}

         for (var i=0;i<scwArrWeekInits.length;i++)
            {scwID('scwWeekInit' + i).innerHTML = scwArrWeekInits[(i+scwWeekStart)%scwArrWeekInits.length];}

         if (((new Date(scwBaseYear + scwDropDownYears, 0, 0)) > scwDateNow &&
              (new Date(scwBaseYear, 0, 0))                    < scwDateNow) ||
             (scwClearButton && (scwEle.readOnly || scwEle.disabled))
            )   {scwID('scwFoot').style.display = '';
                 scwID('scwNow').innerHTML = scwToday + ' ' + scwDateNow.scwFormat(scwDateDisplayFormat);
                 scwID('scwClearButton').value = scwClear;
                 if ((new Date(scwBaseYear + scwDropDownYears, 0, 0)) > scwDateNow &&
                     (new Date(scwBaseYear, 0, 0))                    < scwDateNow
                    )   {scwID('scwNow').style.display = '';
                         if (scwClearButton && (scwEle.readOnly || scwEle.disabled))
                                {scwID('scwClear').style.display   = '';
                                 scwID('scwClear').style.textAlign = 'left';
                                 scwID('scwNow').style.textAlign   = 'right';
                                }
                         else   {scwID('scwClear').style.display = 'none';
                                 scwID('scwNow').style.textAlign = 'center';
                                }
                        }
                 else   {scwID('scwClear').style.textAlign = 'center';
                         scwID('scwClear').style.display = '';
                         scwID('scwNow').style.display = 'none';
                        }
                }
         else   {scwID('scwFoot').style.display = 'none';}

         if (scwDateValue.length==0)
            {// If no value is entered and today is within the range,
             // use today's date, otherwise use the middle of the valid range.

             scwBlnFullInputDate=false;

             if ((new Date(scwBaseYear+scwDropDownYears,0,0))<scwSeedDate ||
                 (new Date(scwBaseYear,0,1))                 >scwSeedDate
                )
                {scwSeedDate = new Date(scwBaseYear + Math.floor(scwDropDownYears / 2), 5, 1);}
            }
         else
            {function scwInputFormat()
                {var scwArrSeed = new Array(),
                     scwArrInput = scwDateValue.split(new RegExp('[\\'+scwArrDelimiters.join('\\')+']+','g'));

                 // "Escape" all the user defined date delimiters above -
                 // several delimiters will need it and it does no harm for
                 // the others.

                 // Strip any empty array elements (caused by delimiters)
                 // from the beginning or end of the array. They will
                 // still appear in the output string if in the output
                 // format.

                 if (scwArrInput[0]!=null)
                    {if (scwArrInput[0].length==0)                      {scwArrInput.splice(0,1);}
                     if (scwArrInput[scwArrInput.length-1].length==0)   {scwArrInput.splice(scwArrInput.length-1,1);}
                    }

                 scwBlnFullInputDate = false;

                 scwDateOutputFormat = scwDateOutputFormat.toUpperCase();

                 // List all the allowed letters in the date format
                 var template = ['D','M','Y'];

                 // Prepare the sequence of date input elements
                 var result = new Array();

                 for (var i=0;i<template.length;i++)
                    {if (scwDateOutputFormat.search(template[i])>-1)
                        {result[scwDateOutputFormat.search(template[i])] = template[i];}
                    }

                 var scwDateSequence = result.join('');

                 // Separate the elements of the date input
                 switch (scwArrInput.length)
                    {case 1:
                        {if (scwDateOutputFormat.indexOf('Y')>-1 &&
                             scwArrInput[0].length>scwDateOutputFormat.lastIndexOf('Y'))
                            {scwArrSeed[0] = parseInt(scwArrInput[0].substring(scwDateOutputFormat.indexOf('Y'),
                                                                               scwDateOutputFormat.lastIndexOf('Y')+1),10);
                            }
                         else   {scwArrSeed[0] = 0;}

                         if (scwDateOutputFormat.indexOf('M')>-1 &&
                             scwArrInput[0].length>scwDateOutputFormat.lastIndexOf('M'))
                            {scwArrSeed[1] = scwArrInput[0].substring(scwDateOutputFormat.indexOf('M'),
                                                                      scwDateOutputFormat.lastIndexOf('M')+1);
                            }
                         else   {scwArrSeed[1] = '6';}

                         if (scwDateOutputFormat.indexOf('D')>-1 &&
                             scwArrInput[0].length>scwDateOutputFormat.lastIndexOf('D'))
                            {scwArrSeed[2] = parseInt(scwArrInput[0].substring(scwDateOutputFormat.indexOf('D'),
                                                                               scwDateOutputFormat.lastIndexOf('D')+1),10);
                            }
                         else   {scwArrSeed[2] = 1;}

                         if (scwArrInput[0].length==scwDateOutputFormat.length) {scwBlnFullInputDate = true;}
                         break;
                        }
                     case 2:
                        {// Year and Month entry
                         scwArrSeed[0] =
                             parseInt(scwArrInput[scwDateSequence.
                                                    replace(/D/i,'').
                                                    search(/Y/i)],10);  // Year
                         scwArrSeed[1] = scwArrInput[scwDateSequence.
                                                    replace(/D/i,'').
                                                    search(/M/i)];      // Month
                         scwArrSeed[2] = 1;                             // Day
                         break;
                        }
                     case 3:
                        {// Day Month and Year entry

                         scwArrSeed[0] =
                             parseInt(scwArrInput[scwDateSequence.
                                                    search(/Y/i)],10);  // Year
                         scwArrSeed[1] = scwArrInput[scwDateSequence.
                                                    search(/M/i)];      // Month
                         scwArrSeed[2] =
                             parseInt(scwArrInput[scwDateSequence.
                                                    search(/D/i)],10);  // Day

                         scwBlnFullInputDate = true;
                         break;
                        }
                     default:
                        {// A stuff-up has led to more than three elements in
                         // the date.
                         scwArrSeed[0] = 0;     // Year
                         scwArrSeed[1] = 0;     // Month
                         scwArrSeed[2] = 0;     // Day
                        }
                    }

                 // These regular expressions validate the input date format
                 // to the following rules;
                 //         Day   1-31 (optional zero on single digits)
                 //         Month 1-12 (optional zero on single digits)
                 //                     or case insensitive name
                 //         Year  One, Two or four digits

                 // Months names are as set in the language-dependent
                 // definitions and delimiters are set just below there

                 var scwExpValDay    = new RegExp('^(0?[1-9]|[1-2][0-9]|3[0-1])$'),
                     scwExpValMonth  = new RegExp('^(0?[1-9]|1[0-2]|'        +
                                                  scwArrMonthNames.join('|') +
                                                  ')$','i'),
                     scwExpValYear   = new RegExp('^([0-9]{1,2}|[0-9]{4})$');

                 // Apply validation and report failures

                 if (scwExpValYear.exec(scwArrSeed[0])  == null ||
                     scwExpValMonth.exec(scwArrSeed[1]) == null ||
                     scwExpValDay.exec(scwArrSeed[2])   == null
                    )
                    {if (scwShowInvalidDateMsg)
                        {alert(scwInvalidDateMsg  +
                               scwInvalidAlert[0] + scwDateValue +
                               scwInvalidAlert[1]);}
                     scwBlnFullInputDate = false;
                     scwArrSeed[0] = scwBaseYear +
                                     Math.floor(scwDropDownYears/2); // Year
                     scwArrSeed[1] = '6';                            // Month
                     scwArrSeed[2] = 1;                              // Day
                    }

                 // Return the  Year    in scwArrSeed[0]
                 //             Month   in scwArrSeed[1]
                 //             Day     in scwArrSeed[2]

                 return scwArrSeed;
                };

             // Parse the string into an array using the allowed delimiters

             scwArrSeedDate = scwInputFormat();

             // So now we have the Year, Month and Day in an array.

             //   If the year is one or two digits then the routine assumes a
             //   year belongs in the 21st Century unless it is less than 50
             //   in which case it assumes the 20th Century is intended.

             if (scwArrSeedDate[0]<100) {scwArrSeedDate[0] += (scwArrSeedDate[0]>50)?1900:2000;}

             // Check whether the month is in digits or an abbreviation

             if (scwArrSeedDate[1].search(/\d+/)<0)
                {for (i=0;i<scwArrMonthNames.length;i++)
                    {if (scwArrSeedDate[1].toUpperCase()==scwArrMonthNames[i].toUpperCase())
                        {scwArrSeedDate[1]=i+1;
                         break;
                        }
                    }
                }

             scwSeedDate = new Date(scwArrSeedDate[0],scwArrSeedDate[1]-1,scwArrSeedDate[2]);
            }

         // Test that we have arrived at a valid date

         if (isNaN(scwSeedDate))
            {if (scwShowInvalidDateMsg) {alert(scwInvalidDateMsg + scwInvalidAlert[0] + scwDateValue + scwInvalidAlert[1]);}
             scwSeedDate = new Date(scwBaseYear + Math.floor(scwDropDownYears/2),5,1);
             scwBlnFullInputDate=false;
            }
         else
            {// Test that the date is within range,
             // if not then set date to a sensible date in range.

             if ((new Date(scwBaseYear,0,1)) > scwSeedDate)
                {if (scwBlnStrict && scwShowOutOfRangeMsg) {alert(scwOutOfRangeMsg);}
                 scwSeedDate = new Date(scwBaseYear,0,1);
                 scwBlnFullInputDate=false;
                }
             else
                {if ((new Date(scwBaseYear+scwDropDownYears,0,0))<scwSeedDate)
                    {if (scwBlnStrict && scwShowOutOfRangeMsg) {alert(scwOutOfRangeMsg);}
                     scwSeedDate = new Date(scwBaseYear + Math.floor(scwDropDownYears)-1,11,1);
                     scwBlnFullInputDate=false;
                    }
                 else
                    {if (scwBlnStrict && scwBlnFullInputDate &&
                          (scwSeedDate.getDate()      != scwArrSeedDate[2] ||
                           (scwSeedDate.getMonth()+1) != scwArrSeedDate[1] ||
                           scwSeedDate.getFullYear()  != scwArrSeedDate[0]
                          )
                        )
                        {if (scwShowDoesNotExistMsg) alert(scwDoesNotExistMsg);
                         scwSeedDate = new Date(scwSeedDate.getFullYear(),scwSeedDate.getMonth()-1,1);
                         scwBlnFullInputDate=false;
                        }
                    }
                }
            }

         // Test the disabled dates for validity
         // Give error message if not valid.

         for (var i=0;i<scwDisabledDates.length;i++)
            {if (!((typeof scwDisabledDates[i] == 'object') && (scwDisabledDates[i].constructor == Date)))
                {if ((typeof scwDisabledDates[i] == 'object') && (scwDisabledDates[i].constructor == Array))
                    {var scwPass = true;

                     if (scwDisabledDates[i].length !=2)
                        {if (scwShowRangeDisablingError)
                            {alert(scwRangeDisablingError[0] + scwDisabledDates[i] + scwRangeDisablingError[1]);}
                         scwPass = false;
                        }
                     else
                        {for (var j=0;j<scwDisabledDates[i].length;j++)
                            {if (!((typeof scwDisabledDates[i][j] == 'object') && (scwDisabledDates[i][j].constructor == Date)))
                                {if (scwShowRangeDisablingError)
                                    {alert(  scwDateDisablingError[0] + scwDisabledDates[i][j] + scwDateDisablingError[1]);}
                                 scwPass = false;
                                }
                            }
                        }

                     if (scwPass && (scwDisabledDates[i][0] > scwDisabledDates[i][1])) {scwDisabledDates[i].reverse();}
                    }
                 else
                    {if (scwShowRangeDisablingError) {alert(scwDateDisablingError[0] + scwDisabledDates[i] + scwDateDisablingError[1]);}}
                }
            }

         // Calculate the number of months that the entered (or
         // defaulted) month is after the start of the allowed
         // date range.

         scwMonthSum =  12*(scwSeedDate.getFullYear()-scwBaseYear)+scwSeedDate.getMonth();

         scwID('scwYears' ).options.selectedIndex = Math.floor(scwMonthSum/12);
         scwID('scwMonths').options.selectedIndex = (scwMonthSum%12);

         // Check whether or not dragging is allowed and display drag handle if necessary

         scwID('scwDrag').style.display=(scwAllowDrag)?'':'none';

         // Display the month

         scwShowMonth(0);

         // Position the calendar box

         // The object sniffing for Opera allows for the fact that Opera
         // is the only major browser that correctly reports the position
         // of an element in a scrollable DIV.  This is because IE and
         // Firefox omit the DIV from the offsetParent tree.

         scwTargetEle=scwEle;

         var offsetTop =parseInt(scwEle.offsetTop ,10) + parseInt(scwEle.offsetHeight,10),
             offsetLeft=parseInt(scwEle.offsetLeft,10);

         if (!window.opera)
             {while (scwEle.tagName!='BODY' && scwEle.tagName!='HTML')
                 {offsetTop -=parseInt(scwEle.scrollTop, 10);
                  offsetLeft-=parseInt(scwEle.scrollLeft,10);
                  scwEle=scwEle.parentNode;
                 }
              scwEle=scwTargetEle;
             }

         do {scwEle=scwEle.offsetParent;
             offsetTop +=parseInt(scwEle.offsetTop, 10);
             offsetLeft+=parseInt(scwEle.offsetLeft,10);
            }
         while (scwEle.tagName!='BODY' && scwEle.tagName!='HTML');

         if (scwAutoPosition)
             {var scwWidth      = parseInt(scwID('scw').offsetWidth, 10),
                  scwHeight     = parseInt(scwID('scw').offsetHeight,10),
                  scwWindowLeft =
                     (document.body && document.body.scrollLeft)
                          ?document.body.scrollLeft                  //DOM compliant
                          :(document.documentElement && document.documentElement.scrollLeft)
                              ?document.documentElement.scrollLeft   //IE6+ standards compliant
                              :0,                                    //Failed
                  scwWindowWidth =
                      (typeof(innerWidth) == 'number')
                          ?innerWidth                                //DOM compliant
                          :(document.documentElement && document.documentElement.clientWidth)
                              ?document.documentElement.clientWidth  //IE6+ standards compliant
                              :(document.body && document.body.clientWidth)
                                  ?document.body.clientWidth         //IE non-compliant
                                  :0,                                //Failed
                  scwWindowTop =
                      (document.body && document.body.scrollTop)
                          ?document.body.scrollTop                   //DOM compliant
                          :(document.documentElement && document.documentElement.scrollTop)
                              ?document.documentElement.scrollTop    //IE6+ standards compliant
                              :0,                                    //Failed
                  scwWindowHeight =
                      (typeof(innerHeight) == 'number')
                          ?innerHeight                               //DOM compliant
                          :(document.documentElement && document.documentElement.clientHeight)
                              ?document.documentElement.clientHeight //IE6+ standards compliant
                              :(document.body && document.body.clientHeight)
                                  ?document.body.clientHeight        //IE non-compliant
                                  :0;                                //Failed

              offsetLeft -= (offsetLeft - scwWidth + parseInt(scwTargetEle.offsetWidth,10) >= scwWindowLeft &&
                             offsetLeft + scwWidth > scwWindowLeft + scwWindowWidth
                            )?(scwWidth - parseInt(scwTargetEle.offsetWidth,10)):0;

              offsetTop -= (offsetTop - scwHeight - parseInt(scwTargetEle.offsetHeight,10) >= scwWindowTop &&
                            offsetTop + scwHeight > scwWindowTop + scwWindowHeight
                           )?(scwHeight + parseInt(scwTargetEle.offsetHeight,10)):0;
             }

         scwID('scw').style.top         = offsetTop+'px';
         scwID('scw').style.left        = offsetLeft+'px';
         scwID('scwIframe').style.top   = offsetTop+'px';
         scwID('scwIframe').style.left  = offsetLeft+'px';

         scwID('scwIframe').style.width =(scwID('scw').offsetWidth-(scwID('scwIE')?2:4))+'px';
         scwID('scwIframe').style.height=(scwID('scw').offsetHeight-(scwID('scwIE')?2:4))+'px';
         scwID('scwIframe').style.visibility='inherit';

         // Show it on the page
         scwID('scw').style.visibility='inherit';
        };

    function scwHide()
        {scwID('scw').style.visibility='hidden';
         scwID('scwIframe').style.visibility='hidden';
         if (typeof scwNextAction!='undefined' && scwNextAction!=null)
             {scwNextActionReturn = scwNextAction();
              // Explicit null set to prevent closure causing memory leak
              scwNextAction = null;
             }
        };

    function scwCancel(scwEvt)
        {if (scwClickToHide) {scwHide();}
         scwStopPropagation(scwEvt);
        };

    function scwStopPropagation(scwEvt)
        {if (scwEvt.stopPropagation)
                {scwEvt.stopPropagation();}     // Capture phase
         else   {scwEvt.cancelBubble = true;}   // Bubbling phase
        };

    function scwBeginDrag(event)
        {var elementToDrag = scwID('scw');

         var deltaX    = event.clientX,
             deltaY    = event.clientY,
             offsetEle = elementToDrag;

         do {deltaX   -= parseInt(offsetEle.offsetLeft,10);
             deltaY   -= parseInt(offsetEle.offsetTop ,10);
             offsetEle = offsetEle.offsetParent;
            }
         while (offsetEle.tagName!='BODY' &&
                offsetEle.tagName!='HTML');

         if (document.addEventListener)
                {document.addEventListener('mousemove',moveHandler,true);        // Capture phase
                 document.addEventListener('mouseup',  upHandler,  true);        // Capture phase
                }
         else   {elementToDrag.attachEvent('onmousemove',moveHandler); // Bubbling phase
                 elementToDrag.attachEvent('onmouseup',  upHandler);   // Bubbling phase
                 elementToDrag.setCapture();
                }

         scwStopPropagation(event);

         function moveHandler(scwEvt)
            {if (!scwEvt) scwEvt = window.event;

             elementToDrag.style.left = (scwEvt.clientX - deltaX) + 'px';
             elementToDrag.style.top  = (scwEvt.clientY - deltaY) + 'px';

             scwID('scwIframe').style.left = (scwEvt.clientX - deltaX) + 'px';
             scwID('scwIframe').style.top  = (scwEvt.clientY - deltaY) + 'px';

             scwStopPropagation(scwEvt);
            };

         function upHandler(scwEvt)
            {if (!scwEvt) scwEvt = window.event;

             if (document.removeEventListener)
                    {document.removeEventListener('mousemove',moveHandler,true);     // Capture phase
                     document.removeEventListener('mouseup',  upHandler,  true);     // Capture phase
                    }
             else   {elementToDrag.detachEvent('onmouseup',  upHandler);   // Bubbling phase
                     elementToDrag.detachEvent('onmousemove',moveHandler); // Bubbling phase
                     elementToDrag.releaseCapture();
                    }

             scwStopPropagation(scwEvt);
            };
        };

    function scwShowMonth(scwBias)
        {// Set the selectable Month and Year
         // May be called: from the left and right arrows
         //                  (shift month -1 and +1 respectively)
         //                from the month selection list
         //                from the year selection list
         //                from the showCal routine
         //                  (which initiates the display).

         var scwShowDate  = new Date(Date.parse(new Date().toDateString())),
             scwStartDate = new Date();

         // Set the time to the middle of the day so that the handful of
         // regions that have daylight saving shifts that change the day
         // of the month (i.e. turn the clock back at midnight or forward
         // at 23:00) do not mess up the date display in the calendar.

         scwShowDate.setHours(12);

         scwSelYears  = scwID('scwYears');
         scwSelMonths = scwID('scwMonths');

         if (scwSelYears.options.selectedIndex>-1)
            {scwMonthSum=12*(scwSelYears.options.selectedIndex)+scwBias;
             if (scwSelMonths.options.selectedIndex>-1) {scwMonthSum+=scwSelMonths.options.selectedIndex;}
            }
         else
            {if (scwSelMonths.options.selectedIndex>-1) {scwMonthSum+=scwSelMonths.options.selectedIndex;}}

         scwShowDate.setFullYear(scwBaseYear + Math.floor(scwMonthSum/12),(scwMonthSum%12),1);

         // If the Week numbers are displayed, shift the week day names to the right.
         scwID('scwWeek_').style.display=(scwWeekNumberDisplay)?'':'none';

         // Opera has a bug with setting the selected index.
         // It requires the following work-around to force SELECTs to display correctly.
         if (window.opera)
            {scwID('scwMonths').style.display = 'inherit';
             scwID('scwYears' ).style.display = 'inherit';
           }

         // Set the drop down boxes.
         scwTemp = (12*parseInt((scwShowDate.getFullYear()-scwBaseYear),10)) + parseInt(scwShowDate.getMonth(),10);

         if (scwTemp > -1 && scwTemp < (12*scwDropDownYears))
            {scwSelYears.options.selectedIndex=Math.floor(scwMonthSum/12);
             scwSelMonths.options.selectedIndex=(scwMonthSum%12);

             scwCurMonth = scwShowDate.getMonth();

             scwShowDate.setDate((((scwShowDate.
                                    getDay()-scwWeekStart)<0)?-6:1)+
                                 scwWeekStart-scwShowDate.getDay());

             // This statement moved by Michael Cerveny to make version 3.55
             var scwCompareDateValue = new Date(scwShowDate.getFullYear(),
                                                scwShowDate.getMonth(),
                                                scwShowDate.getDate()).valueOf();

             scwStartDate = new Date(scwShowDate);

             if ((new Date(scwBaseYear + scwDropDownYears, 0, 0)) > scwDateNow &&
                 (new Date(scwBaseYear, 0, 0))                    < scwDateNow)
                {var scwNow = scwID('scwNow');

                 function scwNowOutput() {scwSetOutput(scwDateNow);};

                 if (scwDisabledDates.length==0)
                    {if (scwActiveToday && scwParmActiveToday)
                        {scwNow.onclick     = scwNowOutput;
                         scwNow.className   = 'scwNow';

                         if (scwID('scwIE'))
                            {scwNow.onmouseover  = scwChangeClass;
                             scwNow.onmouseout   = scwChangeClass;
                            }

                        }
                     else
                        {scwNow.onclick     = null;
                         scwNow.className   = 'scwNowDisabled';

                         if (scwID('scwIE'))
                            {scwNow.onmouseover  = null;
                             scwNow.onmouseout   = null;
                            }

                         if (document.addEventListener)
                                {scwNow.addEventListener('click',scwStopPropagation,false);}
                         else   {scwNow.attachEvent('onclick',scwStopPropagation);}
                        }
                    }
                 else
                    {for (var k=0;k<scwDisabledDates.length;k++)
                        {if (!scwActiveToday || !scwParmActiveToday ||
                             ((typeof scwDisabledDates[k] == 'object')                   &&
                                 (((scwDisabledDates[k].constructor == Date)             &&
                                   scwDateNow.valueOf() == scwDisabledDates[k].valueOf()
                                  ) ||
                                  ((scwDisabledDates[k].constructor == Array)               &&
                                   scwDateNow.valueOf() >= scwDisabledDates[k][0].valueOf() &&
                                   scwDateNow.valueOf() <= scwDisabledDates[k][1].valueOf()
                                  )
                                 )
                             )
                            )
                            {scwNow.onclick     = null;
                             scwNow.className   = 'scwNowDisabled';

                             if (scwID('scwIE'))
                                {scwNow.onmouseover  = null;
                                 scwNow.onmouseout   = null;
                                }

                             if (document.addEventListener)
                                    {scwNow.addEventListener('click',scwStopPropagation,false);}
                             else   {scwNow.attachEvent('onclick',scwStopPropagation);}
                             break;
                            }
                         else
                            {scwNow.onclick=scwNowOutput;
                             scwNow.className='scwNow';

                             if (scwID('scwIE'))
                                {scwNow.onmouseover  = scwChangeClass;
                                 scwNow.onmouseout   = scwChangeClass;
                                }
                            }
                        }
                    }
                }

             function scwSetOutput(scwOutputDate)
                {if (typeof scwTargetEle.value == 'undefined')
                      {scwTriggerEle.scwTextNode.replaceData(0,scwTriggerEle.scwLength,scwOutputDate.scwFormat(scwDateOutputFormat));}
                 else {scwTargetEle.value = scwOutputDate.scwFormat(scwDateOutputFormat);}
                 scwHide();
                };

             function scwCellOutput(scwEvt)
                {var scwEle = scwEventTrigger(scwEvt),
                     scwOutputDate = new Date(scwStartDate);

                 if (scwEle.nodeType==3) scwEle=scwEle.parentNode;

                 scwOutputDate.setDate(scwStartDate.getDate() + parseInt(scwEle.id.substr(8),10));

                 scwSetOutput(scwOutputDate);
                };

             function scwChangeClass(scwEvt)
                {var scwEle = scwEventTrigger(scwEvt);

                 if (scwEle.nodeType==3) {scwEle=scwEle.parentNode;}

                 switch (scwEle.className)
                    {case 'scwCells':
                        scwEle.className = 'scwCellsHover';
                        break;
                     case 'scwCellsHover':
                        scwEle.className = 'scwCells';
                        break;
                     case 'scwCellsExMonth':
                        scwEle.className = 'scwCellsExMonthHover';
                        break;
                     case 'scwCellsExMonthHover':
                        scwEle.className = 'scwCellsExMonth';
                        break;
                     case 'scwCellsWeekend':
                        scwEle.className = 'scwCellsWeekendHover';
                        break;
                     case 'scwCellsWeekendHover':
                        scwEle.className = 'scwCellsWeekend';
                        break;
                     case 'scwNow':
                        scwEle.className = 'scwNowHover';
                        break;
                     case 'scwNowHover':
                        scwEle.className = 'scwNow';
                        break;
                     case 'scwInputDate':
                        scwEle.className = 'scwInputDateHover';
                        break;
                     case 'scwInputDateHover':
                        scwEle.className = 'scwInputDate';
                    }

                 return true;
                }

             function scwEventTrigger(scwEvt)
                {if (!scwEvt) {scwEvt = event;}
                 return scwEvt.target||scwEvt.srcElement;
                };

             function scwWeekNumber(scwInDate)
                {// The base day in the week of the input date
                 var scwInDateWeekBase = new Date(scwInDate);

                 scwInDateWeekBase.setDate(scwInDateWeekBase.getDate()
                                            - scwInDateWeekBase.getDay()
                                            + scwWeekNumberBaseDay
                                            + ((scwInDate.getDay()>
                                                scwWeekNumberBaseDay)?7:0));

                 // The first Base Day in the year
                 var scwFirstBaseDay = new Date(scwInDateWeekBase.getFullYear(),0,1);

                 scwFirstBaseDay.setDate(scwFirstBaseDay.getDate()
                                            - scwFirstBaseDay.getDay()
                                            + scwWeekNumberBaseDay
                                        );

                 if (scwFirstBaseDay < new Date(scwInDateWeekBase.getFullYear(),0,1))
                    {scwFirstBaseDay.setDate(scwFirstBaseDay.getDate()+7);}

                 // Start of Week 01
                 var scwStartWeekOne = new Date(scwFirstBaseDay
                                                - scwWeekNumberBaseDay
                                                + scwInDate.getDay());

                 if (scwStartWeekOne > scwFirstBaseDay)
                    {scwStartWeekOne.setDate(scwStartWeekOne.getDate()-7);}

                 // Subtract the date of the current week from the date of the
                 // first week of the year to get the number of weeks in
                 // milliseconds.  Divide by the number of milliseconds
                 // in a week then round to no decimals in order to remove
                 // the effect of daylight saving.  Add one to make the first
                 // week, week 1.  Place a string zero on the front so that
                 // week numbers are zero filled.

                 var scwWeekNo = '0' + (Math.round((scwInDateWeekBase - scwFirstBaseDay)/604800000,0) + 1);

                 // Return the last two characters in the week number string

                 return scwWeekNo.substring(scwWeekNo.length-2, scwWeekNo.length);
                };

             // Treewalk to display the dates.
             // I tried to use getElementsByName but IE refused to cooperate
             // so I resorted to this method which works for all tested
             // browsers.

             var scwCells = scwID('scwCells');

             for (i=0;i<scwCells.childNodes.length;i++)
                {var scwRows = scwCells.childNodes[i];
                 if (scwRows.nodeType==1 && scwRows.tagName=='TR')
                    {if (scwWeekNumberDisplay)
                        {//Calculate the week number using scwShowDate
                         scwTmpEl = scwRows.childNodes[0];
                         scwTmpEl.innerHTML = scwWeekNumber(scwShowDate);
                         scwTmpEl.style.borderColor =
                             (scwTmpEl.currentStyle)
                                ?scwTmpEl.currentStyle['backgroundColor']
                                :(window.getComputedStyle)
                                    ?document.defaultView.getComputedStyle(scwTmpEl,null).getPropertyValue('background-color')
                                    :'';
                         scwTmpEl.style.display='';
                        }
                     else
                        {scwRows.childNodes[0].style.display='none';}

                     for (j=1;j<scwRows.childNodes.length;j++)
                        {var scwCols = scwRows.childNodes[j];
                         if (scwCols.nodeType==1 && scwCols.tagName=='TD')
                            {scwRows.childNodes[j].innerHTML=
                                scwShowDate.getDate();
                             var scwCell=scwRows.childNodes[j],
                                 scwDisabled =
                                    ((scwOutOfRangeDisable &&
                                        (scwShowDate <
                                            (new Date(scwBaseYear,0,1,
                                                      scwShowDate.getHours()))
                                         ||
                                         scwShowDate >
                                            (new Date(scwBaseYear+
                                                      scwDropDownYears,0,0,
                                                      scwShowDate.getHours()))
                                        )
                                     ) ||
                                     (scwOutOfMonthDisable &&
                                        (scwShowDate <
                                            (new Date(scwShowDate.getFullYear(),
                                                      scwCurMonth,1,
                                                      scwShowDate.getHours()))
                                         ||
                                         scwShowDate >
                                            (new Date(scwShowDate.getFullYear(),
                                                      scwCurMonth+1,0,
                                                      scwShowDate.getHours()))
                                        )
                                     )
                                    )?true:false;

                             scwCell.style.visibility =
                                (scwOutOfMonthHide &&
                                    (scwShowDate <
                                        (new Date(scwShowDate.getFullYear(),
                                                  scwCurMonth,1,
                                                  scwShowDate.getHours()))
                                     ||
                                     scwShowDate >
                                        (new Date(scwShowDate.getFullYear(),
                                                  scwCurMonth+1,0,
                                                  scwShowDate.getHours()))
                                    )
                                )?'hidden':'inherit';

                             for (var k=0;k<scwDisabledDates.length;k++)
                                {if ((typeof scwDisabledDates[k]=='object') &&
                                     (scwDisabledDates[k].constructor == Date) &&
                                     scwCompareDateValue == scwDisabledDates[k].valueOf()
                                    )
                                    {scwDisabled = true;}
                                 else
                                    {if ((typeof scwDisabledDates[k]=='object') &&
                                         (scwDisabledDates[k].constructor == Array) &&
                                         scwCompareDateValue >= scwDisabledDates[k][0].valueOf() &&
                                         scwCompareDateValue <= scwDisabledDates[k][1].valueOf()
                                        )
                                        {scwDisabled = true;}
                                    }
                                }

                             if (scwDisabled ||
                                 !scwEnabledDay[j-1+(7*((i*scwCells.childNodes.length)/6))] ||
                                 !scwPassEnabledDay[(j-1+(7*(i*scwCells.childNodes.length/6)))%7]
                                )
                                {scwRows.childNodes[j].onclick = null;

                                 if (scwID('scwIE'))
                                    {scwRows.childNodes[j].onmouseover  = null;
                                     scwRows.childNodes[j].onmouseout   = null;
                                    }

                                 scwCell.className=
                                    (scwShowDate.getMonth()!=scwCurMonth)
                                        ?'scwCellsExMonthDisabled'
                                        :(scwBlnFullInputDate &&
                                          scwShowDate.toDateString()==
                                          scwSeedDate.toDateString())
                                            ?'scwInputDateDisabled'
                                            :(scwShowDate.getDay()%6==0)
                                                ?'scwCellsWeekendDisabled'
                                                :'scwCellsDisabled';

                                 scwCell.style.borderColor =
                                     (scwFormatTodayCell && scwShowDate.toDateString()==scwDateNow.toDateString())
                                        ?scwTodayCellBorderColour
                                        :(scwCell.currentStyle)
                                            ?scwCell.currentStyle['backgroundColor']
                                            :(window.getComputedStyle)
                                                ?document.defaultView.getComputedStyle(scwCell,null).getPropertyValue('background-color')
                                                :'';
                                }
                             else
                                {scwRows.childNodes[j].onclick=scwCellOutput;

                                 if (scwID('scwIE'))
                                    {scwRows.childNodes[j].onmouseover  = scwChangeClass;
                                     scwRows.childNodes[j].onmouseout   = scwChangeClass;
                                    }

                                 scwCell.className=
                                     (scwShowDate.getMonth()!=scwCurMonth)
                                        ?'scwCellsExMonth'
                                        :(scwBlnFullInputDate &&
                                          scwShowDate.toDateString()==
                                          scwSeedDate.toDateString())
                                            ?'scwInputDate'
                                            :(scwShowDate.getDay()%6==0)
                                                ?'scwCellsWeekend'
                                                :'scwCells';

                                 scwCell.style.borderColor =
                                     (scwFormatTodayCell && scwShowDate.toDateString() == scwDateNow.toDateString())
                                        ?scwTodayCellBorderColour
                                        :(scwCell.currentStyle)
                                            ?scwCell.currentStyle['backgroundColor']
                                            :(window.getComputedStyle)
                                                ?document.defaultView.getComputedStyle(scwCell,null).getPropertyValue('background-color')
                                                :'';
                               }

                             scwShowDate.setDate(scwShowDate.getDate()+1);
                             scwCompareDateValue = new Date(scwShowDate.getFullYear(),scwShowDate.getMonth(),scwShowDate.getDate()).valueOf();
                            }
                        }
                    }
                }
            }

         // Opera has a bug with setting the selected index.
         // It requires the following work-around to force SELECTs to display correctly.
         // Also Opera's poor dynamic rendering prior to 9.5 requires
         // the visibility to be reset to prevent garbage in the calendar
         // when the displayed month is changed.

         if (window.opera)
            {scwID('scwMonths').style.display = 'inline';
             scwID('scwYears' ).style.display = 'inline';
             scwID('scw').style.visibility='hidden';
             scwID('scw').style.visibility='inherit';
           }
        };

// *************************
//  End of Function Library
// *************************
// ***************************
// Start of Calendar structure
// ***************************

    document.writeln("<!--[if IE]><div id='scwIE'></div><![endif]-->");
    document.writeln("<!--[if lt IE 7]><div id='scwIElt7'></div><![endif]-->");
    document.write(
     "<iframe class='scw' " + (scwID('scwIElt7')?"src='/scwblank.html '":'') +
             "id='scwIframe' name='scwIframe' frameborder='0'>" +
     "</iframe>" +
     "<table id='scw' class='scw'>" +
       "<tr class='scw'>" +
         "<td class='scw'>" +
           "<table class='scwHead' id='scwHead' width='100%' " +
                    "cellspacing='0' cellpadding='0'>" +
            "<tr id='scwDrag' style='display:none;'>" +
                "<td colspan='4' class='scwDrag' " +
                    "onmousedown='scwBeginDrag(event);'>" +
                    "<span id='scwDragText'></span>" +
                "</td>" +
            "</tr>" +
            "<tr class='scwHead' >" +
                 "<td class='scwHead'>" +
                    "<input class='scwHead' id='scwHeadLeft' type='button' value='<' " +
                            "onclick='scwShowMonth(-1);'  /></td>" +
                 "<td class='scwHead'>" +
                    "<select id='scwMonths' class='scwHead' " +
                            "onchange='scwShowMonth(0);'>" +
                    "</select>" +
                 "</td>" +
                 "<td class='scwHead'>" +
                    "<select id='scwYears' class='scwHead' " +
                            "onchange='scwShowMonth(0);'>" +
                    "</select>" +
                 "</td>" +
                 "<td class='scwHead'>" +
                    "<input class='scwHead' id='scwHeadRight' type='button' value='>' " +
                            "onclick='scwShowMonth(1);' /></td>" +
                "</tr>" +
              "</table>" +
            "</td>" +
          "</tr>" +
          "<tr class='scw'>" +
            "<td class='scw'>" +
              "<table class='scwCells' align='center'>" +
                "<thead>" +
                  "<tr><td class='scwWeekNumberHead' id='scwWeek_' ></td>");

    for (i=0;i<7;i++)
        {document.write(
                      "<td class='scwWeek' id='scwWeekInit" + i + "'></td>");
        }

    document.write("</tr>" +
                "</thead>" +
                "<tbody id='scwCells' onClick='scwStopPropagation(event);'>");

    for (i=0;i<6;i++)
        {document.write(
                    "<tr>" +
                      "<td class='scwWeekNo' id='scwWeek_" + i + "'></td>");
         for (j=0;j<7;j++)
            {document.write(
                        "<td class='scwCells' id='scwCell_" + (j+(i*7)) +
                        "'></td>");
            }

         document.write(
                    "</tr>");
        }

    document.write(
                "</tbody>" +
                "<tfoot>" +
                  "<tr id='scwFoot'>" +
                    "<td colspan='8' style='padding:0px;'>" +
                      "<table width='100%'>" +
                        "<tr>" +
                          "<td id='scwClear' class='scwClear'>" +
                            "<input type='button' id='scwClearButton' class='scwClear' " +
                                   "onclick='scwTargetEle.value = \"\";scwHide();' />" +
                          "</td>" +
                          "<td class='scwNow' id='scwNow'></td>" +
                        "</tr>" +
                      "</table>" +
                    "</td>" +
                  "</tr>" +
                "</tfoot>" +
              "</table>" +
            "</td>" +
          "</tr>" +
        "</table>");

    if (document.addEventListener)
            {scwID('scw'         ).addEventListener('click',scwCancel,false);
             scwID('scwHeadLeft' ).addEventListener('click',scwStopPropagation,false);
             scwID('scwMonths'   ).addEventListener('click',scwStopPropagation,false);
             scwID('scwMonths'   ).addEventListener('change',scwStopPropagation,false);
             scwID('scwYears'    ).addEventListener('click',scwStopPropagation,false);
             scwID('scwYears'    ).addEventListener('change',scwStopPropagation,false);
             scwID('scwHeadRight').addEventListener('click',scwStopPropagation,false);
            }
    else    {scwID('scw'         ).attachEvent('onclick',scwCancel);
             scwID('scwHeadLeft' ).attachEvent('onclick',scwStopPropagation);
             scwID('scwMonths'   ).attachEvent('onclick',scwStopPropagation);
             scwID('scwMonths'   ).attachEvent('onchange',scwStopPropagation);
             scwID('scwYears'    ).attachEvent('onclick',scwStopPropagation);
             scwID('scwYears'    ).attachEvent('onchange',scwStopPropagation);
             scwID('scwHeadRight').attachEvent('onclick',scwStopPropagation);
            }

// ***************************
//  End of Calendar structure
// ***************************
// ****************************************
// Start of document level event definition
// ****************************************

    if (document.addEventListener)
            {document.addEventListener('click',scwHide, false);}
    else    {document.attachEvent('onclick',scwHide);}

// ****************************************
//  End of document level event definition
// ****************************************
// ************************************
//  End of Simple Calendar Widget Code
// ************************************