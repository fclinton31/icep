function ValidateID(id_number){
				var sectionTestsSuccessFull = 1;
				var MessageCodeArray 		= [];
				var MessageDescriptionArray = [];
				var currentTime 			= new Date();
				
				/* DO ID LENGTH TEST */
				if (id_number.length == 13){ 
					/* SPLIT ID INTO SECTIONS */
					var year      	= id_number.substr ( 0  , 2 );
					var month     	= id_number.substr ( 2  , 2 );
					var day       	= id_number.substr ( 4  , 2 );
					var gender    	= (id_number.substr ( 6  , 4 )*1);
					var citizen   	= (id_number.substr ( 10 , 2 )*1);
					var check_sum 	= (id_number.substr ( 12 , 1 )*1);
					
					/* DO YEAR TEST */
					var nowYearNotCentury = currentTime.getFullYear() + '';
					nowYearNotCentury = nowYearNotCentury.substr(2,2);
					if (year <= nowYearNotCentury){
						year = '20' + year;
					} else {
						year = '19' + year;
					}//end if
					if ((year > 1900) && (year < currentTime.getFullYear())){
						//correct
					} else {
						sectionTestsSuccessFull = 0;
						MessageCodeArray[MessageCodeArray.length] = 1;
						MessageDescriptionArray[MessageDescriptionArray.length] = 'Year is not valid ';
					}//end if
					
					/* DO MONTH TEST */
					if ((month > 0) && (month < 13)){
						//correct
					} else {
						sectionTestsSuccessFull = 0;
						MessageCodeArray[MessageCodeArray.length] = 2;
						MessageDescriptionArray[MessageDescriptionArray.length] = 'Month is not valid ';
					}//end if
					
					/* DO DAY TEST */
					if ((day > 0) && (day < 32)){
						//correct
					} else {
						sectionTestsSuccessFull = 0;
						MessageCodeArray[MessageCodeArray.length] = 3;
						MessageDescriptionArray[MessageDescriptionArray.length] = 'Day is not valid ';
					}//end if
					
					/* DO DATE TEST */
					if ((month==4 || month==6 || month==9 || month==11) && day==31) {
						sectionTestsSuccessFull = 0;
						MessageCodeArray[MessageCodeArray.length] = 4;
						MessageDescriptionArray[MessageDescriptionArray.length] = 'Date not valid. This month does not have 31 days ';
					}
					if (month == 2) { // check for february 29th
						var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
						if (day > 29 || (day==29 && !isleap)) {
							sectionTestsSuccessFull = 0;
							MessageCodeArray[MessageCodeArray.length] = 5;
							MessageDescriptionArray[MessageDescriptionArray.length] = 'Date not valid. February does not have ' + day + ' days for year ' + year +' ';
						}//end if
					}//end if
					
					/* DO GENDER TEST */
					if ((gender >= 0) && (gender < 10000)){
						//correct
					} else {
						sectionTestsSuccessFull = 0;
						MessageCodeArray[MessageCodeArray.length] = 6;
						MessageDescriptionArray[MessageDescriptionArray.length] = 'Gender is not valid, ';
					}//end if
					
					/* DO CITIZEN TEST */
					//08 or 09 SA citizen
					//18 or 19 Not SA citizen but with residence permit
					if ((citizen == 8) || (citizen == 9) || (citizen == 18) || (citizen == 19)){
						//correct
					} else {
						sectionTestsSuccessFull = 0;
						MessageCodeArray[MessageCodeArray.length] = 7;
						MessageDescriptionArray[MessageDescriptionArray.length] = 'Citizen value is not valid ';
					}//end if
					
					/* GET CHECKSUM VALUE */
					var check_sum_odd         = 0;
					var check_sum_even        = 0;
					var check_sum_even_temp   = "";
					var check_sum_value       = 0;
					var count = 0;
					// Get ODD Value
					for( count = 0 ; count < 11 ; count += 2 ){
						check_sum_odd += (id_number.substr ( count , 1 )*1);
					}//end for
					// Get EVEN Value
					for( count = 0 ; count < 12 ; count += 2 ){
						check_sum_even_temp = check_sum_even_temp + (id_number.substr ( count+1 , 1 )) + '';
					}//end for
					check_sum_even_temp = check_sum_even_temp * 2;
					check_sum_even_temp = check_sum_even_temp + '';
					for( count = 0 ; count < check_sum_even_temp.length ; count++ ){
						check_sum_even += (check_sum_even_temp.substr( count , 1 ))*1;
					}//end for
					// GET Checksum Value
					check_sum_value = (check_sum_odd*1) + (check_sum_even*1);
					check_sum_value = check_sum_value + 'xxx';
					check_sum_value = ( 10 - (check_sum_value.substr( 1 , 1 )*1) );
					if(check_sum_value == 10)
						check_sum_value = 0;
					
					/* DO CHECKSUM TEST */
					if(check_sum_value == check_sum){
						//correct
					} else {
						sectionTestsSuccessFull = 0;
						MessageCodeArray[MessageCodeArray.length] = 8;
						MessageDescriptionArray[MessageDescriptionArray.length] = 'ID Number is not valid ';
					}//end if
					
				} else {
					sectionTestsSuccessFull = 0;
					MessageCodeArray[MessageCodeArray.length] = 0;
					MessageDescriptionArray[MessageDescriptionArray.length] = 'ID Number is not the right length';
				}//end if
				
				var returnArray = [ sectionTestsSuccessFull, MessageCodeArray, MessageDescriptionArray];
				return returnArray;
			}//end function