// SAFORA — Authority Command Console (Professional UI, Pure JS)
(function () {
  function mount() {
    var R = window.React;
    var RD = window.ReactDOM;
    if (!R || !RD) { setTimeout(mount, 50); return; }
    var el = document.getElementById('root');
    if (!el) { setTimeout(mount, 50); return; }

    var useState   = R.useState;
    var useEffect  = R.useEffect;
    var useMemo    = R.useMemo;
    var e          = R.createElement;

    /* ─── colour helpers ──────────────────────────────────────────── */
    function statusBadge(s) {
      var map = {
        'Pending':            { bg:'#78350f', text:'#fbbf24', border:'#b45309' },
        'Dispatched':         { bg:'#1e3a5f', text:'#60a5fa', border:'#2563eb' },
        'Unit Dispatched':    { bg:'#1e3a5f', text:'#60a5fa', border:'#2563eb' },
        'Resolved':           { bg:'#064e3b', text:'#34d399', border:'#059669' },
        'Under Investigation':{ bg:'#2e1065', text:'#c4b5fd', border:'#7c3aed' },
        'Item Located':       { bg:'#064e3b', text:'#6ee7b7', border:'#10b981' },
        'Resolved & Returned':{ bg:'#064e3b', text:'#34d399', border:'#059669' }
      };
      return map[s] || { bg:'#1e293b', text:'#94a3b8', border:'#334155' };
    }
    function severityDot(s) {
      return s === 'Critical' ? '#ef4444' : s === 'High' ? '#f97316' : s === 'Medium' ? '#eab308' : '#22c55e';
    }
    function nextStatus(s) {
      var m = { 'Pending':'Dispatched','Dispatched':'Resolved','Unit Dispatched':'Resolved','Resolved':'Pending' };
      return m[s] || 'Dispatched';
    }
    function nextLostStatus(s) {
      var m = { 'Report Logged':'Under Investigation','Under Investigation':'Item Located','Item Located':'Resolved & Returned','Resolved & Returned':'Under Investigation' };
      return m[s] || 'Under Investigation';
    }

    /* ─── default seed data ───────────────────────────────────────── */
    var DEF_INC = [];
    var DEF_LOST = [];
    var DEF_BC = [
      '🌊 HIGH TIDE WARNING: Wave heights exceeding 3.5m near Apollo Bunder after 18:00.',
      '🚔 POLICE ADVISORY: Tourist booths operational 24/7 along Colaba Heritage Corridor.'
    ];

    /* ─── shared styles ───────────────────────────────────────────── */
    var card = { background:'rgba(15,23,42,0.9)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'20px 22px', marginBottom:14 };
    var labelSt = { fontSize:12, color:'#64748b', fontWeight:700, textTransform:'uppercase', letterSpacing:1, marginBottom:4 };
    var valueSt = { fontSize:16, color:'#e2e8f0', fontWeight:600, lineHeight:1.4 };
    var btnPrimary = { background:'linear-gradient(135deg,#0f766e,#0369a1)', color:'#fff', border:'none', padding:'10px 22px', borderRadius:10, fontWeight:700, cursor:'pointer', fontSize:14, letterSpacing:0.3 };
    var btnSecondary = { background:'rgba(30,41,59,0.8)', color:'#cbd5e1', border:'1px solid #334155', padding:'8px 18px', borderRadius:10, fontWeight:600, cursor:'pointer', fontSize:13 };

    /* ─── Badge ───────────────────────────────────────────────────── */
    function Badge(props) {
      var c = statusBadge(props.label);
      return e('span', { style:{ fontSize:13, fontWeight:700, color:c.text, background:c.bg, border:'1px solid '+c.border, padding:'4px 14px', borderRadius:20, whiteSpace:'nowrap' } }, props.label);
    }

    /* ─── Field row ───────────────────────────────────────────────── */
    function Field(props) {
      return e('div', { style:{ marginBottom:12 } },
        e('div', { style:labelSt }, props.label),
        e('div', { style:valueSt }, props.children)
      );
    }

    /* ─── Location Formatter ─────────────────────────────────────── */
    function formatLocation(i) {
      if (i.locationName && i.locationName.trim() && i.locationName !== 'N/A') {
        return i.locationName;
      }
      if (i.landmark && i.landmark.trim() && i.landmark !== 'N/A') {
        return i.landmark;
      }
      if (i.coordinates && typeof i.coordinates === 'object') {
        var lat = Number(i.coordinates.lat);
        var lng = Number(i.coordinates.lng);
        if (!isNaN(lat) && !isNaN(lng)) {
          if (Math.abs(lat - 18.9242) < 0.006 && Math.abs(lng - 72.8310) < 0.006) {
            return "Gateway of India Promenade, Apollo Bunder, Colaba (GPS: " + lat.toFixed(4) + "° N, " + lng.toFixed(4) + "° E)";
          }
          return "Live Device GPS Position (" + lat.toFixed(4) + "° N, " + lng.toFixed(4) + "° E)";
        }
      }
      return i.location || "Gateway Heritage Promenade, Colaba, Mumbai";
    }

    /* ─── Incident Card ───────────────────────────────────────────── */
    function IncCard(props) {
      var i = props.inc;
      var locText = formatLocation(i);
      var hasCoords = i.coordinates && (i.coordinates.lat || typeof i.coordinates === 'string');
      var mapLat = (i.coordinates && i.coordinates.lat) ? i.coordinates.lat : 18.9242;
      var mapLng = (i.coordinates && i.coordinates.lng) ? i.coordinates.lng : 72.8310;

      return e('div', { style:card },
        e('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12, marginBottom:14 } },
          e('div', { style:{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap' } },
            e('span', { style:{ width:10, height:10, borderRadius:'50%', background:severityDot(i.severity), display:'inline-block', flexShrink:0 } }),
            e('span', { style:{ fontFamily:'monospace', fontSize:13, color:'#38bdf8', fontWeight:700 } }, i.id),
            e('span', { style:{ fontSize:13, color:'#475569' } }, '·  '+i.timestamp),
            e('span', { style:{ fontSize:12, color:severityDot(i.severity), fontWeight:700, background:'rgba(0,0,0,0.3)', padding:'2px 10px', borderRadius:20 } }, i.severity)
          ),
          e(Badge, { label:i.status })
        ),
        e('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'10px 24px', marginBottom:14 } },
          e(Field, { label:'Tourist Name' }, i.name),
          e(Field, { label:'Nationality' }, i.nationality),
          e(Field, { label:'Contact' }, i.contact),
          e(Field, { label:'Blood Group' }, i.bloodGroup),
          e(Field, { label:'Hotel / Stay' }, i.hotel),
          e(Field, { label:'Category' }, i.category),
          e(Field, { label:'📍 Place Name & Location' },
            e('div', { style:{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' } },
              e('span', { style:{ color:'#38bdf8', fontWeight:700 } }, locText),
              e('a', {
                href: 'https://www.google.com/maps?q=' + mapLat + ',' + mapLng,
                target: '_blank',
                rel: 'noreferrer',
                style: { fontSize:11, color:'#38bdf8', background:'rgba(56,189,248,0.12)', border:'1px solid rgba(56,189,248,0.3)', padding:'2px 8px', borderRadius:6, textDecoration:'none', fontWeight:700 }
              }, '🗺️ Open Maps ↗')
            )
          ),
          (i.landmark && i.landmark !== locText) ? e(Field, { label:'Landmark / Reference' }, e('span', { style:{ color:'#f59e0b', fontWeight:600 } }, i.landmark)) : null
        ),
        e('div', { style:{ ...labelSt, marginBottom:6 } }, 'Incident Notes'),
        e('div', { style:{ fontSize:15, color:'#94a3b8', lineHeight:1.6, marginBottom:16, fontStyle:'italic' } }, '\u201c'+i.note+'\u201d'),
        e('div', { style:{ display:'flex', gap:10, flexWrap:'wrap' } },
          e('button', { onClick:function(){ props.onAdvance(i.id); }, style:btnPrimary }, 'Advance Status \u2192'),
          e('button', { onClick:function(){ props.onSelect(i); }, style:btnSecondary }, '\uD83D\uDCCB Case File')
        )
      );
    }

    /* ─── Lost Card ───────────────────────────────────────────────── */
    function LostCard(props) {
      var r = props.report;
      return e('div', { style:card },
        e('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, flexWrap:'wrap', marginBottom:14 } },
          e('div', null,
            e('span', { style:{ fontFamily:'monospace', fontSize:13, color:'#a78bfa', fontWeight:700 } }, r.id),
            e('span', { style:{ fontSize:13, color:'#475569', marginLeft:12 } }, r.timestamp)
          ),
          e(Badge, { label:r.status })
        ),
        e('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'10px 24px', marginBottom:14 } },
          e(Field, { label:'Tourist Name' }, r.touristName),
          e(Field, { label:'Nationality' }, r.nationality),
          e(Field, { label:'Contact' }, r.contact),
          e(Field, { label:'Hotel' }, r.hotel),
          e(Field, { label:'Item Category' }, r.category),
          e(Field, { label:'Assigned Officer' }, r.assignedOfficer)
        ),
        e(Field, { label:'Item Description' }, e('span', { style:{ fontSize:15, color:'#e2e8f0', lineHeight:1.6 } }, r.item)),
        e(Field, { label:'Last Seen Location' }, e('span', { style:{ fontSize:15, color:'#fbbf24', lineHeight:1.6 } }, r.location)),
        e('div', { style:{ marginTop:6 } },
          e('button', { onClick:function(){ props.onAdvance(r.id); }, style:btnPrimary }, 'Advance Status \u2192')
        )
      );
    }

    /* ─── Case File Modal ─────────────────────────────────────────── */
    function CaseModal(props) {
      if (!props.inc) return null;
      var i = props.inc;
      return e('div', { onClick:props.onClose, style:{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:20 } },
        e('div', { onClick:function(ev){ ev.stopPropagation(); }, style:{ background:'#0d1117', border:'1px solid rgba(239,68,68,0.4)', borderRadius:20, padding:'28px 32px', maxWidth:520, width:'100%', maxHeight:'85vh', overflowY:'auto' } },
          e('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 } },
            e('h3', { style:{ fontSize:20, fontWeight:800, color:'#f87171', letterSpacing:0.5 } }, '\uD83D\uDEA8  Case File \u2014 '+i.id),
            e('button', { onClick:props.onClose, style:{ background:'none', border:'none', color:'#475569', fontSize:22, cursor:'pointer', lineHeight:1 } }, '\u2715')
          ),
          [
            ['Case ID', i.id],
            ['Time Logged', i.timestamp],
            ['Tourist Name', i.name],
            ['Nationality', i.nationality],
            ['Contact', i.contact],
            ['Blood Group', i.bloodGroup],
            ['Hotel / Stay', i.hotel],
            ['📍 Place / Location', formatLocation(i)],
            ['Landmark', i.landmark || 'Gateway Heritage Corridor, Colaba'],
            ['Category', i.category],
            ['Severity', i.severity],
            ['Status', i.status],
            ['Notes', i.note]
          ].map(function(p){
            return e('div', { key:p[0], style:{ display:'flex', gap:16, padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,0.04)' } },
              e('div', { style:{ fontSize:12, color:'#64748b', fontWeight:700, textTransform:'uppercase', letterSpacing:1, margin:0, minWidth:130, paddingTop:2 } }, p[0]),
              e('div', { style:{ fontSize:15, color:'#e2e8f0', lineHeight:1.5, flex:1 } }, p[1])
            );
          }),
          e('button', { onClick:props.onClose, style:{ background:'linear-gradient(135deg,#0f766e,#0369a1)', color:'#fff', border:'none', width:'100%', marginTop:20, padding:'12px', textAlign:'center', borderRadius:12, fontWeight:700, cursor:'pointer', fontSize:15 } }, 'Close')
        )
      );
    }

    /* ─── Analytics Card ──────────────────────────────────────────── */
    function StatCard(props) {
      return e('div', { style:{ background:'rgba(15,23,42,0.9)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:16, padding:'24px 20px', textAlign:'center' } },
        e('div', { style:{ fontSize:42, fontWeight:900, color:props.color, fontFamily:'monospace', lineHeight:1 } }, props.value),
        e('div', { style:{ fontSize:14, color:'#64748b', marginTop:8, fontWeight:600, letterSpacing:0.3 } }, props.label)
      );
    }

    /* ─── Main App ────────────────────────────────────────────────── */
    function AuthorityApp() {
      var _i   = useState(DEF_INC);   var incidents    = _i[0];   var setIncidents    = _i[1];
      var _l   = useState(DEF_LOST);  var lostReports  = _l[0];   var setLostReports  = _l[1];
      var _b   = useState(DEF_BC);    var broadcasts   = _b[0];   var setBroadcasts   = _b[1];
      var _f   = useState('All');     var filter       = _f[0];   var setFilter       = _f[1];
      var _tab = useState('sos');     var tab          = _tab[0]; var setTab          = _tab[1];
      var _sel = useState(null);      var selected     = _sel[0]; var setSelected     = _sel[1];
      var _bc  = useState('');        var bcText       = _bc[0];  var setBcText       = _bc[1];

      useEffect(function() {
        function poll() {
          fetch('/api/incidents').then(function(r){ return r.json(); }).then(function(d){ if(Array.isArray(d)&&d.length) setIncidents(d); }).catch(function(){});
          fetch('/api/lost').then(function(r){ return r.json(); }).then(function(d){ if(Array.isArray(d)&&d.length) setLostReports(d); }).catch(function(){});
          fetch('/api/broadcasts').then(function(r){ return r.json(); }).then(function(d){ if(Array.isArray(d)&&d.length) setBroadcasts(d); }).catch(function(){});
        }
        poll();
        var t = setInterval(poll, 1200);
        return function(){ clearInterval(t); };
      }, []);

      var stats = useMemo(function() {
        return {
          total:      incidents.length,
          pending:    incidents.filter(function(i){ return i.status==='Pending'; }).length,
          dispatched: incidents.filter(function(i){ return i.status==='Dispatched'||i.status==='Unit Dispatched'; }).length,
          resolved:   incidents.filter(function(i){ return i.status==='Resolved'; }).length
        };
      }, [incidents]);

      function advInc(id) {
        setIncidents(function(p){ return p.map(function(i){ return i.id===id?Object.assign({},i,{status:nextStatus(i.status)}):i; }); });
        fetch('/api/incidents/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id})}).catch(function(){});
      }
      function advLost(id) {
        setLostReports(function(p){ return p.map(function(r){ return r.id===id?Object.assign({},r,{status:nextLostStatus(r.status)}):r; }); });
        fetch('/api/lost/status',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:id})}).catch(function(){});
      }
      function sendBc(ev) {
        ev.preventDefault();
        if(!bcText.trim()) return;
        var msg='\uD83D\uDEA8 BROADCAST: '+bcText.trim();
        setBroadcasts(function(p){ return [msg].concat(p); });
        setBcText('');
        fetch('/api/broadcasts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:msg})}).catch(function(){});
        alert('\u2705 Broadcast sent to all tourist devices!');
      }

      
      function handleDownloadReport() {
        var dateStr = new Date().toLocaleString();
        
        var container = document.createElement('div');
        container.style.padding = '24px 28px';
        container.style.fontFamily = "'Plus Jakarta Sans', system-ui, sans-serif";
        container.style.color = '#0f172a';
        container.style.background = '#ffffff';
        container.style.width = '750px';
        container.style.boxSizing = 'border-box';

        var incRows = incidents.length === 0 
          ? '<div style="padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;text-align:center;color:#64748b;font-size:12px;">No active emergency SOS incidents recorded in this session.</div>'
          : incidents.map(function(inc, idx) {
              return '<div style="margin-bottom:10px;padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;line-height:1.5;">' +
                '<div style="display:flex;justify-content:space-between;font-weight:800;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin-bottom:6px;">' +
                  '<span>[' + (idx+1) + '] ID: ' + inc.id + ' — ' + (inc.category || 'General Distress') + '</span>' +
                  '<span style="color:#2563eb;">' + (inc.status || 'Pending') + '</span>' +
                '</div>' +
                '<div><strong>Tourist:</strong> ' + (inc.name || 'Anonymous') + ' (' + (inc.nationality || 'N/A') + ') | <strong>Contact:</strong> ' + (inc.contact || 'N/A') + ' | <strong>Blood:</strong> ' + (inc.bloodGroup || 'N/A') + '</div>' +
                '<div><strong>Location:</strong> ' + (inc.hotel || 'Gateway Promenade') + ' | <strong>Time:</strong> ' + (inc.timestamp || 'N/A') + ' | <strong>Severity:</strong> ' + (inc.severity || 'Critical') + '</div>' +
                '<div style="margin-top:4px;color:#475569;font-style:italic;">Note: "' + (inc.note || 'Direct SOS Beacon') + '"</div>' +
              '</div>';
            }).join('');

        var lostRows = lostReports.length === 0
          ? '<div style="padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;text-align:center;color:#64748b;font-size:12px;">No missing property claims filed in this session.</div>'
          : lostReports.map(function(r, idx) {
              return '<div style="margin-bottom:10px;padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;line-height:1.5;">' +
                '<div style="display:flex;justify-content:space-between;font-weight:800;color:#0f172a;border-bottom:1px solid #e2e8f0;padding-bottom:4px;margin-bottom:6px;">' +
                  '<span>[' + (idx+1) + '] CLAIM: ' + r.id + ' — ' + (r.category || 'General Item') + '</span>' +
                  '<span style="color:#059669;">' + (r.status || 'Searching') + '</span>' +
                '</div>' +
                '<div><strong>Item:</strong> ' + (r.item || 'Personal Property') + ' | <strong>Tourist:</strong> ' + (r.touristName || 'Anonymous') + ' | <strong>Contact:</strong> ' + (r.contact || 'N/A') + '</div>' +
                '<div><strong>Last Location:</strong> ' + (r.location || 'Gateway Promenade') + ' | <strong>Time:</strong> ' + (r.timestamp || 'Today') + '</div>' +
              '</div>';
            }).join('');

        var bcRows = broadcasts.length === 0
          ? '<div style="padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;text-align:center;color:#64748b;font-size:12px;">No broadcast alerts recorded.</div>'
          : broadcasts.map(function(b, idx) {
              return '<div style="padding:8px 12px;margin-bottom:6px;background:#fff7ed;border:1px solid #fed7aa;border-radius:6px;font-size:12px;color:#9a3412;">• ' + b + '</div>';
            }).join('');

        container.innerHTML = 
          '<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #0f172a;padding-bottom:12px;margin-bottom:16px;">' +
            '<div>' +
              '<h1 style="margin:0;font-size:22px;font-weight:900;color:#0f172a;letter-spacing:0.5px;">SAFORA COMMAND CONSOLE</h1>' +
              '<p style="margin:4px 0 0 0;font-size:12px;color:#475569;font-weight:600;">Tourism Police & EMS Incident Analytics Report</p>' +
            '</div>' +
            '<div style="text-align:right;font-size:11px;color:#64748b;">' +
              '<div><strong>Generated:</strong> ' + dateStr + '</div>' +
              '<div><strong>District:</strong> South Mumbai Central Ops Desk</div>' +
            '</div>' +
          '</div>' +

          '<div style="margin-bottom:18px;">' +
            '<h2 style="font-size:13px;font-weight:800;text-transform:uppercase;color:#0f172a;margin-bottom:8px;border-bottom:1px solid #e2e8f0;padding-bottom:4px;">1. Operational Metrics Summary</h2>' +
            '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center;">' +
              '<div style="background:#f1f5f9;border:1px solid #cbd5e1;padding:10px;border-radius:8px;"><div style="font-size:18px;font-weight:900;color:#2563eb;">' + stats.total + '</div><div style="font-size:10px;font-weight:700;color:#475569;text-transform:uppercase;">Total Incidents</div></div>' +
              '<div style="background:#fef3c7;border:1px solid #fde68a;padding:10px;border-radius:8px;"><div style="font-size:18px;font-weight:900;color:#d97706;">' + stats.pending + '</div><div style="font-size:10px;font-weight:700;color:#92400e;text-transform:uppercase;">Pending Response</div></div>' +
              '<div style="background:#dcfce7;border:1px solid #bbf7d0;padding:10px;border-radius:8px;"><div style="font-size:18px;font-weight:900;color:#16a34a;">' + stats.resolved + '</div><div style="font-size:10px;font-weight:700;color:#166534;text-transform:uppercase;">Resolved</div></div>' +
              '<div style="background:#e0e7ff;border:1px solid #c7d2fe;padding:10px;border-radius:8px;"><div style="font-size:18px;font-weight:900;color:#4f46e5;">' + stats.dispatched + '</div><div style="font-size:10px;font-weight:700;color:#3730a3;text-transform:uppercase;">Units Dispatched</div></div>' +
              '<div style="background:#f3e8ff;border:1px solid #e9d5ff;padding:10px;border-radius:8px;"><div style="font-size:18px;font-weight:900;color:#9333ea;">' + lostReports.length + '</div><div style="font-size:10px;font-weight:700;color:#6b21a8;text-transform:uppercase;">Lost Claims</div></div>' +
              '<div style="background:#ffedd5;border:1px solid #fed7aa;padding:10px;border-radius:8px;"><div style="font-size:18px;font-weight:900;color:#ea580c;">' + broadcasts.length + '</div><div style="font-size:10px;font-weight:700;color:#9a3412;text-transform:uppercase;">Broadcasts</div></div>' +
            '</div>' +
          '</div>' +

          '<div style="margin-bottom:18px;">' +
            '<h2 style="font-size:13px;font-weight:800;text-transform:uppercase;color:#0f172a;margin-bottom:8px;border-bottom:1px solid #e2e8f0;padding-bottom:4px;">2. SOS Emergency Incidents (' + incidents.length + ')</h2>' +
            incRows +
          '</div>' +

          '<div style="margin-bottom:18px;">' +
            '<h2 style="font-size:13px;font-weight:800;text-transform:uppercase;color:#0f172a;margin-bottom:8px;border-bottom:1px solid #e2e8f0;padding-bottom:4px;">3. Lost & Found Property Claims (' + lostReports.length + ')</h2>' +
            lostRows +
          '</div>' +

          '<div style="margin-bottom:18px;">' +
            '<h2 style="font-size:13px;font-weight:800;text-transform:uppercase;color:#0f172a;margin-bottom:8px;border-bottom:1px solid #e2e8f0;padding-bottom:4px;">4. Network Broadcast Alerts (' + broadcasts.length + ')</h2>' +
            bcRows +
          '</div>' +

          '<div style="border-top:1px solid #cbd5e1;padding-top:12px;display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#64748b;">' +
            '<span>Official Verification Pass: <strong>MUM-OPS-SEC-2025</strong></span>' +
            '<span>Ministry of Tourism · SAFORA Safety Network</span>' +
          '</div>';

        var opt = {
          margin:       [10, 10, 10, 10],
          filename:     'SAFORA_Analytics_Report_' + new Date().toISOString().slice(0,10) + '.pdf',
          image:        { type: 'jpeg', quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        if (window.html2pdf) {
          window.html2pdf().set(opt).from(container).save();
        } else {
          // Fallback if CDN is offline
          var printWin = window.open('', '', 'width=800,height=900');
          printWin.document.write('<html><head><title>Analytics Report</title></head><body style="padding:20px;">' + container.innerHTML + '</body></html>');
          printWin.document.close();
          printWin.focus();
          setTimeout(function(){ printWin.print(); }, 500);
        }
      }

      var filtered = filter==='All' ? incidents : incidents.filter(function(i){ return i.status===filter; });

      var TABS = [
        { id:'sos',       label:'SOS Queue',    count:incidents.length,   color:'#ef4444' },
        { id:'lost',      label:'Lost Reports', count:lostReports.length, color:'#a78bfa' },
        { id:'broadcast', label:'Broadcast',    count:broadcasts.length,  color:'#f97316' },
        { id:'analytics', label:'Analytics',    count:null,               color:'#34d399' }
      ];

      return e('div', { style:{ minHeight:'100vh', display:'flex', flexDirection:'column', background:'#060d1a', color:'#e2e8f0', fontFamily:"'Plus Jakarta Sans',system-ui,sans-serif" } },

        /* HEADER */
        e('header', { style:{ background:'rgba(6,13,26,0.96)', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'16px 28px', position:'sticky', top:0, zIndex:50, backdropFilter:'blur(20px)' } },
          e('div', { style:{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 } },
            e('div', { style:{ display:'flex', alignItems:'center', gap:16 } },
              e('div', { style:{ width:48, height:48, borderRadius:14, background:'linear-gradient(135deg,#b91c1c,#c2410c)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, fontWeight:900, color:'#fff', letterSpacing:0.5, boxShadow:'0 0 20px rgba(185,28,28,0.35)' } }, 'SAF'),
              e('div', null,
                e('div', { style:{ fontSize:20, fontWeight:900, color:'#f1f5f9', letterSpacing:0.5 } }, 'SAFORA Command'),
                e('div', { style:{ fontSize:13, color:'#475569', marginTop:2 } }, 'Police & EMS \u00b7 South Mumbai District Ops Desk')
              )
            ),
            e('div', { style:{ display:'flex', alignItems:'center', gap:14 } },
              e('div', { style:{ display:'flex', alignItems:'center', gap:8, background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.25)', padding:'7px 14px', borderRadius:30 } },
                e('div', { style:{ width:8, height:8, borderRadius:'50%', background:'#10b981', boxShadow:'0 0 8px #10b981', animation:'livePulse 2s infinite' } }),
                e('span', { style:{ fontSize:13, color:'#10b981', fontWeight:700 } }, 'LIVE')
              ),
              e('a', { href:'/', style:{ fontSize:14, color:'#7dd3fc', background:'rgba(14,165,233,0.08)', border:'1px solid rgba(14,165,233,0.25)', padding:'8px 18px', borderRadius:10, fontWeight:700, textDecoration:'none' } }, '\uD83D\uDCF1 Tourist App')
            )
          )
        ),

        /* TAB NAV */
        e('nav', { style:{ background:'rgba(6,13,26,0.8)', borderBottom:'1px solid rgba(255,255,255,0.05)', padding:'0 28px', overflowX:'auto' } },
          e('div', { style:{ maxWidth:1100, margin:'0 auto', display:'flex', gap:0 } },
            TABS.map(function(t2) {
              var active = tab===t2.id;
              return e('button', {
                key:t2.id,
                onClick:function(){ setTab(t2.id); },
                style:{ padding:'16px 22px', fontSize:15, fontWeight:700, background:'none', border:'none', cursor:'pointer', color:active?t2.color:'#475569', borderBottom:active?'3px solid '+t2.color:'3px solid transparent', whiteSpace:'nowrap', display:'flex', alignItems:'center', gap:8, transition:'all 0.15s' }
              },
                t2.label,
                t2.count !== null && e('span', { style:{ fontSize:12, fontWeight:800, color:active?t2.color:'#334155', background:active?t2.color+'22':'rgba(30,41,59,0.8)', padding:'2px 9px', borderRadius:20, minWidth:26, textAlign:'center' } }, t2.count)
              );
            })
          )
        ),

        /* BODY */
        e('main', { style:{ flex:1, maxWidth:1100, width:'100%', margin:'0 auto', padding:'28px 20px' } },

          /* SOS QUEUE */
          tab==='sos' && e('div', null,
            e('div', { style:{ display:'flex', gap:8, marginBottom:22, flexWrap:'wrap' } },
              ['All','Pending','Dispatched','Resolved'].map(function(f) {
                var active = filter===f;
                return e('button', {
                  key:f, onClick:function(){ setFilter(f); },
                  style:{ fontSize:14, padding:'8px 20px', borderRadius:30, border:'1px solid', cursor:'pointer', fontWeight:700, background:active?'#0f172a':'transparent', color:active?'#f1f5f9':'#475569', borderColor:active?'#3b82f6':'#1e293b', boxShadow:active?'0 0 0 2px #3b82f644':'' }
                }, f);
              })
            ),
            filtered.length===0
              ? e('div', { style:{ textAlign:'center', padding:'80px 20px', color:'#334155' } },
                  e('div', { style:{ fontSize:48, marginBottom:12 } }, '\u2705'),
                  e('div', { style:{ fontSize:18, fontWeight:600 } }, 'No active incidents')
                )
              : filtered.map(function(inc) { return e(IncCard, { key:inc.id, inc:inc, onAdvance:advInc, onSelect:setSelected }); })
          ),

          /* LOST REPORTS */
          tab==='lost' && e('div', null,
            lostReports.length===0
              ? e('div', { style:{ textAlign:'center', padding:'80px 20px', color:'#334155' } },
                  e('div', { style:{ fontSize:48, marginBottom:12 } }, '\uD83E\uDDF3'),
                  e('div', { style:{ fontSize:18, fontWeight:600 } }, 'No lost reports filed')
                )
              : lostReports.map(function(r) { return e(LostCard, { key:r.id, report:r, onAdvance:advLost }); })
          ),

          /* BROADCAST */
          tab==='broadcast' && e('div', null,
            e('div', { style:{ ...card, borderColor:'rgba(249,115,22,0.3)', marginBottom:28 } },
              e('h3', { style:{ fontSize:18, fontWeight:800, color:'#fb923c', marginBottom:6 } }, '\uD83D\uDCE1 Emergency Broadcast'),
              e('p', { style:{ fontSize:14, color:'#64748b', marginBottom:20 } }, 'Message will be pushed live to all tourist devices connected to SAFORA.'),
              e('form', { onSubmit:sendBc, style:{ display:'flex', gap:12, flexWrap:'wrap' } },
                e('input', { value:bcText, onChange:function(ev){ setBcText(ev.target.value); }, placeholder:'Type your emergency alert message...', style:{ flex:1, minWidth:260, background:'#0d1117', border:'1px solid #1e293b', borderRadius:10, padding:'12px 16px', color:'#e2e8f0', fontSize:15, outline:'none' } }),
                e('button', { type:'submit', style:{ background:'linear-gradient(135deg,#c2410c,#b45309)', color:'#fff', border:'none', padding:'12px 28px', borderRadius:10, fontWeight:700, cursor:'pointer', fontSize:15 } }, '\uD83D\uDEA8 Send Broadcast')
              )
            ),
            e('h4', { style:{ fontSize:15, color:'#64748b', fontWeight:700, marginBottom:14, textTransform:'uppercase', letterSpacing:1 } }, 'Active Alerts \u2014 '+broadcasts.length),
            broadcasts.map(function(b, i) {
              return e('div', { key:i, style:{ background:'rgba(249,115,22,0.06)', border:'1px solid rgba(249,115,22,0.2)', borderRadius:12, padding:'14px 18px', marginBottom:10, fontSize:15, color:'#fdba74', lineHeight:1.6 } }, b);
            })
          ),

                    /* ANALYTICS */
          tab==='analytics' && e('div', null,
            e('div', { style:{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:14 } },
              e('div', null,
                e('h2', { style:{ fontSize:20, fontWeight:800, color:'#f1f5f9' } }, '📊 Operational Analytics & Incident Intelligence'),
                e('p', { style:{ fontSize:13, color:'#64748b', marginTop:2 } }, 'Real-time telemetry and consolidated response records for command staff')
              ),
              e('button', {
                onClick: handleDownloadReport,
                style:{ display:'flex', alignItems:'center', gap:8, background:'linear-gradient(135deg,#059669,#0284c7)', color:'#ffffff', border:'none', padding:'12px 24px', borderRadius:12, fontWeight:800, cursor:'pointer', fontSize:14, boxShadow:'0 4px 20px rgba(5,150,105,0.35)', transition:'transform 0.1s', letterSpacing:0.3 }
              },
                e('span', { style:{ fontSize:18 } }, '📥'),
                e('span', null, 'Download Report (PDF)')
              )
            ),
            e('div', { style:{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:16, marginBottom:28 } },
              e(StatCard, { label:'Total Incidents',  value:stats.total,        color:'#60a5fa' }),
              e(StatCard, { label:'Pending Response', value:stats.pending,      color:'#fbbf24' }),
              e(StatCard, { label:'Unit Dispatched',  value:stats.dispatched,   color:'#818cf8' }),
              e(StatCard, { label:'Resolved',         value:stats.resolved,     color:'#34d399' }),
              e(StatCard, { label:'Lost Reports',     value:lostReports.length, color:'#c4b5fd' }),
              e(StatCard, { label:'Broadcasts Sent',  value:broadcasts.length,  color:'#fb923c' })
            ),
            e('div', { style:card },
              e('h3', { style:{ fontSize:17, fontWeight:700, color:'#94a3b8', marginBottom:20, letterSpacing:0.3 } }, 'Recent SOS Incidents'),
              incidents.map(function(inc) {
                return e('div', { key:inc.id, style:{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', flexWrap:'wrap', gap:10 } },
                  e('div', null,
                    e('div', { style:{ fontSize:16, color:'#e2e8f0', fontWeight:600 } }, inc.name+' \u2014 '+inc.category),
                    e('div', { style:{ fontSize:13, color:'#475569', marginTop:2 } }, inc.hotel+' \u00b7 '+inc.timestamp)
                  ),
                  e(Badge, { label:inc.status })
                );
              })
            )
          )
        ),

        /* MODAL */
        e(CaseModal, { inc:selected, onClose:function(){ setSelected(null); } })
      );
    }

    /* inject keyframe animation */
    var styleEl = document.createElement('style');
    styleEl.textContent = '@keyframes livePulse{0%,100%{opacity:1;box-shadow:0 0 8px #10b981}50%{opacity:0.5;box-shadow:0 0 2px #10b981}}';
    document.head.appendChild(styleEl);

    try {
      RD.createRoot(el).render(e(AuthorityApp));
      console.log('AuthorityApp mounted OK');
    } catch(err) {
      console.error('Mount error:', err);
      el.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#060d1a;"><div style="text-align:center;padding:32px;border:1px solid #ef4444;border-radius:20px;max-width:400px;"><h3 style="color:#ef4444;font-size:18px;margin-bottom:10px;">Error</h3><p style="color:#64748b;font-size:14px;">'+err.message+'</p><button onclick="location.reload()" style="margin-top:16px;background:#10b981;color:#fff;border:none;padding:10px 24px;border-radius:10px;cursor:pointer;font-weight:bold;font-size:14px;">Retry</button></div></div>';
    }
  }

  if (document.readyState==='loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();