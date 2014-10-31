var savage = new Savage();

// savage.convert('sample');

// $('#clicky').click(function(){
//     savage.edit('outer-rect')
//         .fill('#fff');
//     var ids = savage.getIDs('sample');
// });

 var $outer_rect = $('#sample').contents().find('#outer-rect');
 savage.edit($outer_rect)
    .fill('#fff')
    .stroke('#7f0c15', '6px');



