var BREAK_DEFAULT_VALUE = 5;
var SESSION_DEFAULT_VALUE = 25;

var sessionLength =
{
    length: SESSION_DEFAULT_VALUE,
    display: function()
    {
        var sessionLength = document.getElementById('session-length');
        sessionLength.innerHTML = this.length;
    }
};
var breakLength =
{
    length: BREAK_DEFAULT_VALUE,
    display: function()
    {
        var breakLength = document.getElementById('break-length');
        breakLength.innerHTML = this.length;
    }
};

Object.prototype.add = function()
{
    this.length++;
    this.display();
};
Object.prototype.remove = function()
{
    this.length--;
    this.display();
};
Object.prototype.listeners = function()
{
    var add = document.querySelectorAll('.plus'),
        remove = document.querySelectorAll('.minus');
        console.log(add, remove);
};

sessionLength.display();
breakLength.display();