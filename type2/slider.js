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
let currentSlide = 1;

//버튼 엘리먼트에 클릭 이벤트 추가
nextBtn.addEventListener("click", () => {
	currentSlide++;
	if (currentSlide <= maxSlide) {
		//슬라이드 이동을 위한 offset 계산
		const offset = slideWidth * (currentSlide - 1);
		//각 슬라이드 아이템의 left에 offset 적용
		slideItems.forEach(item => {
			item.setAttribute("style", `left: ${-offset}px`);
		});
	} else {
		currentSlide--;
		console.log(currentSlide);
	}
});
