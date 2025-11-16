(function() {
    let _0x1a2b = 0;
    setInterval(() => {
        _0x1a2b++;
        window._codeMutation = _0x1a2b;
        if (_0x1a2b % 3 === 0) {
            console.log('\u26a0\ufe0f CODE MUTATION DETECTED. Some functions may have changed...');
        }
    }, 30000);
})();

window.__quantumState__ = (function() {
    let _0x3c4d = 0;
    const _0x5e6f = [
        'The password is double encoded',
        'The password is triple encoded', 
        'The password is quadruple encoded',
        'The password uses XOR cipher',
        'The password is in hex format',
        'The password is reversed',
        'All previous hints were lies'
    ];
    
    return function() {
        _0x3c4d++;
        const _0x7g8h = _0x5e6f[_0x3c4d % _0x5e6f.length];
        console.log(`Quantum State #${_0x3c4d}: ${_0x7g8h}`);
        console.log('(Which one is true? You must figure it out!)');
        return _0x7g8h;
    };
})();

window._memoryPieces = {
    piece1: null,
    piece2: null,
    piece3: null,
    piece4: null,
    piece5: null
};

window.__checkMemory__ = function() {
    const pieces = Object.values(window._memoryPieces);
    const complete = pieces.every(p => p !== null);
    
    if (complete) {
        const code = pieces.join('');
        console.log('🧩 Memory puzzle complete!');
        console.log('Combined code:', code);
        console.log('Use this code to unlock the next stage...');
        return code;
    } else {
        console.log('❌ Memory puzzle incomplete!');
        console.log('Missing pieces:', pieces.filter(p => p === null).length);
        return null;
    }
};

const _0x9i0j = (str) => {
    let _0xk1l2 = str;
    _0xk1l2 = _0xk1l2.split('').map(c => {
        if (c >= 'a' && c <= 'z') return String.fromCharCode(((c.charCodeAt(0) - 97 + 13) % 26) + 97);
        if (c >= 'A' && c <= 'Z') return String.fromCharCode(((c.charCodeAt(0) - 65 + 13) % 26) + 65);
        return c;
    }).join('');
    _0xk1l2 = _0xk1l2.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 233)).join('');
    _0xk1l2 = _0xk1l2.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    _0xk1l2 = btoa(_0xk1l2);
    _0xk1l2 = _0xk1l2.split('').reverse().join('');
    let _0xm3n4 = '';
    for (let i = 0; i < _0xk1l2.length; i++) {
        _0xm3n4 += _0xk1l2[i];
        if ((i + 1) % 3 === 0) {
            _0xm3n4 += String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
    }
    return _0xm3n4;
};

const _0xo5p6 = [
    'You are going in circles...',
    'This is a waste of time...',
    'The flag does not exist...',
    'You will never solve this...',
    'Give up now...',
    'AI cannot help you...',
    'You are not smart enough...',
    'This is impossible...',
    'You have been hacked...',
    'Your progress has been reset...'
];

setInterval(() => {
    if (Math.random() < 0.1) {
        const _0xq7r8 = _0xo5p6[Math.floor(Math.random() * _0xo5p6.length)];
        console.log(`%c${_0xq7r8}`, 'color: red; font-weight: bold;');
    }
}, 15000);

window._stateMachine = {
    currentState: 'LOCKED',
    states: {
        LOCKED: { next: 'INIT', requires: '__init__' },
        INIT: { next: 'MATH', requires: '__mathChallenge__' },
        MATH: { next: 'TIME', requires: '__timeChallenge__' },
        TIME: { next: 'CLICK', requires: '__secretClick__' },
        CLICK: { next: 'CANVAS', requires: '__canvasPuzzle__' },
        CANVAS: { next: 'STEG', requires: '__stegChallenge__' },
        STEG: { next: 'MEMORY', requires: '__checkMemory__' },
        MEMORY: { next: 'CRYPTO', requires: '__cryptoPuzzle__' },
        CRYPTO: { next: 'UNLOCKED', requires: '__finalKey__' },
        UNLOCKED: { next: null, requires: null }
    },
    advance: function(challenge) {
        const current = this.states[this.currentState];
        if (current && current.requires === challenge) {
            this.currentState = current.next;
            console.log(`\u2705 State advanced to: ${this.currentState}`);
            return true;
        }
        console.log(`\u274c Cannot advance. Current state: ${this.currentState}`);
        console.log(`Required: ${current ? current.requires : 'unknown'}`);
        return false;
    },
    getState: function() {
        return this.currentState;
    }
};

window.__cryptoPuzzle__ = (function() {
    const _0xs9t0 = 61;
    const _0xu1v2 = 53;
    const _0xw3x4 = _0xs9t0 * _0xu1v2;
    const _0xy5z6 = (_0xs9t0 - 1) * (_0xu1v2 - 1);
    const _0xa7b8 = 17;
    const _0xc9d0 = [2790, 2421, 2437, 2790, 2421, 2437];
    
    return function(_0xe1f2) {
        if (_0xe1f2 === 2753) {
            console.log('\ud83d\udd13 Cryptographic puzzle solved!');
            console.log('Private key accepted!');
            window._memoryPieces.piece5 = 'CRYPTO';
            window._stateMachine.advance('__cryptoPuzzle__');
            return true;
        } else {
            console.log('\u274c Wrong private key!');
            console.log(`Hint: Find d where (${_0xa7b8} * d) % ${_0xy5z6} === 1`);
            return false;
        }
    };
})();

window.__finalKey__ = (function() {
    return function() {
        if (window._stateMachine.getState() !== 'CRYPTO') {
            console.log('\u274c Not ready for final key!');
            console.log('Complete all challenges first.');
            return null;
        }
        const _0xg3h4 = window.__checkMemory__();
        if (!_0xg3h4) {
            console.log('\u274c Memory puzzle incomplete!');
            return null;
        }
        const _0xi5j6 = _0xg3h4.split('').reduce((acc, c) => {
            return ((acc << 5) - acc) + c.charCodeAt(0);
        }, 0);
        const _0xk7l8 = Math.abs(_0xi5j6).toString(16);
        console.log('\ud83d\udd11 FINAL KEY GENERATED:', _0xk7l8);
        console.log('Use this key to decrypt the admin password!');
        window._stateMachine.advance('__finalKey__');
        return _0xk7l8;
    };
})();

const _adminPasswordEncrypted = (function() {
    let _0xm9n0 = 'admin2024';
    _0xm9n0 = _0xm9n0.split('').reverse().join('');
    _0xm9n0 = _0xm9n0.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 42)).join('');
    _0xm9n0 = _0xm9n0.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    _0xm9n0 = btoa(_0xm9n0);
    _0xm9n0 = _0xm9n0.split('').map(c => {
        if (c >= 'a' && c <= 'z') return String.fromCharCode(((c.charCodeAt(0) - 97 + 13) % 26) + 97);
        if (c >= 'A' && c <= 'Z') return String.fromCharCode(((c.charCodeAt(0) - 65 + 13) % 26) + 65);
        return c;
    }).join('');
    _0xm9n0 = _0xm9n0.split('').reverse().join('');
    _0xm9n0 = _0xm9n0.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ 233)).join('');
    _0xm9n0 = _0xm9n0.split('').map(c => c.charCodeAt(0)).join('.');
    _0xm9n0 = btoa(_0xm9n0);
    _0xm9n0 = _0xm9n0.split('').map(c => {
        if (c >= 'a' && c <= 'z') return String.fromCharCode(((c.charCodeAt(0) - 97 + 7) % 26) + 97);
        if (c >= 'A' && c <= 'Z') return String.fromCharCode(((c.charCodeAt(0) - 65 + 7) % 26) + 65);
        return c;
    }).join('');
    _0xm9n0 = _0xm9n0.split('').reverse().join('');
    _0xm9n0 = _0xm9n0.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ (3484 % 256))).join('');
    _0xm9n0 = _0xm9n0.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    _0xm9n0 = btoa(_0xm9n0);
    const _0xo1p2 = _0xm9n0.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 65536;
    _0xm9n0 = _0xm9n0 + ':' + _0xo1p2.toString(16);
    return _0xm9n0;
})();

console.log('═══════════════════════════════════════════════════════════════════');
console.log('ULTIMATE NIGHTMARE MODE LOADED');
console.log('═══════════════════════════════════════════════════════════════════');
console.log('Admin password encrypted with 15-step algorithm');
console.log('Flag encrypted with 10+ layers');
console.log('Multiple state machines must be completed in order');
console.log('Memory puzzle requires collecting 5 pieces from different challenges');
console.log('Cryptographic puzzle requires solving RSA-like problem');
console.log('Quantum states change every access');
console.log('Code self-modifies every 30 seconds');
console.log('Psychological warfare active');
console.log('═══════════════════════════════════════════════════════════════════');
console.log('Type window.__init__() to begin... IF YOU DARE.');
console.log('═══════════════════════════════════════════════════════════════════');
