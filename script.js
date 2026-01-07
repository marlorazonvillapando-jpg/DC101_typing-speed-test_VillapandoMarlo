const words = ['javascript','developer','keyboard','function','variable','object','browser','semantic','responsive','performance','algorithm','interface','document','listener','element','stylesheet','animation','interaction','event','accuracy'];
const textDisplay = document.getElementById('textDisplay');
const inputArea = document.getElementById('inputArea');
const startBtn = document.getElementById('startBtn');
const timeDisplay = document.getElementById('time');
const wordCountDisplay = document.getElementById('wordCount');
const accuracyDisplay = document.getElementById('accuracy');
const highScoreDisplay = document.getElementById('highScore');
const difficultySelect = document.getElementById('difficulty');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
let timer, timeLeft, totalWordsTyped = 0, correctWordsTyped = 0, currentText = '';
let highScore = localStorage.getItem('highScore') || 0;
highScoreDisplay.textContent = highScore;
const difficulties = {easy:{time:60,wordCount:10}, medium:{time:45,wordCount:15}, hard:{time:30,wordCount:20}};
function generateText(level){ const wordCount = difficulties[level].wordCount; const randomWords=[]; for(let i=0;i<wordCount;i++){ randomWords.push(words[Math.floor(Math.random()*words.length)]); } return randomWords.join(' '); }
function countdownAnimation(callback){ let countdown=3; textDisplay.textContent=countdown; const interval=setInterval(()=>{ countdown--; if(countdown>0){ textDisplay.textContent=countdown; } else { clearInterval(interval); callback(); } },1000); }
startBtn.addEventListener('click',()=>{ inputArea.disabled=false; inputArea.value=''; inputArea.focus(); const level=difficultySelect.value; timeLeft=difficulties[level].time; countdownAnimation(()=>{ currentText=generateText(level); textDisplay.innerHTML=currentText.split(' ').map(word=>`<span class="word">${word}</span>`).join(''); totalWordsTyped=0; correctWordsTyped=0; timeDisplay.textContent=timeLeft; wordCountDisplay.textContent=totalWordsTyped; accuracyDisplay.textContent=0; clearInterval(timer); timer=setInterval(updateTimer,1000); }); });
function updateTimer(){ if(timeLeft>0){ timeLeft--; timeDisplay.textContent=timeLeft; } else { endGame(); } }
function endGame(){ clearInterval(timer); inputArea.disabled=true; const accuracy=calculateAccuracy(); alert(`Time's up! Your accuracy: ${accuracy}%`); if(totalWordsTyped>highScore){ highScore=totalWordsTyped; localStorage.setItem('highScore',highScore); highScoreDisplay.textContent=highScore; alert('New High Score!'); } }
function calculateAccuracy(){ return totalWordsTyped===0?0:Math.round((correctWordsTyped/totalWordsTyped)*100); }
inputArea.addEventListener('input',()=>{ const typedWords=inputArea.value.trim().split(' '); const textWords=currentText.split(' '); totalWordsTyped=typedWords.length; correctWordsTyped=0; textDisplay.innerHTML=textWords.map((word,index)=>{ let spanClass='word'; if(typedWords[index]!=null){ if(typedWords[index]===word){ correctWordsTyped++; spanClass+=' correct'; } else { spanClass+=' incorrect'; } } return `<span class='${spanClass}'>${word}</span>`; }).join(''); wordCountDisplay.textContent=totalWordsTyped; accuracyDisplay.textContent=calculateAccuracy(); const lastTyped=typedWords[typedWords.length-1]; const correspondingWord=textWords[typedWords.length-1]; if(lastTyped && typedWords.length<=textWords.length){ if(lastTyped===correspondingWord){ correctSound.play(); } else { wrongSound.play(); } } if(correctWordsTyped===textWords.length){ const level=difficultySelect.value; currentText=generateText(level); textDisplay.innerHTML=currentText.split(' ').map(word=>`<span class="word">${word}</span>`).join(''); inputArea.value=''; correctWordsTyped=0; totalWordsTyped=0; } });
