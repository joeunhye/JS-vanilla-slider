//슬라이드 전체 크기 width 구하기
const slide = document.querySelector(".slide");
let slideWidth = slide.clientWidth;

//버튼 엘리먼트
const prevBtn = document.querySelector(".slide_prev_button");
const nextBtn = document.querySelector(".slide_next_button");

//슬라이드 아이템
let slideItems = document.querySelectorAll(".slide_item");

//현재 슬라이드 위치가 슬라이드 전체 개수를 넘지 않게 세팅
const maxSlide = slideItems.length;

//현재 슬라이드 위치
let currentSlide = 1;

//페이지네이션 생성
const pageNav = document.querySelector('.slide_pagination');

for(let i = 0; i < maxSlide; i++) {
	if(i === 0) {
		// 첫번째 페이지네이션에 active 클래스 추가
		pageNav.innerHTML += `<li class="active">*</li>` 
	}else {
		pageNav.innerHTML += `<li>*</li>`
	}
}

const pageNavItems = document.querySelectorAll('.slide_pagination > li');

//무한 슬라이드를 위해 start, end 슬라이드 복사하기
const startSlide = slideItems[0];
const endSlide = slideItems[slideItems.length - 1];

//엘리먼트 생성
const startElem = document.createElement(startSlide.tagName);
const endElem = document.createElement(endSlide.tagName);

//엘리먼트에 클래스 적용, 내용 복사 동일하게 하기
endSlide.classList.forEach(cls => endElem.classList.add(cls));
endElem.innerHTML = endSlide.innerHTML;
startSlide.classList.forEach(cls => startElem.classList.add(cls));
startElem.innerHTML = startSlide.innerHTML;

//복제한 엘리먼트를 각 위치에 추가하기
slideItems[0].before(endElem);
slideItems[slideItems.length - 1].after(startElem);

//슬라이드 전체를 선택해 값을 변경하기
slideItems = document.querySelectorAll(".slide_item");
let offset = slideWidth * currentSlide;
slideItems.forEach(item => {
	item.setAttribute('style', `left: ${-offset}px`);
})

//다음 슬라이드 이동
function nextMove() {
	currentSlide++;
	if (currentSlide <= maxSlide) {
		//슬라이드 이동을 위한 offset 계산
		let offset = slideWidth * currentSlide;
		//각 슬라이드 아이템의 left에 offset 적용
		slideItems.forEach(item => {
			item.setAttribute("style", `left: ${-offset}px`);
		});
		// 슬라이드 이동 시 현재 활성화된 pagination 변경
		pageNavItems.forEach(item => item.classList.remove('active'));
		pageNavItems[currentSlide - 1].classList.add('active');
	} else {
		// currentSlide--;
		currentSlide = 0;
		let offset = slideWidth * currentSlide;
		slideItems.forEach(item => {
			item.setAttribute('style', `transition: ${0}s; left: ${-offset}px`);
		})
		currentSlide++;
		offset = slideWidth * currentSlide;
		// setTimeout을 사용하는 이유는 비동기 처리를 이용해 transition이 제대로 적용되게 하기 위함
		setTimeout(() => {
			slideItems.forEach(item => {
				item.setAttribute('style', `transition: ${1}s; left: ${-offset}px`)
			})
		}, 0);
		// 슬라이드 이동 시 현재 활성화된 pagination 변경
		pageNavItems.forEach((item) => item.classList.remove("active"));
    	pageNavItems[currentSlide - 1].classList.add("active");
	}
}

//이전 슬라이드 이동
function prevMove() {
	currentSlide--;
	if (currentSlide > 0) {
		//슬라이드 이동을 위한 offset 계산
		const offset = slideWidth * currentSlide;
		//각 슬라이드 아이템의 left에 offset 적용
		slideItems.forEach(item => {
			item.setAttribute("style", `left: ${-offset}px`);
		});
		// 슬라이드 이동 시 현재 활성화된 pagination 변경
		pageNavItems.forEach(item => item.classList.remove('active'));
		pageNavItems[currentSlide - 1].classList.add('active');
	} else {
		// currentSlide++;
		currentSlide = maxSlide + 1;
		let offset = slideWidth * currentSlide;
		slideItems.forEach(item => {
			item.setAttribute('style', `transition: ${0}s; left: ${-offset}px`)
		})
		currentSlide--;
		offset = slideWidth * currentSlide;
		setTimeout(() => {
			slideItems.forEach(item => {
				item.setAttribute('style', `transition: ${1}s; left: ${-offset}px`)
			})
		}, 0);
		pageNavItems.forEach((item) => item.classList.remove("active"));
    	pageNavItems[currentSlide - 1].classList.add("active");
	}
}

//버튼 엘리먼트에 클릭 이벤트 추가
nextBtn.addEventListener("click", () => {
	nextMove();
});

prevBtn.addEventListener("click", () => {
	prevMove();
});

//페이지네이션 클릭 시 해당 슬라이드 이동
for(let i = 0; i < maxSlide; i++) {
	pageNavItems[i].addEventListener('click', () => {
		//클릭한 페이지네이션에 따라 현재 슬라이드 변경해주기
		currentSlide = i + 1;
		//슬라이드 이동을 위한 offset 계산
		const offset = slideWidth * currentSlide;
		//각 슬라이드 아이템의 left에 offset 적용
		slideItems.forEach(item => {
			item.setAttribute("style", `left: ${-offset}px`);
		});
		// 슬라이드 이동 시 현재 활성화된 pagination 변경
		pageNavItems.forEach(item => item.classList.remove('active'));
		pageNavItems[currentSlide - 1].classList.add('active');
	})
}

//드래그/스와이프 이벤트를 위한 변수 초기화
let startPoint = 0;
let endPoint = 0;

//드래그 이벤트(PC)
slide.addEventListener('mousedown', e => {
	//마우스 드래그 시작 위치 저장
	startPoint = e.pageX; 
});

slide.addEventListener('mouseup', e => {
	//마우스 드래그 끝 위치 저장
	endPoint = e.pageX;
	if(startPoint < endPoint) { //마우스가 오른쪽으로 드래그 된 경우
		prevMove();
	}else if (startPoint > endPoint) { //마우스가 왼쪽으로 드래그 된 경우
		nextMove();
	}
});

//터치 이벤트(모바일)
slide.addEventListener('touchstart', e => {
	startPoint = e.touches[0].pageX;
});

slide.addEventListener('touchend', e => {
	endPoint = e.changedTouches[0].pageX;
	if(startPoint < endPoint) { //마우스가 오른쪽으로 드래그 된 경우
		prevMove();
	}else if (startPoint > endPoint) { //마우스가 왼쪽으로 드래그 된 경우
		nextMove();
	}
});

//슬라이드 자동 재생
let loopInterval = setInterval(() => {
	nextMove();
}, 3000);

//슬라이드에 마우스 오버 시 일시정지
slide.addEventListener('mouseover', () => {
	clearInterval(loopInterval);
});

//슬라이드에 마우스 아웃 시 자동재생 시작
slide.addEventListener('mouseout', () => {
	loopInterval = setInterval(() => {
		nextMove();
	}, 3000);
})

//브라우저 화면 조정 시 slideWidth 다시 계산
window.addEventListener("resize", () => {
	slideWidth = slide.clientWidth;
});
