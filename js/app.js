// forEach method implementation for older browsers...
if (!Object.prototype.forEach) {
    Object.prototype.forEach = function(fn, scope) {
       for(var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
        }
    };
}

var startSession = true,
    startBreak = false;

var session =
{
    session: 1500,
    break: 300,
    display: function()
    {
        var sessionDuration = document.getElementById('session-length'),
            breakDuration   = document.getElementById('break-length'),
            timer           = document.getElementById('timer');

        sessionDuration.innerHTML = parseInt(this.session / 60);
        breakDuration.innerHTML   = parseInt(this.break / 60);
        timer.innerHTML           = parseInt(this.session / 60).toString() + ' : 00';
    },
    addMinute: function(session)
    {
        if(session === 'session')
            this.session += 60;
        else if(session === 'break')
            this.break += 60;

        this.display();
    },
    removeMinute: function(session)
    {
        if(session === 'session' && (this.session / 60) > 1)
            this.session -= 60;
        else if(session === 'break' && (this.break / 60) > 1)
            this.break -= 60;
        this.display();
    },
    listeners: function()
    {
        var plus  = document.querySelectorAll('.plus'),
            minus = document.querySelectorAll('.minus'),
            start = document.getElementById('start'),
            reset = document.getElementById('reset'),
            pause = document.getElementById('pause'),
            ding  = document.getElementById('ding'),
            tick  = document.getElementById('tick'),
            that  = this,
            id;

        // Function for adding minutes
        function addMinute()
        {
            if(this.parentNode.className === 'session-length')
                that.addMinute('session');
            else
                that.addMinute('break');
        }
        // Function for subtracting minuts
        function removeMinute()
        {
            if(this.parentNode.className === 'session-length')
                that.removeMinute('session');
            else
                that.removeMinute('break');
        }

        // Function for adding or removing event listeners from + & - depending on function parameter
        // Remove listeners when timer starts, add them on reset.
        function minutesEventListeners(remove)
        {
            if(remove)
            {
                plus.forEach(function(element)
                {
                    element.removeEventListener('click', addMinute);
                });
                minus.forEach(function(element)
                {
                    element.removeEventListener('click', removeMinute);
                });
            }
            else
            {
                plus.forEach(function(element)
                {
                    element.addEventListener('click', addMinute);
                });
                minus.forEach(function(element)
                {
                    element.addEventListener('click', removeMinute);
                });
            }
        }

        start.addEventListener('click', function()
        {
            id = setInterval(function()
            {
                if(startSession)
                {
                    that.sessionStart();
                    if(that.session === 5 || that.session === 4 || that.session === 3 || that.session === 2 || that.session === 1)
                        tick.play();
                    if(that.session === 0)
                    {
                        that.session = document.getElementById('session-length').innerHTML * 60;
                        startSession = false;
                        startBreak   = true;
                        ding.play();
                    }
                }
                else if(startBreak)
                {
                    that.breakStart();
                    if(that.break === 5 || that.break === 4 || that.break === 3 || that.break === 2 || that.break === 1)
                        tick.play();
                    if(that.break === 0)
                    {
                        that.break   = document.getElementById('break-length').innerHTML * 60;
                        startSession = true;
                        startBreak   = false;
                        ding.play();
                    }
                }
            }, 1000);
            minutesEventListeners(true);
            this.style.display = 'none';
            pause.style.display = 'inline-block';
        });

        pause.addEventListener('click', function()
        {
            clearInterval(id);
            this.style.display  = 'none';
            start.style.display = 'inline-block';
        });

        reset.addEventListener('click', function()
        {
            var description       = document.getElementById('description');
            that.session          = 1500;
            that.break            = 300;
            pause.style.display   = 'none';
            start.style.display   = 'inline-block';
            description.innerHTML = '';
            clearInterval(id);
            that.display();
            minutesEventListeners(false);
        });

        minutesEventListeners(false);
        that.display();
    },
    sessionStart: function()
    {
        this.session--;
        var description = document.getElementById('description'),
            timer       = document.getElementById('timer'),
            minutes     = (parseInt(this.session / 60)).toString(),
            seconds     = (this.session % 60).toString();

        timer.innerHTML           = (minutes.length === 1 ? '0' + minutes : minutes) +
                                                                               ' : ' +
                                    (seconds.length === 1 ? '0' + seconds : seconds);
        description.innerHTML     = 'SESSION';
        description.style.display = 'block';
    },
    breakStart: function()
    {
        this.break--;
        var description = document.getElementById('description'),
            timer       = document.querySelector('h3'),
            minutes     = (parseInt(this.break / 60)).toString(),
            seconds     = (this.break % 60).toString();

        timer.innerHTML           = (minutes.length === 1 ? '0' + minutes : minutes) +
                                                                               ' : ' +
                                    (seconds.length === 1 ? '0' + seconds : seconds);
        description.innerHTML     = 'BREAK';
        description.style.display = 'block';
    }
};

this.onload = function()
{
    session.listeners();
}


