let currentVerificationModeIsSuccess = true; 
let currentActionName = '';
let currentSystemMode = 'premium';

const imgPremium = "assets/images/logopk.png"; 

const stateDashboard = document.getElementById('state-dashboard');
const stateVerification = document.getElementById('state-verification');

const menuItems = [
    { name: "บันทึกช่วยจำ", status: "✅" }, { name: "บันทึกช่วยจำ", status: "❌" },
    { name: "หมายเหตุถอน", status: "✅" }, { name: "หมายเหตุถอน", status: "❌" },
    { name: "ถอน 3%", status: "✅" }, { name: "ถอน 3%", status: "❌" },
    { name: "ถอน 2 ยอด", status: "✅" }, { name: "ถอน 2 ยอด", status: "❌" },
    { name: "ถอนเกินเวลา", status: "✅" }, { name: "ถอนเกินเวลา", status: "❌" }
];

function switchSystemMode(mode) {
    currentSystemMode = mode;
    
    ['premium', 'document'].forEach(btnMode => {
        const btn = document.getElementById(`btn-mode-${btnMode}`);
        if(btn) btn.classList.remove('bg-indigo-600', 'border-indigo-400', 'shadow-[0_0_15px_rgba(99,102,241,0.5)]');
    });

    const activeBtn = document.getElementById(`btn-mode-${mode}`);
    if(activeBtn) activeBtn.classList.add('bg-indigo-600', 'border-indigo-400', 'shadow-[0_0_15px_rgba(99,102,241,0.5)]');

    const headerTitle = document.getElementById('dashboard-header-title');
    if(headerTitle) {
        headerTitle.innerHTML = mode === 'document' 
            ? "<span class='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400'>รายการเอกสารของระบบ</span>" 
            : "<span class='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400'>เลือกระบบที่ต้องการดำเนินการ</span>";
    }
    renderDashboardGrid(); 
}

function renderDashboardGrid() {
    const grid = document.getElementById('dashboard-grid');
    grid.innerHTML = '';

    if (currentSystemMode === 'document') {
        grid.className = "grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"; 
        
        const docItems = [
            { name: "ซ่อม 3%", img: imgPremium, link: "repair3.html" },
            { name: "ซ่อมบันทึก", img: imgPremium, link: "repair.html" }, 
            { name: "ขยายเวลา", img: imgPremium, link: "time.html" },
            { name: "เอกสาร", img: imgPremium, link: "https://img1.pic.in.th/images/image60268dad00c62729.md.png" } 
        ];
        
        docItems.forEach((item) => {
            let btnAction = (item.link !== "#") ? `window.location.href = '${item.link}'` : `alert('ติดต่อผู้ดูแลระบบเพื่อขอเพิ่มลิงก์เอกสาร')`;
            
            grid.innerHTML += `
                <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 flex items-center justify-between border border-slate-700 shadow-xl hover:shadow-[0_10px_30px_rgba(99,102,241,0.2)] hover:border-indigo-500/50 transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden">
                    
                    <!-- แสงเรืองๆ พื้นหลัง -->
                    <div class="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all duration-500"></div>

                    <div class="flex items-center gap-5 relative z-10">
                        <div class="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl p-2 flex flex-shrink-0 items-center justify-center shadow-inner border border-white/10 group-hover:bg-white transition-colors duration-300">
                            <img src="${item.img}" class="max-w-full max-h-full object-contain rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        </div>
                        <h3 class="text-slate-200 font-bold text-[18px] tracking-wide group-hover:text-indigo-300 transition-colors">${item.name}</h3>
                    </div>
                    <button onclick="${btnAction}" class="relative z-10 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 text-sm shrink-0 flex items-center gap-2 active:scale-95">
                        เปิดระบบ
                        <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>`;
        });
        return;
    }

    grid.className = "grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto w-full"; 
    let displayImage = imgPremium; 

    menuItems.forEach((item) => {
        const isGreen = item.status === "✅";
        const iconColor = isGreen ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/30" : "text-rose-400 bg-rose-400/10 border-rose-400/30";
        const borderGlow = isGreen ? "hover:border-emerald-500/50 hover:shadow-[0_5px_20px_rgba(16,185,129,0.2)]" : "hover:border-rose-500/50 hover:shadow-[0_5px_20px_rgba(244,63,94,0.2)]";
        const btnColor = isGreen ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30" : "bg-rose-600 hover:bg-rose-500 shadow-rose-600/30";
        
        grid.innerHTML += `
            <div class="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between border border-slate-700 shadow-lg ${borderGlow} transition-all duration-300 transform hover:-translate-y-1 group">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-white rounded-xl p-1.5 flex-shrink-0 flex items-center justify-center shadow-md overflow-hidden group-hover:shadow-lg transition-shadow">
                        <img src="${displayImage}" class="max-w-full max-h-full object-contain rounded-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    </div>
                    <div class="flex flex-col">
                        <h3 class="text-slate-200 font-bold text-[15px] group-hover:text-white transition-colors">
                            ${item.name}
                        </h3>
                        <div class="mt-1 inline-flex items-center">
                            <span class="${iconColor} font-semibold text-[11px] px-2.5 py-0.5 rounded-full border shadow-sm flex items-center gap-1">
                                สถานะ ${item.status}
                            </span>
                        </div>
                    </div>
                </div>
                <button onclick="openVerification('${item.status}', '${item.name}')" class="${btnColor} text-white font-medium py-2 px-5 rounded-xl shadow-lg transition-all duration-300 text-[13px] shrink-0 active:scale-95 flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    เปิด
                </button>
            </div>`;
    });
}

function openVerification(status, actionTitle) {
    currentVerificationModeIsSuccess = (status === '✅');
    currentActionName = actionTitle.replace(".", "");
    
    document.getElementById('verify-logo').src = imgPremium;
    document.getElementById('result-form-logo').src = imgPremium;
    
    let titleTextDisplay = "AI SMART CONTRACT";
    document.getElementById('form-title').textContent = titleTextDisplay;
    document.getElementById('result-head-title').textContent = titleTextDisplay;

    stateDashboard.classList.add('hidden');
    stateDashboard.classList.remove('flex');
    stateVerification.classList.remove('hidden');
    stateVerification.classList.add('flex');
}

function goToDashboard() {
    stateVerification.classList.add('hidden');
    stateVerification.classList.remove('flex');
    stateDashboard.classList.remove('hidden');
    stateDashboard.classList.add('flex');
}


const form = document.getElementById('verification-form');
const fileInput = document.getElementById('file-upload');
const dropZoneContent = document.getElementById('drop-zone-content');
const formPreviewImage = document.getElementById('form-preview-image');
const appLoadingOverlay = document.getElementById('loading-overlay');
const resultOverlay = document.getElementById('result-overlay');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

function processFile(file) {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            dropZoneContent.classList.add('hidden');
            formPreviewImage.src = e.target.result;
            formPreviewImage.classList.remove('hidden');
        }
        reader.readAsDataURL(file);
    }
}

document.addEventListener('paste', function(e) {
    if(stateVerification.classList.contains('hidden')) return; 
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (let index in items) {
        const item = items[index];
        if (item.kind === 'file' && item.type.startsWith('image/')) {
            const file = item.getAsFile();
            processFile(file);
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
            break;
        }
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const shopId = document.getElementById('shop-id').value;
    const file = fileInput.files[0];
    if(!shopId || !file) return alert('กรุณาวางรูปภาพ Slip ก่อนดำเนินการตรวจสอบ');

    const reader = new FileReader();
    reader.onload = function(e) { document.getElementById('result-image').src = e.target.result; }
    reader.readAsDataURL(file);

    document.getElementById('result-shop-id').textContent = shopId;
    startAIVerification();
});

function startAIVerification() {
    appLoadingOverlay.classList.remove('hidden');
    
    // เริ่มต้นที่ 0%
    let progress = 0;
    progressBar.style.width = `0%`;
    progressText.textContent = `0%`;
    
    function simulateProcessing() {
        const jump = Math.floor(Math.random() * 15) + 3;
        progress += jump;

        if (progress >= 100) {
            progress = 100;
            progressBar.style.width = `100%`;
            progressText.textContent = `100%`;
            
            setTimeout(() => { showResult(); }, 500);
            return; 
        }


        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;

        const nextDelay = Math.floor(Math.random() * 500) + 100;

        setTimeout(simulateProcessing, nextDelay);
    }

    setTimeout(simulateProcessing, 300);
}

function showResult() {
    appLoadingOverlay.classList.add('hidden');
    resultOverlay.classList.remove('hidden');
    
    const resultMsgBox = document.getElementById('result-message-box');
    const resultTitle = document.getElementById('result-title');

    let titleText = "ผลการตรวจสอบรหัสสำคัญ";
    let msgSuccess = "หมายเหตุ: ระบบดำเนินการอ่านข้อมูลรหัสสำคัญ สำเร็จ.";
    let msgFail = "หมายเหตุ: ระบบไม่สามารถดำเนินการอ่านข้อมูลรหัสสำคัญในการทำรายการได้.";

    if (currentActionName === "หมายเหตุถอน") {
        titleText = "ผลการตรวจสอบถอนเงิน";
        msgSuccess = "หมายเหตุ: ระบบ AI SMART CONTRACT ดำเนินการอ่านหมายเหตุถอนเงิน สำเร็จ.";
        msgFail = "หมายเหตุ: ระบบ ไม่สามารถดำเนินการอ่านหมายเหตุถอนเงินได้.";
    } else if (currentActionName === "ถอน 3%") {
        titleText = "ผลการตรวจสอบค่าดำเนินการ 3%";
        msgSuccess = "หมายเหตุ: ระบบตรวจสอบค่าดำเนินการ 3% สำเร็จ.";
        msgFail = "หมายเหตุ: ระบบ ไม่สามารถดำเนินการตรวจสอบค่าดำเนินการ 3% ได้.";
    } else if (currentActionName === "ถอน 2 ยอด") {
        titleText = "ผลการตรวจสอบถอนเงินสองยอด";
        msgSuccess = "หมายเหตุ: ระบบตรวจสอบค่าดำเนินการ 3% สำเร็จ.";
        msgFail = "หมายเหตุ: ระบบ ไม่สามารถดำเนินการตรวจสอบ การเบิกถอนสองยอดได้.";
    } else if (currentActionName === "ถอนเกินเวลา") {
        titleText = "ผลการตรวจสอบถอนเงินตามเวลาที่กำหนด";
        msgSuccess = "หมายเหตุ: ระบบ ตรวจสอบเวลาในการเบิกถอนเงินที่กำหนด สำเร็จ.";
        msgFail = "หมายเหตุ: ระบบไม่สามารถตรวจสอบ การเบิกถอนเวลาที่กำหนดได้.";
    }

    resultTitle.textContent = titleText;

    if (currentVerificationModeIsSuccess) {
        resultTitle.className = "text-lg font-bold text-[#0F767D] mb-3";
        resultMsgBox.className = "mt-4 text-[#0F767D] text-sm font-medium text-center w-full px-5 py-4 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm leading-relaxed";
        resultMsgBox.textContent = msgSuccess;
    } else {
        resultTitle.className = "text-lg font-bold text-red-600 mb-3";
        resultMsgBox.className = "mt-4 text-red-600 text-sm font-medium text-center w-full px-5 py-4 bg-red-50 rounded-xl border border-red-200 shadow-sm leading-relaxed";
        resultMsgBox.textContent = msgFail;
    }

    setTimeout(() => { progressBar.style.width = '0%'; progressText.textContent = '0%'; }, 500);
}

function closeResult() {
    resultOverlay.classList.add('hidden');
    fileInput.value = '';
    formPreviewImage.classList.add('hidden');
    formPreviewImage.src = '';
    dropZoneContent.classList.remove('hidden');
}

resultOverlay.addEventListener('click', function(e) {
    if (e.target === resultOverlay) closeResult();
});