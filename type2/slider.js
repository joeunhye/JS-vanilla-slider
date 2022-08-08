//슬라이드 전체 크기 width 구하기
const slide = document.querySelector(".slide");
let slideWidth = slide.clientWidth;
console.log(slideWidth);

//버튼 엘리먼트
const prevBtn = document.querySelector(".slide_prev_button");
const nextBtn = document.querySelector(".slide_next_button");

//슬라이드 아이템
const slideItems = document.querySelectorAll(".slide_item");

//현재 슬라이드 위치가 슬라이드 전체 개수를 넘지 않게 세팅
const maxSlide = slideItems.length;

//현재 슬라이드 위치
let currentSlide = 0;

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

//버튼 엘리먼트에 클릭 이벤트 추가
nextBtn.addEventListener("click", () => {
	currentSlide++;
	if (currentSlide < maxSlide) {
		//슬라이드 이동을 위한 offset 계산
		const offset = slideWidth * currentSlide;
		//각 슬라이드 아이템의 left에 offset 적용
		slideItems.forEach(item => {
			item.setAttribute("style", `left: ${-offset}px`);
		});
		// 슬라이드 이동 시 현재 활성화된 pagination 변경
		pageNavItems.forEach(item => item.classList.remove('active'));
		pageNavItems[currentSlide].classList.add('active');
	} else {
		currentSlide--;
	}
});

prevBtn.addEventListener("click", () => {
	currentSlide--;
	if (currentSlide >= 0) {
		//슬라이드 이동을 위한 offset 계산
		const offset = slideWidth * currentSlide;
		//각 슬라이드 아이템의 left에 offset 적용
		slideItems.forEach(item => {
			item.setAttribute("style", `left: ${-offset}px`);
		});
		// 슬라이드 이동 시 현재 활성화된 pagination 변경
		pageNavItems.forEach(item => item.classList.remove('active'));
		pageNavItems[currentSlide].classList.add('active');
	} else {
		currentSlide++;
	}
});

//페이지네이션 클릭 시 해당 슬라이드 이동
for(let i = 1; i < maxSlide; i++) {
	pageNavItems[i].addEventListener('click', () => {
		//클릭한 페이지네이션에 따라 현재 슬라이드 변경해주기
		currentSlide = i;
		//슬라이드 이동을 위한 offset 계산
		const offset = slideWidth * currentSlide;
		//각 슬라이드 아이템의 left에 offset 적용
		slideItems.forEach(item => {
			item.setAttribute("style", `left: ${-offset}px`);
		});
		// 슬라이드 이동 시 현재 활성화된 pagination 변경
		pageNavItems.forEach(item => item.classList.remove('active'));
		pageNavItems[currentSlide].classList.add('active');
	})
}

//브라우저 화면 조정 시 slideWidth 다시 계산
window.addEventListener("resize", () => {
	slideWidth = slide.clientWidth;
});
