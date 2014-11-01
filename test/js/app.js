var savage = new Savage();

// savage.convert('sample');

// $('#clicky').click(function(){
//     savage.edit('outer-rect')
//         .fill('#fff');
//     var ids = savage.getIDs('sample');
// });

 // Find an inner shape by ID
 // Get parent SVG
 // var $outer_rect = $('#sample').contents().find('#outer-rect');


 // savage.edit($outer_rect)
 //    .fill('#fff')
 //    .stroke('#7f0c15', '6px');

// get SVG parent by iFrame id

var parent1, parent2;

parent1 = savage.getParentById('sample');

savage.highlight(parent1, '#fff759');


