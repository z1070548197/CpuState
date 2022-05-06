var child_process = require('child_process');
var spawn = child_process.spawn;

var wmic = spawn('ls', ['-a']);

wmic.stdout.on('data', function(data) {
     console.log('使用spawn方法输出: ' + data);
 });

wmic.stderr.on('data', function(data) {
     console.log('stderr: ' + data);
});

wmic.on('close', function(code) {
     console.log('child process exited with code ' + code);
});