const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechbtn = document.querySelector("button");

let synth = speechSynthesis ,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name = "Microsoft Hazel Desktop - English (Great Britain)" ? "selected" : "";

        //creating option tag with passing voice name
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
        voiceList.insertAdjacentHTML("beforeend", option);  //inserting option tag beforeend of select tag
    }
}

synth.addEventListener("voiceschanged" , voices);

function textToSpeach(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        // if the availble device voice name is equal to the user selected voice name then set the sppech voice to user selected voice

        if(voice.name === voiceList.value){
            utternance.voice = voice;
        }
    }
    speechSynthesis.speak(utternance);
}

speechbtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if (!synth.speaking) {
            textToSpeach(textarea.value);
        }
        if(textarea.value.length > 80){
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechbtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechbtn.innerText = "Resume Speech";
            }

            setInterval(()=>{
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    speechbtn.innerText = "Convert To Speech";
                }
            });
        }
    }
})