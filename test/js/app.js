var savage = new Savage();

savage.convert('sample');

$('#clicky').click(function(){
    savage.edit('outer-rect')
        .color('#fff');
});
