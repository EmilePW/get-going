var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();
router.get('/*', (req, res) => res.sendFile(__dirname + '/index.html'));

app.set('port', process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, '/')), router);
app.listen(app.get('port'), () => console.log('Listening on port ' + app.get('port')));
