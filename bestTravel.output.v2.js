
//  1 LIBRARY ------------------------------------------------------------------------------------------------

//  1.1 CONSTANTS --------------------------------------------------------------------------------------------
    
        const SCOPE = [50,45,55,46,56,33,57,58,34,21];
        const ROUTELENGTH = 4;    
      
//  1.2 UNIT FUNCTIONS ---------------------------------------------------------------------------------------


//  1.2.1 assert (for local testing) -------------------------------------------------------------------------   

    const assert = (_statement,_function,_positiveOutcome) => {
        return(
                JSON.stringify(_function) === JSON.stringify(_positiveOutcome) 
                ? console.log(`YES! ${_statement}, ooph!`) 
                : console.log(`NOPE! ${_statement} works WRONG!!!`)
        );
    };
        
//  1.2.2 allRoutesIndexesExtractor --------------------------------------------------------------------------

    const allRoutesIndexesExtractor = _array => _array.map((e,i) => i); 
    assert( "Indices are extracted", 
             allRoutesIndexesExtractor([34,2,5,6]),
             [0,1,2,3]
    );
    
//  1.2.3 headAndTailIndex ----------------------------------------------------------------------------------  

    const allRoutesHeadsAndTailsIndexes = (_SCOPEindexExtracted,_ROUTELENGTH) => {
        const heads = _SCOPEindexExtracted.slice(0,_ROUTELENGTH);
        const tails = _SCOPEindexExtracted.slice(
            _SCOPEindexExtracted.length-_ROUTELENGTH,
            _SCOPEindexExtracted.length);
        return [heads,tails] 
    };
    assert( "Heads and Tails are extracted and presented", 
             allRoutesHeadsAndTailsIndexes([0,1,2,3,4,5,6,7,8,9],4),
             [[0,1,2,3],[6,7,8,9]]
    );

//  1.2.4 zipper --------------------------------------------------------------------------------------------- 

    const zipper = (_arrayOne,_arrayTwo) => _arrayOne.map((e,i) => [e].concat(_arrayTwo[i]));
    assert( "Two arrays are zipped", 
             zipper([0,2],[3,4]),
             [[0,3],[2,4]]
    );   

//  1.2.5 allRoutesHeadsAndTails -----------------------------------------------------------------------------

    const allRoutesHeadsAndTails = (_headsTails,_zipper) => zipper(_headsTails[0],_headsTails[1]);
    assert( "Body parts are extracted and presented", 
             allRoutesHeadsAndTails([[0,1],[6,7]],zipper),
             [[0,6],[1,7]]
    );

//  1.2.6 allRoutesBodyParts ---------------------------------------------------------------------------------  

    const allRoutesBodyParts = (_allRoutesHeadsAndTails,_SCOPE) => {
       return (_allRoutesHeadsAndTails.map((_,i) => 
            _SCOPE.slice(_allRoutesHeadsAndTails[i][0],_allRoutesHeadsAndTails[i][1]+1)));
    };
    assert( "Slice gives the flash", 
             allRoutesBodyParts([[0,3],[1,4],[2,5]],[50,45,55,46,66,87]),
             [[50,45,55,46],
              [45,55,46,66],
              [55,46,66,87]]
    );

//  1.2.7 comparator -----------------------------------------------------------------------------------------

    const comparator = (_a,_b) => JSON.stringify(_a)== JSON.stringify(_b);
    assert( "Two given arrays are equal",
             comparator([[0,0],[0,1]],[[0,0],[0,1]]),
             true
    );        

//  1.2.8 allRoutesFromVariationsScope -----------------------------------------------------------------------
     
    const allRoutesFromVariationsScope = (_scope, _numSys) => {
        return Array(_scope).fill(1).map((e,i) => i.toString(_numSys-1));
    };
    assert( "Ten to six digit system transformation works", 
             allRoutesFromVariationsScope(10,7),
             ["0","1","2","3","4","5","10","11","12","13"]                    
    );
            
//  1.2.9 numSplitter ---------------------------------------------------------------------------------------- 

    const splitNum = _num => _num.toString().split("").map(n => +n);
    assert( "Number is splitted", 
             splitNum(123),
             [1,2,3]                    
    );

//  1.2.10 isAscending --------------------------------------------------------------------------------------

    const isAscending = _num => {
        const splittedNum = splitNum(_num);
        const sortedSplittedNum = splittedNum.map(e => e).sort((a,b) => (a-b));
        return ( 
            JSON.stringify(splittedNum) == 
            JSON.stringify(sortedSplittedNum)
        );
    };   
    assert( "Alarm, this number is not ascending", 
             isAscending(132),
             false                    
    );

//  1.2.11 onlyAscendingFiltered -----------------------------------------------------------------------------

    const filterOnlyAscending = _array => {
        return _array.filter(e => isAscending(e,splitNum)!==false);
    };
    assert( "Leaves only what is equal or ascending", 
             filterOnlyAscending([123,231,321,331,133]),
             [123,133]                    
    );

//  1.2.12 zeroPrefixAdder ----------------------------------------------------------------------------------

    const addZeroPrefix = (_num,_needLength) => {           
        const howMuch = _needLength - _num.toString().length;
        const companion =  Array(howMuch).fill(0).join("").toString();
        return companion.concat(_num.toString());
    };
    assert( "Zero companion adds itself successfully", 
             addZeroPrefix(32,4),
             "0032"                    
    );

//  1.2.13 strokeToCellsSeparator ---------------------------------------------------------------------------
        
    const separateStrokeToCells = _number => _number.split("").map(n => [+n]);
    assert( "Now number becomes adress", 
             separateStrokeToCells("0032"),
             [[0],[0],[3],[2]]                    
    );

//  1.2.14 allRoutesAddressess ------------------------------------------------------------------------------
        
    const allRoutesAddressess = (_nestedArray) => {
        return  _nestedArray.map(e => e[0]);          
    };
    assert( "It can be not that nested",
             allRoutesAddressess([[0],[0],[0]]),
             [0,0,0]
    );

//  1.2.15 nowhereToHide ------------------------------------------------------------------------------------

    const nowhereToHide = (_address, _wordsPool) => {
        return _wordsPool.map((e,i) => _wordsPool[i][_address[i]]);
    };
    assert( "Nowhere to hide!", 
             nowhereToHide( [0,0,0], [[1,2,3],[4,5,6],[7,8,9]]),
             [1,4,7]                    
    );

//  1.2.16 allRoutes ----------------------------------------------------------------------------------------

    const allRoutes = (_addressBook, _wordsPool) => {
        return _addressBook.map((e,i) => nowhereToHide(_addressBook[i],_wordsPool));
    };
    assert( "Nowhere to hide for many addressess!", 
             allRoutes(
                [[0,0,0],[0,0,1],[0,1,1],[1,1,1]],
                [[1,2,3],[4,5,6],[7,8,9]]
             ),
             [[1,4,7],[1,4,8],[1,5,8],[2,5,8]]                    
    );
        
//  1.2.17 allRoutesLengths --------------------------------------------------------------------------
    const allRoutesLengths = _array => _array.map((x,i) => x.reduce((sum,cur)=>(sum+cur),0) );
    assert( "Array of sums is counted", 
             allRoutesLengths([[50,55,57],[50,55,58],[50,55,60]]),
             [162,163,165]                    
    );

//  1.2.18 allRoutesLengthsIndexed -------------------------------------------------------------------
    const allRoutesLengthsIndexed = _array => _array.map((x,i) => [ i, x.reduce((sum,cur)=>(sum+cur),0) ] );
    assert( "Array of sums is counted and indexed", 
             allRoutesLengthsIndexed([[50,55,57],[50,55,58],[50,55,60]]),
             [[0,162],[1,163],[2,165]]                    
    );

//  1.2.19 allDistances ----------------------------------------------------------------------------------

    const allDistances = _array => _array.map(x => x.reduce((sum,cur)=>(sum+cur),0) );
    assert( "All distances now known from routes", 
             allDistances([[50,55,57],[50,55,58],[50,55,60]]),
             [162,163,165]                    
    );

//  1.2.20 allRoutesDetails -------------------------------------------------------------------------------  

    const allRoutesDetails = (_allRoutes,_allDistances) => {
        return zipper(_allRoutes,_allDistances);     };
    assert( "Here you can see both whole distance and part distances", 
             allRoutesDetails(
                [[50,55,57],[50,55,58],[50,55,60]],
                [162,163,165]
             ),
             [[[50,55,57],162],
              [[50,55,58],163],
              [[50,55,60],165]]                  
    );

//  1.2.21 TargetRouteDetails -------------------------------------------------------------------------------
        
    const TargetRouteDetails = (_field,_target) => {
        return _field.filter(x => x[1]===_target && x[1]<=_target)[0];
    };
    assert( "It returns the array with a target sum of elements", 
             TargetRouteDetails(
                [[[50,55,57],162],
                 [[50,55,58],163],
                 [[50,55,60],165]],
                 163
             ),
             [[50,55,58],163]                    
    ); 


//  2 BUILDING ---------------------------------------------------------------------------------------------   

//  2.1 MODULE FUNCTIONS -----------------------------------------------------------------------------------
          
//  2.1.1 optimalRouteFinder -------------------------------------------------------------------------------

    const findOptimalRoute = (_TargetRouteLength,_NumOfCities,_allRoutesDistances) => {
        const $ = {
            //
            // [50, 55, 57, 58, 60] 
            // => [0, 1, 2, 3, 4] 
            allRoutesIndexesExtractor: () => 
                allRoutesIndexesExtractor( _allRoutesDistances ),

            // ( [0, 1, 2, 3, 4], 3 ) 
            // => [[0,1,2],[2,3,4]]
            allRoutesHeadsAndTailsIndexes: () => 
                allRoutesHeadsAndTailsIndexes( $.allRoutesIndexesExtractor(), _NumOfCities ),

            // ( [[0,1,2],[2,3,4]], zipper ) 
            // => [[0,2],[1,3],[2,4]]
            allRoutesHeadsAndTails: () => 
                allRoutesHeadsAndTails( $.allRoutesHeadsAndTailsIndexes(), zipper ),

            // ( [[0,2],[1,3],[2,4]], [50,55,57,58,60] ) 
            // => [[50,55,57],[55,57,58],[57,58,60]]
            allRoutesBodyParts: () => 
                allRoutesBodyParts( $.allRoutesHeadsAndTails(), _allRoutesDistances ),

            // (3,3) 
            // => 27
            allRoutesVariationsScope: () =>  
                Math.pow( $.allRoutesBodyParts()[1].length, $.allRoutesBodyParts().length ),

            // 27,4 
            // => ["0","1","2","10","11","12","20","21","22","100","101","102","110","111", 
            //    "112","120","121","122","200","201","202","210","211","212","220","221","222"]
            allRoutesFromVariationsScope: () => 
                allRoutesFromVariationsScope( $.allRoutesVariationsScope(), $.allRoutesBodyParts()[1].length + 1 ),

            //  ["0","1","2","10","11","12","20","21","22","100","101","102","110","111", 
            //   "112","120","121","122","200","201","202","210","211","212","220","221","222"]
            //  => ["0","1","2","11","12","22","111","112","122","222"]
            filterOnlyAscending : () => 
                filterOnlyAscending( $.allRoutesFromVariationsScope() ),

            // ["0","1","2","11","12","22","111","112","122","222"] 
            // => ["000","001","002","011","012","022","111","112","122","222"]
            addZeroPrefix: () => 
                $.filterOnlyAscending().map( n => addZeroPrefix( n, $.allRoutesBodyParts().length) ),

            // ["000","001","002","011","012","022","111","112","122","222"] 
            // => [[[0],[0],[0]],[[0],[0],[1]],[[0],[0],[2]],[[0],[1],[1]],
            //     [[0],[1],[2]],[[0],[2],[2]],[[1],[1],[1]],[[1],[1],[2]],
            //     [[1],[2],[2]],[[2],[2],[2]]]
            separateStrokeToCells: () => 
                $.addZeroPrefix().map( n => separateStrokeToCells(n) ),

            // [[[0],[0],[0]],[[0],[0],[1]],[[0],[0],[2]],[[0],[1],[1]],
            //  [[0],[1],[2]],[[0],[2],[2]],[[1],[1],[1]],[[1],[1],[2]],
            //  [[1],[2],[2]],[[2],[2],[2]]
            // => [[0,0,0],[0,0,1],[0,0,2],[0,1,1],[0,1,2],[0,2,2],[1,1,1],[1,1,2],[1,2,2],[2,2,2]]
            allRoutesAddressess: () => 
                $.separateStrokeToCells().map( x => (allRoutesAddressess(x) )), 

            // ([[0,0,0],[0,0,1],[0,0,2],[0,1,1],[0,1,2],[0,2,2],[1,1,1],[1,1,2],[1,2,2],[2,2,2]],
            //  [[50,55,57],[55,57,58],[57,58,60]]) 
            // => [[50,55,57],[50,55,58],[50,55,60],
            //     [50,57,58],[50,57,60],[50,58,60],
            //     [55,57,58],[55,57,60],[55,58,60],[57,58,60]]
            allRoutes: () => 
                allRoutes( $.allRoutesAddressess(), $.allRoutesBodyParts() ),
   
            // [[50,55,57],[50,55,58],[50,55,60],
            //  [50,57,58],[50,57,60],[50,58,60],
            //  [55,57,58],[55,57,60],[55,58,60],[57,58,60]],
            // => [162,163,165,165,167,168,170,172,173,175],
            allDistances: () => 
                allDistances($.allRoutes()),        

            // ([[50,55,57],[50,55,58],[50,55,60],
            //   [50,57,58],[50,57,60],[50,58,60],
            //   [55,57,58],[55,57,60],[55,58,60],[57,58,60]],
            //  [162,163,165,165,167,168,170,172,173,175]),
            // => [[[50,55,57],162], [[50,55,58],163], [[50,55,60],165],
            //     [[50,57,58],165], [[50,57,60],167], [[50,58,60],168],
            //     [[55,57,58],170], [[55,57,60],172], [[55,58,60],173],
            //     [[57,58,60],175]]
            allRoutesDetails: () => 
                allRoutesDetails($.allRoutes(),$.allDistances()),            
            
            // ([[[50,55,57],162], [[50,55,58],163], [[50,55,60],165],
            //   [[50,57,58],165], [[50,57,60],167], [[50,58,60],168],
            //   [[55,57,58],170], [[55,57,60],172], [[55,58,60],173],
            //   [[57,58,60],175]]),
            //   163
            // => [[50,55,58],163] 
            TargetRouteDetails: () => 
                TargetRouteDetails($.allRoutesDetails(),_TargetRouteLength)
        };          
        return $.TargetRouteDetails();            
    }; 
    assert(
        "Extracts all triples from given scope",
        findOptimalRoute(163, 3, [50, 55, 57, 58, 60]),
        [[50,55,58],163]
    );
    assert(
        "Extracts all triples from given scope",
        findOptimalRoute(228, 3, [91, 74, 73, 85, 73, 81, 87]),
        [[74,73,81],228] 
    );
    assert(
        "Extracts all triples from given scope",
        findOptimalRoute(173, 3, [50, 55, 57, 58, 60]),
        [[55, 58, 60],173] 
    );

// -----------------------------------------------------------------------------------------------------






