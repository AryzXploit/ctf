// AryzzXploit CTF Challenge - EXTREME EDITION
// Warning: This is an advanced challenge requiring deep technical knowledge

// Anti-debugging mechanism
(function() {
    const _0x4e2a = function() {
        let _0x5f3b = true;
        return function(_0x1a2b, _0x3c4d) {
            const _0x2e1f = _0x5f3b ? function() {
                if (_0x3c4d) {
                    const _0x4a5b = _0x3c4d.apply(_0x1a2b, arguments);
                    _0x3c4d = null;
                    return _0x4a5b;
                }
            } : function() {};
            _0x5f3b = false;
            return _0x2e1f;
        };
    }();
    
    setInterval(function() {
        const threshold = (function() {
            let result = false;
            (function(a) {
                if (('' + a / a).length !== 1 || a % 20 === 0) {
                    result = true;
                } else {
                    result = false;
                }
            })(++window._dbgCheck || 0);
            return result;
        })();
        
        if (threshold) {
            // DevTools detected - add noise
            console.log('%c🚫 Debug mode detected', 'color: red; font-size: 20px;');
        }
    }, 1000);
})();

// Obfuscated data structure
const _0x7a8b = {
    '\x46\x4c\x41\x47\x50\x52\x4f\x4a\x45\x43\x54\x2d\x41\x52\x5a\x32\x30\x32\x34': {
        id: atob('RkxBR1BST0pFQ1QtQVJaMjAyNA=='),
        title: String.fromCharCode(67,114,105,116,105,99,97,108,32,83,101,99,117,114,105,116,121,32,86,117,108,110,101,114,97,98,105,108,105,116,121),
        researcher: [0x61,0x64,0x6d,0x69,0x6e].map(x=>String.fromCharCode(x)).join(''),
        status: 'confidential',
        severity: 'exceptional',
        // 10-LAYER ENCRYPTED FLAG - INSANE DIFFICULTY! 😈
        // Layer 1: Base64
        // Layer 2: Hex decode
        // Layer 3: XOR with 3484
        // Layer 4: ROT47
        // Layer 5: Reverse
        // Layer 6: XOR with admin token hash
        // Layer 7: Caesar cipher +7
        // Layer 8: Base64 again
        // Layer 9: Custom substitution cipher
        // Layer 10: Final XOR with timestamp hash
        encrypted_poc: 'WTJGa01qQXlNVEF4TURjeE1EWXhNRGN4TURZeE1EY3hNRFl4TURjeE1EWXhNRGN4TURZeE1EY3hNRFl4TURjeE1EWXhNRGN4TURZeE1EY3hNRFl4TURjeE1EWXhNRGN4TURZeE1EY3hNRFl4TURj',
        _k1: 'VGhlIGZpcnN0IGtleSBpcyBoaWRkZW4gaW4gdGhlIHRpbWVzdGFtcA==', // Base64: "The first key is hidden in the timestamp"
        timestamp: '2024-11-16T08:47:13.370Z', // Hidden: 08471337 -> 0x847 + 1337 = 2147 + 1337 = 3484
        bounty: '€51,337',
        _hint: 'U3RhcnQgYnkgZmluZGluZyB0aGUgaGlkZGVuIGZ1bmN0aW9uIGluIHRoZSBnbG9iYWwgc2NvcGU=' // "Start by finding the hidden function in the global scope"
    },
    'TEST-001': {
        id: 'TEST-001',
        title: 'Test Submission',
        researcher: 'testuser',
        status: 'public',
        severity: 'low',
        poc: 'This is a test submission. But is it really just a test? Check the metadata...',
        timestamp: '2024-11-15T10:00:00Z',
        bounty: '€0',
        _metadata: 'SGludDogVGhlIHJlYWwgY2hhbGxlbmdlIHN0YXJ0cyB3aXRoIGZpbmRpbmcgdGhlIF9fX19fX19fX19fXyBmdW5jdGlvbg==' // Hint: The real challenge starts with finding the ___________ function
    }
};

// Create alias
const submissions = _0x7a8b;

// Obfuscated user database
const _0x9c1d = (function() {
    const _db = {};
    const _encode = (s) => s.split('').map(c => c.charCodeAt(0) ^ 0x42).join('.');
    const _decode = (s) => s.split('.').map(n => String.fromCharCode(parseInt(n) ^ 0x42)).join('');
    
    // Researcher account - password is hashed with custom algorithm
    _db[_decode('18.7.19.7.0.18.5.10.7.18')] = {
        password: Array.from('password123').map((c,i) => c.charCodeAt(0) + i).join('-'),
        role: 'researcher',
        token: btoa('researcher_token') + '_' + (0x61bc).toString(16)
    };
    
    // Admin account - EXTREME ENCRYPTION!
    _db[_decode('0.6.13.11.14')] = {
        password: (function() {
            // Password is encrypted with INSANE algorithm:
            // Step 1: Take "admin2024"
            // Step 2: Reverse it
            // Step 3: XOR each char with its index
            // Step 4: Convert to hex
            // Step 5: Base64 encode
            // Step 6: ROT13
            // Step 7: Reverse again
            // Step 8: Add checksum
            // GOOD LUCK! 😈
            
            const original = 'admin2024';
            const step1 = original.split('').reverse().join(''); // "4202nimda"
            const step2 = step1.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) ^ i)).join('');
            const step3 = step2.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
            const step4 = btoa(step3);
            const step5 = step4.split('').map(c => {
                if (c >= 'a' && c <= 'z') return String.fromCharCode(((c.charCodeAt(0) - 97 + 13) % 26) + 97);
                if (c >= 'A' && c <= 'Z') return String.fromCharCode(((c.charCodeAt(0) - 65 + 13) % 26) + 65);
                return c;
            }).join('');
            const step6 = step5.split('').reverse().join('');
            const checksum = step6.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 256;
            return step6 + ':' + checksum.toString(16);
        })(),
        role: 'admin',
        token: (function() {
            const parts = ['admin', 'session', 'token', '2024'];
            return parts.join('_');
        })(),
        _secret: btoa('You need to reverse engineer the password encryption algorithm') // Encrypted hint
    };
    
    // Guest account
    _db['guest'] = {
        password: String.fromCharCode(103,117,101,115,116),
        role: 'guest',
        token: 'guest_token_xyz789'
    };
    
    return _db;
})();

const users = _0x9c1d;

// Session management (vulnerable to manipulation)
let currentSession = {
    user: null,
    token: null,
    role: null,
    authenticated: false
};

// Initialize localStorage
function initStorage() {
    if (!localStorage.getItem('ctf_submissions')) {
        localStorage.setItem('ctf_submissions', JSON.stringify(submissions));
    }
    if (!localStorage.getItem('ctf_users')) {
        localStorage.setItem('ctf_users', JSON.stringify(users));
    }
}

// Vulnerability #1: Weak authentication with client-side validation
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Please enter username and password');
        return;
    }
    
    const storedUsers = JSON.parse(localStorage.getItem('ctf_users'));
    
    // Vulnerability #2: Username enumeration
    if (!storedUsers[username]) {
        alert('User not found. Try: researcher, admin, or guest');
        return;
    }
    
    const user = storedUsers[username];
    
    // Vulnerability #3: Weak password comparison (can be bypassed)
    let passwordMatch = false;
    
    if (username === 'admin') {
        // Admin password is base64 encoded
        passwordMatch = (password === atob(user.password));
    } else {
        passwordMatch = (password === user.password);
    }
    
    if (passwordMatch) {
        currentSession = {
            user: username,
            token: user.token,
            role: user.role,
            authenticated: true
        };
        
        // Vulnerability #4: Session data stored in localStorage (can be manipulated)
        localStorage.setItem('ctf_session', JSON.stringify(currentSession));
        
        document.querySelector('.login-box').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');
        
        alert(`Welcome ${username}! You are logged in as ${user.role}.`);
    } else {
        alert('Invalid password');
    }
}

// Vulnerability #5: Insecure direct object reference (IDOR)
function viewSubmission() {
    const submissionId = document.getElementById('submission-id').value.trim();
    
    if (!submissionId) {
        alert('Please enter a submission ID');
        return;
    }
    
    // Check session (can be bypassed by manipulating localStorage)
    const session = JSON.parse(localStorage.getItem('ctf_session') || '{}');
    
    if (!session.authenticated) {
        alert('Please login first');
        return;
    }
    
    const storedSubmissions = JSON.parse(localStorage.getItem('ctf_submissions'));
    const submission = storedSubmissions[submissionId];
    
    if (!submission) {
        alert('Submission not found. Try: FLAGPROJECT-ARZ2024 or TEST-001');
        return;
    }
    
    // Vulnerability #6: Broken access control
    // Only admin should access confidential submissions, but check is weak
    if (submission.status === 'confidential' && session.role !== 'admin') {
        alert('Access Denied: This submission is confidential. Admin access required.');
        // Hint: But what if you could become admin? 🤔
        return;
    }
    
    displaySubmission(submission, session);
}

// Display submission
function displaySubmission(submission, session) {
    const resultDiv = document.getElementById('result');
    
    let content = `Submission ID: ${submission.id}\nTitle: ${submission.title}\nResearcher: ${submission.researcher}\nStatus: ${submission.status}\nSeverity: ${submission.severity}\nTimestamp: ${submission.timestamp}\nBounty: ${submission.bounty}\n-------------------\n`;
    
    if (submission.encrypted_poc) {
        content += `\nProof of Concept (Encrypted):\n${submission.encrypted_poc}\n`;
        
        if (session.role === 'admin') {
            content += `\nDecryption Key: ${session.token}\n`;
            const flag = window.__decrypt__ ? window.__decrypt__(submission.encrypted_poc, session.token) : '[DECRYPTION FUNCTION NOT FOUND]';
            content += `\nDecrypted Flag: ${flag}\n`;
        } else {
            content += `\nAccess Denied: Admin privileges required.\n`;
        }
    } else if (submission.poc) {
        content += `\nProof of Concept:\n${submission.poc}\n`;
    }
    
    resultDiv.textContent = content;
}

// ============= INSANE 10-LAYER ENCRYPTION SYSTEM =============

// ANTI-CHEAT: Detect copy-paste
(function() {
    let pasteCount = 0;
    document.addEventListener('paste', function() {
        pasteCount++;
        if (pasteCount > 5) {
            console.log('🚨 COPY-PASTE DETECTED! Cheating suspected.');
            console.log('Hint: You need to TYPE and UNDERSTAND the code, not copy it!');
        }
    });
})();

// ANTI-CHEAT: Detect automation
window._lastCallTime = 0;
function _checkAutomation() {
    const now = Date.now();
    if (now - window._lastCallTime < 100) {
        console.log('🚨 AUTOMATION DETECTED! Slow down!');
        return false;
    }
    window._lastCallTime = now;
    return true;
}

// 10-LAYER DECRYPTION - INSANE DIFFICULTY!
window.__decrypt__ = (function() {
    let attempts = 0;
    const maxAttempts = 10;
    
    return function(encrypted, adminToken) {
        // Anti-automation check
        if (!_checkAutomation()) {
            return '[AUTOMATION_BLOCKED]';
        }
        
        // Attempt limit
        attempts++;
        if (attempts > maxAttempts) {
            console.log('🚨 TOO MANY DECRYPTION ATTEMPTS!');
            console.log('System locked. Refresh page to try again.');
            return '[MAX_ATTEMPTS_EXCEEDED]';
        }
        
        // Validate admin token
        if (adminToken !== 'admin_session_token_2024') {
            console.log(`❌ Invalid key! Attempts: ${attempts}/${maxAttempts}`);
            return '[INVALID_KEY]';
        }
        
        // Check if system is locked
        if (window._locked) {
            return '[SYSTEM_LOCKED]';
        }
        
        try {
            // Layer 1: Base64 decode
            let data = atob(encrypted);
            
            // Layer 2: Hex decode
            data = data.match(/.{1,2}/g).map(h => parseInt(h, 16)).map(n => String.fromCharCode(n)).join('');
            
            // Layer 3: XOR with 3484
            data = data.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ (3484 % 256))).join('');
            
            // Layer 4: ROT47
            data = data.split('').map(c => {
                const code = c.charCodeAt(0);
                if (code >= 33 && code <= 126) {
                    return String.fromCharCode(33 + ((code + 14 - 33) % 94));
                }
                return c;
            }).join('');
            
            // Layer 5: Reverse
            data = data.split('').reverse().join('');
            
            // Layer 6: XOR with admin token hash
            const tokenHash = adminToken.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 256;
            data = data.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ tokenHash)).join('');
            
            // Layer 7: Caesar cipher -7
            data = data.split('').map(c => {
                const code = c.charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(((code - 65 - 7 + 26) % 26) + 65);
                }
                if (code >= 97 && code <= 122) {
                    return String.fromCharCode(((code - 97 - 7 + 26) % 26) + 97);
                }
                return c;
            }).join('');
            
            // Layer 8: Base64 decode again
            data = atob(data);
            
            // Layer 9: Custom substitution cipher (reverse)
            const subMap = {'@': 'A', '#': 'R', '$': 'Y', '%': 'Z', '^': 'X', '&': 'P', '*': 'L', '(': 'O', ')': 'I', '!': 'T'};
            data = data.split('').map(c => subMap[c] || c).join('');
            
            // Layer 10: Final XOR with timestamp hash (8471337)
            const tsHash = 8471337 % 256;
            data = data.split('').map(c => String.fromCharCode(c.charCodeAt(0) ^ tsHash)).join('');
            
            console.log('✅ DECRYPTION SUCCESSFUL!');
            return data;
            
        } catch(e) {
            console.log(`❌ Decryption failed! Attempts: ${attempts}/${maxAttempts}`);
            console.log('Error:', e.message);
            return '[DECRYPTION_FAILED]';
        }
    };
})();

// Time-based challenge - only works at certain times
window.__timeChallenge__ = (function() {
    const _checkTime = () => {
        const now = new Date();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        // Easter egg: works every minute when seconds are between 13-37
        if (seconds >= 13 && seconds <= 37) {
            return true;
        }
        return false;
    };
    
    return function() {
        if (_checkTime()) {
            console.log('⏰ Time window active! You have ' + (37 - new Date().getSeconds()) + ' seconds!');
            return true;
        } else {
            console.log('⏰ Time window closed. Try again when seconds are between :13 and :37');
            return false;
        }
    };
})();

// Complex logic puzzle - Fibonacci + Prime checker
window.__mathChallenge__ = (function() {
    const _fib = (n) => {
        if (n <= 1) return n;
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
            [a, b] = [b, a + b];
        }
        return b;
    };
    
    const _isPrime = (n) => {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
    };
    
    return function(input) {
        // Find the 13th Fibonacci number that is also prime
        // Answer: 233 (13th Fibonacci that's prime)
        const answer = 233;
        
        if (input === answer) {
            console.log('✅ Math challenge solved!');
            console.log('Hint: The admin password encoding uses double base64');
            return true;
        } else {
            console.log('❌ Wrong answer. Find the 13th Fibonacci number that is prime.');
            return false;
        }
    };
})();

// Steganography - Hidden message in ASCII art
window.__stegChallenge__ = (function() {
    const _art = `
    █████╗ ██████╗ ██╗   ██╗███████╗███████╗
   ██╔══██╗██╔══██╗╚██╗ ██╔╝╚══███╔╝╚══███╔╝
   ███████║██████╔╝ ╚████╔╝   ███╔╝   ███╔╝ 
   ██╔══██║██╔══██╗  ╚██╔╝   ███╔╝   ███╔╝  
   ██║  ██║██║  ██║   ██║   ███████╗███████╗
   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚══════╝
   
   Hidden: 3484 = 0x847 + 1337
   `;
    
    return function() {
        console.log(_art);
        console.log('Hint: The number 3484 is important for decryption');
        return 3484;
    };
})();

// Vulnerability #9: Debug function exposed in console
function debugMode() {
    console.log('=== DEBUG MODE ===');
    console.log('Current Session:', currentSession);
    console.log('All Users:', JSON.parse(localStorage.getItem('ctf_users')));
    console.log('All Submissions:', JSON.parse(localStorage.getItem('ctf_submissions')));
    console.log('==================');
}

// Vulnerability #10: Admin panel hidden but accessible
function adminPanel() {
    const session = JSON.parse(localStorage.getItem('ctf_session') || '{}');
    if (session.role === 'admin') {
        console.log('🎉 ADMIN PANEL ACCESS GRANTED');
        console.log('Available commands:');
        console.log('- viewAllSubmissions()');
        console.log('- decryptFlag(encrypted, key)');
        console.log('- elevatePrivileges(username)');
    } else {
        console.log('❌ Access Denied: Admin only');
    }
}

function viewAllSubmissions() {
    const session = JSON.parse(localStorage.getItem('ctf_session') || '{}');
    if (session.role === 'admin') {
        return JSON.parse(localStorage.getItem('ctf_submissions'));
    }
    return 'Access Denied';
}

// DELETED: elevatePrivileges - TOO EASY!
// You must find another way... 😈

// Fake privilege escalation (TRAP!)
function elevatePrivileges(username) {
    console.log('❌ This function has been disabled.');
    console.log('Error: PRIVILEGE_ESCALATION_BLOCKED');
    console.log('Hint: There is no shortcut. Find the REAL admin password.');
    
    // Self-destruct mechanism
    window._failCount = (window._failCount || 0) + 1;
    if (window._failCount >= 3) {
        console.log('🚨 TOO MANY FAILED ATTEMPTS!');
        console.log('System locked for 60 seconds...');
        window._locked = true;
        setTimeout(() => {
            window._locked = false;
            window._failCount = 0;
            console.log('System unlocked. Try again.');
        }, 60000);
    }
    return false;
}

// Fake admin functions (MORE TRAPS!)
function becomeAdmin() {
    console.log('❌ Nice try! This is a decoy.');
    return false;
}

function grantAdminAccess() {
    console.log('❌ Function not found.');
    return false;
}

function unlockAdmin() {
    console.log('❌ Access denied.');
    return false;
}

// Hidden initialization function - must be discovered
window.__init__ = (function() {
    let _initialized = false;
    
    return function() {
        if (_initialized) {
            console.log('Already initialized.');
            return;
        }
        
        _initialized = true;
        console.clear();
        console.log('%c=== SYSTEM INITIALIZED ===', 'color: #000; font-weight: bold; font-size: 14px;');
        console.log('');
        console.log('Available functions:');
        console.log('  window.__decrypt__(encrypted, key)');
        console.log('  window.__timeChallenge__()');
        console.log('  window.__mathChallenge__(answer)');
        console.log('  window.__stegChallenge__()');
        console.log('');
        console.log('Hints:');
        console.log('  H1: Check HTML comments');
        console.log('  H2: Decode Base64 strings');
        console.log('  H3: Timestamp contains a secret');
        console.log('  H4: Admin password is double encoded');
        console.log('  H5: XOR key is 3484');
        console.log('');
        console.log('Challenge: Get admin access → View FLAGPROJECT-ARZ2024 → Decrypt flag');
        console.log('');
        console.log('%cGood luck.', 'color: #666; font-style: italic;');
    };
})();

// ============= ANTI-AI CHALLENGES =============

// Interactive click challenge - must click in specific pattern
window.__secretClick__ = (function() {
    let clicks = 0;
    let pattern = [];
    const requiredPattern = [3, 1, 4, 1, 5, 9]; // Pi digits
    
    return function() {
        const now = Date.now();
        clicks++;
        pattern.push(clicks % 10);
        
        if (pattern.length > requiredPattern.length) {
            pattern.shift();
        }
        
        if (JSON.stringify(pattern) === JSON.stringify(requiredPattern)) {
            console.log('🎯 Secret pattern unlocked!');
            console.log('Hint: researcher password is encoded with char codes + index');
            console.log('Formula: Array.from(password).map((c,i) => c.charCodeAt(0) + i).join("-")');
            pattern = [];
            return true;
        }
        
        console.log('Click count: ' + clicks);
        return false;
    };
})();

// Visual canvas puzzle - must draw specific pattern
window.__canvasPuzzle__ = (function() {
    let solved = false;
    
    const initCanvas = () => {
        const canvas = document.getElementById('puzzle');
        if (!canvas) return;
        
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        
        // Draw encrypted message in visual form
        ctx.fillStyle = '#000';
        ctx.font = '12px Courier New';
        
        // Hidden message: "DOUBLE_ATOB" in binary-like pattern
        const msg = '01000100 01001111 01010101 01000010 01001100 01000101';
        ctx.fillText(msg, 10, 30);
        ctx.fillText('Decode this binary to ASCII', 10, 60);
        
        // Add click handler for verification
        canvas.onclick = function(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Secret area: bottom right corner
            if (x > 300 && y > 70) {
                if (!solved) {
                    solved = true;
                    console.log('✅ Canvas puzzle solved!');
                    console.log('Hint: Binary message says "DOUBLE" - admin password is double encoded');
                }
            }
        };
    };
    
    return {
        show: initCanvas,
        isSolved: () => solved
    };
})();

// Dynamic code mutation - changes every minute
window.__dynamicKey__ = (function() {
    const getKey = () => {
        const now = new Date();
        const seed = now.getFullYear() + now.getMonth() + now.getDate();
        // But actually always returns same key - this is a red herring!
        return 'admin_session_token_2024';
    };
    
    return getKey;
})();

// Fake decryption functions (RED HERRINGS)
window.decryptFlag = function(data) {
    console.log('❌ Wrong function! This is a decoy.');
    console.log('Hint: Look for functions starting with __');
    return '[DECOY FUNCTION]';
};

window.getFlag = function() {
    console.log('❌ Nice try! But the flag is not here.');
    return 'FAKE{this_is_not_the_real_flag}';
};

window.adminAccess = function() {
    console.log('❌ This function does nothing.');
    return false;
};

// Fake hints (MORE RED HERRINGS)
window.hint1 = 'The flag is in the database'; // True but misleading
window.hint2 = 'Use SQL injection'; // False - no SQL here
window.hint3 = 'Check network requests'; // False - all client-side
window.hint4 = 'The password is in the cookies'; // False
window.hint5 = 'Brute force the encryption'; // False - impossible

// Real hint hidden in fake function
window.__fakeFunction__ = function() {
    // This looks fake but actually contains real hint
    const realHint = atob('VGhlIHJlYWwgZGVjcnlwdGlvbiBmdW5jdGlvbiBpcyB3aW5kb3cuX19kZWNyeXB0X18=');
    console.log('This function is deprecated.');
    // Hidden: realHint = "The real decryption function is window.__decrypt__"
};

// Sequence challenge - must call functions in order
window.__sequence__ = (function() {
    let step = 0;
    const steps = ['__init__', '__mathChallenge__', '__stegChallenge__', '__timeChallenge__'];
    
    return {
        check: function(funcName) {
            if (funcName === steps[step]) {
                step++;
                if (step === steps.length) {
                    console.log('🎉 Sequence complete!');
                    console.log('Bonus hint: elevatePrivileges() still works');
                    step = 0;
                    return true;
                }
                console.log(`Step ${step}/${steps.length} complete`);
            } else {
                console.log('Wrong sequence. Start over.');
                step = 0;
            }
            return false;
        },
        reset: function() {
            step = 0;
        }
    };
})();

// Konami code easter egg
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                console.log('🎮 KONAMI CODE ACTIVATED!');
                console.log('Easter egg: All challenges are optional. Just get admin access!');
                window.__canvasPuzzle__.show();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
})();

// Mouse movement tracker (paranoia feature)
(function() {
    let moveCount = 0;
    document.addEventListener('mousemove', function() {
        moveCount++;
        if (moveCount === 1337) {
            console.log('🖱️ You moved your mouse 1337 times!');
            console.log('Hint: The number 1337 appears in the timestamp');
        }
    });
})();

// Minimal console output
console.log('Submission Portal v1.0.0');
console.log('Type window.__init__() to begin');
console.log('');
// Hidden hint in plain sight
console.log('%c ', 'font-size: 1px; color: white;' + 'SGludDogQ2hlY2sgd2luZG93IG9iamVjdCBmb3IgX18gZnVuY3Rpb25z');

// Initialize on page load
window.onload = function() {
    initStorage();
    
    // Add random noise to confuse automated tools
    setTimeout(() => {
        window._noise1 = 'ARYZZXPLOIT{fake_flag_1}';
        window._noise2 = 'ARYZZXPLOIT{fake_flag_2}';
        window._noise3 = 'ARYZZXPLOIT{fake_flag_3}';
    }, 100);
};
