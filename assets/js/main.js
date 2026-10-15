(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  // Durian variety explorer
  var V={musang:['Musang King','Malaysia','Deep golden flesh that is rich, creamy and bittersweet, with a strong aroma. Often considered a premium variety.',[8,9,7,9]],
    d24:['D24 (Sultan)','Malaysia','Pale yellow, smooth flesh with a balanced sweet and slightly bitter finish. A classic all-rounder.',[6,7,6,7]],
    blackthorn:['Black Thorn','Malaysia','Orange flesh that is very creamy and custard-like, with layered sweetness and a mild bitter note.',[9,9,4,8]],
    redprawn:['Red Prawn','Malaysia','Orange-red, soft flesh that is notably sweet and fruity. A friendly first choice for newcomers.',[9,7,2,6]],
    monthong:['Monthong','Thailand','Large, pale yellow pods with thick, mild and sweet flesh and a gentler smell. Widely exported.',[7,6,2,4]]};
  var L=['Sweetness','Creaminess','Bitterness','Aroma'],vk='redprawn';
  function vari(k){var v=V[k],o=document.getElementById('v-n');if(!o)return;vk=k;o.textContent=v[0];document.getElementById('v-o').textContent='Mainly grown in '+v[1];document.getElementById('v-d').textContent=v[2];
    document.getElementById('v-b').innerHTML=L.map(function(l,i){return '<div><em style="font-style:normal">'+l+'</em><span><i style="width:'+v[3][i]*10+'%"></i></span><b>'+v[3][i]+'</b></div>';}).join('');
    document.querySelectorAll('[data-v]').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.v===k?'true':'false');});}
  document.querySelectorAll('[data-v]').forEach(function(x){x.addEventListener('click',function(){vari(x.dataset.v);});});
  vari('redprawn');
  // Picnic planner
  var pp=document.getElementById('ppl'),ph=document.getElementById('hrs'),pt=document.getElementById('hot');
  function plan(){if(!pp)return;var p=Math.min(40,Math.max(1,parseInt(pp.value)||4)),h=Math.min(8,Math.max(1,parseFloat(ph.value)||3)),hot=pt.value==='hot';
    var water=Math.ceil(p*(0.25*h+(hot?0.5:0.25))*10)/10,sand=Math.ceil(p*1.5),fruit=Math.round(p*0.25*10)/10,dur=Math.max(1,Math.ceil(p/5)),ice=Math.max(2,Math.ceil(p/3)+(hot?2:0));
    var items=[['Water',water+' litres'],['Wraps or sandwiches',sand+' pieces'],['Cut fruit',fruit+' kg'],['Whole durian (to share)',dur+(dur>1?' fruits':' fruit')],['Ice packs for the cooler',ice],['Napkins and wet wipes',(p*4)+' sheets'],['Rubbish bags',Math.max(2,Math.ceil(p/4))]];
    document.getElementById('p-l').innerHTML=items.map(function(i){return '<li><span>'+i[0]+'</span><b>'+i[1]+'</b></li>';}).join('');
    document.getElementById('p-h').textContent='For '+p+(p>1?' people':' person')+', '+h+(h>1?' hours':' hour')+(hot?' in hot weather':'');}
  if(pp){[pp,ph,pt].forEach(function(x){x.addEventListener('input',plan);x.addEventListener('change',plan);});plan();}
  // Food safety timer
  var st=document.getElementById('sh'),sm=document.getElementById('sm'),sp=document.getElementById('sp');
  function safe(){if(!st)return;var hrs=Math.max(0,parseFloat(st.value)||0),hot=sm.value==='hot',cold=sp.value==='yes',lim=hot?1:2;
    var g=document.getElementById('sg'),v=document.getElementById('sv'),t=document.getElementById('st');
    if(cold){g.style.width='12%';g.style.background='#9BCB5A';v.textContent='Keep it cool';t.textContent='Food kept in a cooler with plenty of ice packs at 4 °C (40 °F) or below stays safe. Take out only what you will eat soon.';return;}
    var p=Math.min(100,hrs/lim*100);g.style.width=Math.max(4,p)+'%';
    if(hrs<lim*0.5){g.style.background='#9BCB5A';v.textContent='Fine for now';t.textContent='Perishable food can stay out a little longer. Plan to pack it away within '+(lim-hrs).toFixed(1).replace('.0','')+' more '+((lim-hrs)===1?'hour':'hours')+'.';}
    else if(hrs<lim){g.style.background='#F2C230';v.textContent='Pack it away soon';t.textContent='You are close to the limit. Return perishable food to the cooler now.';}
    else{g.style.background='#E0574A';v.textContent='Throw it out';t.textContent='Perishable food left out longer than '+lim+(lim>1?' hours':' hour')+(hot?' in heat above 32 °C (90 °F)':'')+' should be discarded. When in doubt, throw it out.';}}
  if(st){[st,sm,sp].forEach(function(x){x.addEventListener('input',safe);x.addEventListener('change',safe);});safe();}
  // Contact
  var cf=document.getElementById('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=document.getElementById('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  var c=document.getElementById('cookie'),v=null;try{v=localStorage.getItem('dp_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('dp_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
})();
