const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const PUBLIC_DIR = path.join(__dirname);

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

function generateGroupCode() {
    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const digits = "23456789";
    let lPart = "";
    for (let i = 0; i < 3; i++) lPart += letters[Math.floor(Math.random() * letters.length)];
    let dPart = "";
    for (let i = 0; i < 3; i++) dPart += digits[Math.floor(Math.random() * digits.length)];
    return `${lPart}-${dPart}`;
}

function normKey(c) {
    return (c || '').toString().replace(/[^A-Z0-9]/gi, '').toUpperCase().trim();
}

let serverState = {
    incidents: [],
    broadcasts: [
        "Wave heights exceeding 3.5m expected near Apollo Bunder after 18:00.",
        "Police safety booths operational 24/7 along Colaba Heritage Corridor.",
        "Emergency Helpline 112 linked with GPS telemetry."
    ],
    lostReports: [],
    groups: {}, // Keyed by normKey(code) e.g. "RGK742"
    groupChat: []
};

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                resolve({});
            }
        });
        req.on('error', reject);
    });
}

function sendJson(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    const urlParts = req.url.split('?');
    const parsedUrl = urlParts[0];
    const queryParams = new URLSearchParams(urlParts[1] || '');

    // 1. Incidents API
    if (parsedUrl === '/api/incidents') {
        if (req.method === 'GET') {
            return sendJson(res, 200, serverState.incidents);
        }
        if (req.method === 'POST') {
            const newInc = await parseBody(req);
            if (newInc && newInc.id) {
                serverState.incidents = [newInc, ...serverState.incidents.filter(i => i.id !== newInc.id)];
                console.log(`[API] 🚨 Real-Time SOS Received: ${newInc.id} (${newInc.category}) - ${newInc.name}`);
            }
            return sendJson(res, 201, { success: true, incidents: serverState.incidents });
        }
    }

    if (parsedUrl === '/api/incidents/status' && req.method === 'POST') {
        const { id, status } = await parseBody(req);
        if (id) {
            serverState.incidents = serverState.incidents.map(inc => {
                if (inc.id === id) {
                    let nextStatus = status || 'Resolved';
                    return { ...inc, status: nextStatus };
                }
                return inc;
            });
            console.log(`[API] Incident ${id} status updated to: ${status}`);
        }
        return sendJson(res, 200, { success: true, incidents: serverState.incidents });
    }

    // 2. Broadcasts API
    if (parsedUrl === '/api/broadcasts') {
        if (req.method === 'GET') {
            return sendJson(res, 200, serverState.broadcasts);
        }
        if (req.method === 'POST') {
            const { text } = await parseBody(req);
            if (text) {
                serverState.broadcasts = [text, ...serverState.broadcasts.slice(0, 9)];
                console.log(`[API] New Broadcast Alert pushed: ${text}`);
            }
            return sendJson(res, 201, { success: true, broadcasts: serverState.broadcasts });
        }
    }

    // 3. Lost Property Reports API
    if (parsedUrl === '/api/lost') {
        if (req.method === 'GET') {
            return sendJson(res, 200, serverState.lostReports);
        }
        if (req.method === 'POST') {
            const newReport = await parseBody(req);
            if (newReport && newReport.id) {
                serverState.lostReports = [newReport, ...serverState.lostReports.filter(r => r.id !== newReport.id)];
                console.log(`[API] 🔍 New Lost Property Claim: ${newReport.id} (${newReport.category})`);
            }
            return sendJson(res, 201, { success: true, lostReports: serverState.lostReports });
        }
    }

    // 3b. Translation API
    if (parsedUrl === '/api/translate') {
        const text = queryParams.get('q') || '';
        const sl = queryParams.get('sl') || 'auto';
        const tl = queryParams.get('tl') || 'en';
        if (!text) return sendJson(res, 200, { translation: '', phonetic: '' });
        try {
            const gtxUrl = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + encodeURIComponent(sl) + '&tl=' + encodeURIComponent(tl) + '&dt=t&dt=rm&q=' + encodeURIComponent(text);
            const gRes = await fetch(gtxUrl);
            if (gRes.ok) {
                const data = await gRes.json();
                if (Array.isArray(data) && Array.isArray(data[0])) {
                    const trans = data[0].filter(x => x && x[0]).map(x => x[0]).join('');
                    const romObj = data[0].find(x => x && !x[0] && (x[2] || x[3]));
                    const phonetic = romObj ? (romObj[2] || romObj[3] || '') : '';
                    return sendJson(res, 200, { translation: trans.trim(), phonetic: phonetic.trim() });
                }
            }
        } catch (e) {
            console.error('Translation proxy error:', e);
        }
        return sendJson(res, 200, { translation: '', phonetic: '', error: 'proxy_failed' });
    }

    if (parsedUrl === '/api/lost/status' && req.method === 'POST') {
        const { id, status, officerNotes } = await parseBody(req);
        if (id) {
            serverState.lostReports = serverState.lostReports.map(rep => {
                if (rep.id === id) {
                    return { 
                        ...rep, 
                        status: status || 'Resolved & Returned',
                        officerNotes: officerNotes || rep.officerNotes || 'Updated by Tourism Police Desk'
                    };
                }
                return rep;
            });
            console.log(`[API] Lost Claim ${id} updated to: ${status}`);
        }
        return sendJson(res, 200, { success: true, lostReports: serverState.lostReports });
    }

    // 4. Robust Group Management API (Normalized Key Routing)
    if (parsedUrl === '/api/group/create' && req.method === 'POST') {
        const body = await parseBody(req);
        let rawCode = body.groupCode || generateGroupCode();
        let key = normKey(rawCode);
        
        const creatorName = (typeof body.creator === 'string' ? body.creator : (body.creator && body.creator.name)) || "Group Leader";
        const creatorId = (body.creator && body.creator.id) || `M-${Math.floor(100 + Math.random() * 900)}`;

        const newGroup = {
            code: rawCode,
            key: key,
            name: body.groupName || "South Mumbai Tour Group",
            createdAt: new Date().toISOString(),
            members: [
                {
                    id: creatorId,
                    name: creatorName,
                    distanceMeters: 0,
                    role: "Group Leader (Host)",
                    status: "Safe & Active",
                    latLong: (body.creator && body.creator.latLong) || "18.9242° N, 72.8310° E",
                    battery: "100%",
                    lastPing: "Just now"
                }
            ],
            chat: [
                { sender: "System", text: `Group "${body.groupName || 'Tour Group'}" created! Share code: ${rawCode} with friends to join.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
            ]
        };

        serverState.groups[key] = newGroup;
        console.log(`[API] 👥 Group Created: ${rawCode} (Key: ${key}) by ${creatorName}`);
        return sendJson(res, 201, { success: true, groupCode: rawCode, group: newGroup });
    }

    if (parsedUrl === '/api/group/join' && req.method === 'POST') {
        const body = await parseBody(req);
        const rawCode = (body.groupCode || '').trim();
        const key = normKey(rawCode);

        let group = serverState.groups[key];

        if (!group) {
            // Find existing group by partial or normalized key
            const foundKey = Object.keys(serverState.groups).find(k => k === key || k.includes(key) || key.includes(k));
            if (foundKey) {
                group = serverState.groups[foundKey];
            } else {
                // Auto-create room for code if joining before creator arrives
                group = {
                    code: rawCode.includes('-') ? rawCode : `${rawCode.slice(0,3)}-${rawCode.slice(3)}`,
                    key: key,
                    name: `Room ${rawCode}`,
                    createdAt: new Date().toISOString(),
                    members: [],
                    chat: [
                        { sender: "System", text: `Room ${rawCode} active.`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
                    ]
                };
                serverState.groups[key] = group;
            }
        }

        const memObj = body.member || {};
        const memName = (typeof body.member === 'string' ? body.member : memObj.name) || "Tourist Friend";
        const memId = memObj.id || `M-${Math.floor(100 + Math.random() * 900)}`;

        const existingIdx = group.members.findIndex(m => m.id === memId || (m.name && memName && m.name.toLowerCase() === memName.toLowerCase()));

        const memberData = {
            id: memId,
            name: memName,
            distanceMeters: memObj.distanceMeters !== undefined ? memObj.distanceMeters : Math.floor(10 + Math.random() * 30),
            role: group.members.length === 0 ? "Group Leader" : "Group Member",
            status: "Safe & Active",
            latLong: memObj.latLong || "18.9242° N, 72.8310° E",
            battery: memObj.battery || "95%",
            lastPing: "Just now"
        };

        if (existingIdx >= 0) {
            group.members[existingIdx] = { ...group.members[existingIdx], ...memberData };
        } else {
            group.members.push(memberData);
            group.chat.push({
                sender: "System",
                text: `👋 ${memName} joined the group!`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        }

        console.log(`[API] 👥 Member ${memName} joined Group ${group.code}. Members count: ${group.members.length}`);
        return sendJson(res, 200, { success: true, groupCode: group.code, group: group });
    }

    if (parsedUrl === '/api/group/leave' && req.method === 'POST') {
        const body = await parseBody(req);
        const rawCode = (body.groupCode || '').trim();
        const key = normKey(rawCode);
        const memId = body.memberId;
        const memName = body.memberName || 'A member';

        let group = serverState.groups[key];
        if (!group) {
            const foundKey = Object.keys(serverState.groups).find(k => k === key || k.includes(key) || key.includes(k));
            if (foundKey) group = serverState.groups[foundKey];
        }

        if (group && Array.isArray(group.members)) {
            group.members = group.members.filter(m => {
                if (memId && m.id === memId) return false;
                if (memName && m.name && m.name.toLowerCase() === memName.toLowerCase()) return false;
                return true;
            });
            group.chat.push({
                sender: "System",
                text: `👋 ${memName} left the group.`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            console.log(`[API] 👥 Member ${memName} (${memId}) left Group ${group.code}. Remaining: ${group.members.length}`);
            return sendJson(res, 200, { success: true, remainingMembers: group.members.length });
        }
        return sendJson(res, 200, { success: true, message: "Group or member not found" });
    }

    if (parsedUrl === '/api/group/status' && req.method === 'POST') {
        const body = await parseBody(req);
        const rawCode = (body.groupCode || '').trim();
        const key = normKey(rawCode);
        const memName = body.memberName;
        const newStatus = body.status || 'Safe & Active';
        const isSos = body.isSos || false;

        let group = serverState.groups[key];
        if (!group) {
            const foundKey = Object.keys(serverState.groups).find(k => k === key || k.includes(key) || key.includes(k));
            if (foundKey) group = serverState.groups[foundKey];
        }

        if (group && Array.isArray(group.members)) {
            group.members = group.members.map(m => {
                if (memName && m.name && m.name.toLowerCase() === memName.toLowerCase()) {
                    return { ...m, status: newStatus, isSos: isSos };
                }
                return m;
            });
            return sendJson(res, 200, { success: true, group: group });
        }
        return sendJson(res, 200, { success: false, message: 'Group not found' });
    }

    if (parsedUrl === '/api/group/room') {
        const rawCode = queryParams.get('code') || '';
        const key = normKey(rawCode);
        let group = serverState.groups[key];
        if (!group) {
            const foundKey = Object.keys(serverState.groups).find(k => k === key || k.includes(key) || key.includes(k));
            if (foundKey) group = serverState.groups[foundKey];
        }
        if (group) {
            return sendJson(res, 200, { success: true, group: group });
        }
        return sendJson(res, 200, { success: false, group: null });
    }

    if (parsedUrl === '/api/group/chat') {
        const rawCode = queryParams.get('code') || '';
        const key = normKey(rawCode);
        if (req.method === 'GET') {
            if (key && serverState.groups[key]) {
                return sendJson(res, 200, serverState.groups[key].chat);
            }
            return sendJson(res, 200, serverState.groupChat);
        }
        if (req.method === 'POST') {
            const newMsg = await parseBody(req);
            const msgKey = normKey(newMsg.groupCode || rawCode);
            if (msgKey && serverState.groups[msgKey]) {
                serverState.groups[msgKey].chat.push({
                    sender: newMsg.sender || "Anonymous",
                    text: newMsg.text || "",
                    time: newMsg.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
            } else {
                serverState.groupChat.push(newMsg);
            }
            return sendJson(res, 201, { success: true, msg: newMsg });
        }
    }

    // Reverse Geocoding Proxy API
    if (parsedUrl === '/api/reverse-geocode') {
        const lat = queryParams.get('lat') || '18.9242';
        const lng = queryParams.get('lng') || '72.8310';
        const https = require('https');
        const options = {
            hostname: 'nominatim.openstreetmap.org',
            path: `/reverse?format=json&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lng)}&zoom=16&addressdetails=1`,
            headers: { 'User-Agent': 'SAFORA-Emergency-App/3.0 (contact@safora.gov.in)' }
        };
        const gReq = https.get(options, (gRes) => {
            let data = '';
            gRes.on('data', chunk => data += chunk);
            gRes.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    const addr = parsed.address || {};
                    const locParts = [
                        addr.neighbourhood || addr.suburb || addr.residential || addr.road || addr.quarter,
                        addr.city || addr.town || addr.district || addr.county,
                        addr.state
                    ].filter(Boolean);
                    const displayName = locParts.length > 0 
                        ? locParts.join(', ') 
                        : (parsed.display_name ? parsed.display_name.split(',').slice(0, 3).join(',') : `${Number(lat).toFixed(4)}° N, ${Number(lng).toFixed(4)}° E`);
                    return sendJson(res, 200, { success: true, displayName, address: addr, full: parsed });
                } catch (e) {
                    return sendJson(res, 200, { success: false, displayName: `${Number(lat).toFixed(4)}° N, ${Number(lng).toFixed(4)}° E` });
                }
            });
        });
        gReq.on('error', (err) => {
            return sendJson(res, 200, { success: false, displayName: `${Number(lat).toFixed(4)}° N, ${Number(lng).toFixed(4)}° E` });
        });
        return;
    }

    // Static File Serving
    let filePath = path.join(PUBLIC_DIR, parsedUrl === '/' ? 'index.html' : parsedUrl);
    if (parsedUrl === '/tourist') {
        filePath = path.join(PUBLIC_DIR, 'tourist.html');
    } else if (parsedUrl === '/authority') {
        filePath = path.join(PUBLIC_DIR, 'authority.html');
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`==================================================`);
    console.log(` SAFORA Server Active on Port ${PORT}`);
    console.log(` Tourist URL:   http://localhost:${PORT}/`);
    console.log(` Authority URL: http://localhost:${PORT}/authority`);
    console.log(`==================================================`);
});
