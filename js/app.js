var BREAK_DEFAULT_VALUE = 5,
    SESSION_DEFAULT_VALUE = 25,
    startSession = true,
    startBreak = false;

var session =
{
    session: 1501,
    break: 301,
    display: function()
    {
        var sessionDuration = document.getElementById('session-length'),
            breakDuration = document.getElementById('break-length'),
            timer = document.querySelector('h2');

        sessionDuration.innerHTML = parseInt(this.session / 60);
        breakDuration.innerHTML = parseInt(this.break / 60);
        timer.innerHTML = parseInt(this.session / 60);
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
        if(session === 'session' && parseInt(this.session / 60) > 1)
            this.session -= 60;
        else if(session === 'break' && parseInt(this.break / 60) > 1)
            this.break -= 60;
        this.display();
    },
    listeners: function()
    {
        var plus = document.querySelectorAll('.plus'),
            minus = document.querySelectorAll('.minus'),
            start = document.getElementById('start'),
            reset = document.getElementById('reset'),
            pause = document.getElementById('pause'),
            that = this,
            id;

        that.display();

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
        function minutesEventListeners(action)
        {
            if(action === 'add')
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
            else if(action === 'remove')
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
        }

        minutesEventListeners('add');

        start.addEventListener('click', function()
        {
            minutesEventListeners('remove');
            this.style.display = 'none';
            pause.style.display = 'inline-block';
            id = setInterval(function()
            {
                if(startSession)
                {
                    that.sessionStart();
                    if(that.session === 0)
                    {
                        that.session = document.getElementById('session-length').innerHTML * 60 + 1;
                        startSession = false;
                        startBreak = true;
                    }
                }
                if(startBreak)
                {
                    that.breakStart();
                    if(that.break === 0)
                    {
                        that.break = document.getElementById('break-length').innerHTML * 60 + 1;
                        startSession = true;
                        startBreak = false;
                    }
                }

            }, 1000);
        });

        pause.addEventListener('click', function()
        {
            clearInterval(id);
            this.style.display = 'none';
            start.style.display = 'inline-block';
        });

        reset.addEventListener('click', function(){
            that.session = 1501;
            that.break = 301;
            clearInterval(id);
            pause.style.display = 'none';
            start.style.display = 'inline-block';
            that.display();
            minutesEventListeners('add');
        });
    },
    sessionStart: function()
    {
        this.session--;
        var timer = document.querySelector('h2'),
            minutes = (parseInt(this.session / 60)).toString(),
            seconds = (this.session % 60).toString();

        timer.innerHTML = (minutes.length === 1 ? '0' + minutes : minutes) +
                          ' : ' +
                          (seconds.length === 1 ? '0' + seconds : seconds);
    },
    breakStart: function()
    {
        this.break--;
        var timer = document.querySelector('h2'),
            minutes = (parseInt(this.break / 60)).toString(),
            seconds = (this.break % 60).toString();

        timer.innerHTML = (minutes.length === 1 ? '0' + minutes : minutes) +
                          ' : ' +
                          (seconds.length === 1 ? '0' + seconds : seconds);
    }
};


session.listeners();

