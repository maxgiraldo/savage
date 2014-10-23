function Savage() {
    this.default = 'Savage 0.0.1';
}

Savage.prototype.edit = function(el) {
    return {
        color: function(hex) {
            console.log('the hex you entered was', hex);
        }
    }
}

var eye = new Savage();
// var $el = Document.getElementById('eye');

eye.edit($el)
    .color('#000');