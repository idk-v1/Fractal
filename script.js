can.width = window.innerWidth;
can.height = window.innerHeight;
let ctx = can.getContext("2d");
rr.currentTime = 0;
audio.playbackRate = 0.995;

let initSize = 300;
let obj = [];

let delta = 0;
let now = 0;
let last = 0;
let time = 0;

class shape
{
	constructor(x, y, size)
	{
		this.x = x;
		this.y = y;
		this.size = size;
	}
}

function creates(level, x, y, size, d)
{
	if (level > 0)
	{
		obj.push(new shape(x, y, size));
		if(d != 1) creates(level - 1, x - size * 0.75, y, size / 2, 0);
		if(d != 0) creates(level - 1, x + size * 0.75, y, size / 2, 1);
		if(d != 3) creates(level - 1, x, y - size * 0.75, size / 2, 2);
		if(d != 2) creates(level - 1, x, y + size * 0.75, size / 2, 3);
	}
}

function render()
{
ctx.clearRect(0, 0, can.width, can.height);
ctx.save();
ctx.translate(can.width / 2, can.height / 2);
ctx.rotate(rr.currentTime);
ctx.scale(1 + Math.sin(time * 0.05) * 0.1, 1 + Math.sin(time * 0.05) * 0.1);

now = performance.now();
delta += now - last;
last = now;

count.innerText = " " + rr.currentTime.toFixed(2).padStart(6, '0') + " | " + audio.currentTime.toFixed(2).padStart(6, '0') + " | " + (rr.currentTime - audio.currentTime).toFixed(2);
	
while(delta >= 1000 / 60)
{
	time++;
	rr.currentTime = (rr.currentTime + 1 / 60) % rr.duration;
	delta -= 1000 / 60;
	
	if(rr.currentTime - audio.currentTime >= 0.3)
	{
		audio.currentTime = rr.currentTime + 0.5;
	}
}
for(let i = 0; i < obj.length; i++)
{
	ctx.drawImage(rr, obj[i].x - obj[i].size / 2, obj[i].y - obj[i].size / 2, obj[i].size, obj[i].size);
	
	ctx.strokeRect(obj[i].x - obj[i].size / 2, obj[i].y - obj[i].size / 2, obj[i].size, obj[i].size);
}
ctx.restore();
}
