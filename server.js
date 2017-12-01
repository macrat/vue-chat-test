const app = require('express')();
const server = app.listen(process.env.PORT || 8000, () => console.log(`listening on *:${server.address().port}`));

const io = require('socket.io')(server);

const jwks = require('jwks-rsa');
const socketioJwt = require('socketio-jwt');

const fs = require('fs');


const DOMAIN = process.env.AUTH0_DOMAIN;
const CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const KID = process.env.AUTH0_KID;


app.get('/', (req, res) => {
	fs.readFile(__dirname + '/index.html', 'utf-8', (err, html) => {
		res.status(200);
		res.end(html.replace('AUTH0_CLIENT_ID', `'${CLIENT_ID}'`).replace('AUTH0_DOMAIN', `'${DOMAIN}'`));
	});
});

jwks({ jwksUri: `https://${DOMAIN}/.well-known/jwks.json` }).getSigningKey(KID, (err, key) => {
	io.on('connection', socketioJwt.authorize({
		secret: key.publicKey || key.rsaPublicKey,
		issuer: `https://${DOMAIN}/`,
	})).on('authenticated', socket => {
		const profile = {
			name: socket.decoded_token.name,
			picture: socket.decoded_token.picture,
		};

		socket.on('join', msg => {
			if (msg.room) {
				socket.join(msg.room);
				io.to(msg.room).emit('joined', {
					profile: profile,
					room: msg.room,
				});
			}
		});

		socket.on('say', msg => {
			if (msg.room && msg.text) {
				io.to(msg.room).emit('say', {
					profile: profile,
					room: msg.room,
					text: msg.text,
				});
			}
		});
	});
});
